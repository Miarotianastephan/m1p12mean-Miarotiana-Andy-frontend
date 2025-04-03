import { ChangeDetectorRef, Component, effect, inject, OnInit, PLATFORM_ID, computed   } from '@angular/core';
import { Button } from 'primeng/button';
import { isPlatformBrowser } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { injectQuery, QueryClient } from '@tanstack/angular-query-experimental';
import instanceAxios from '../../../api/axios-config';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-boardmanager',
  imports: [CommonModule, Button, ChartModule, DividerModule, ButtonModule, RippleModule],
  templateUrl: './boardmanager.component.html',
  styleUrl: './boardmanager.component.css'
})
export class BoardmanagerComponent implements OnInit{
  
  basicData: any;
  basicOptions: any;
  platformId = inject(PLATFORM_ID);
  queryClient = inject(QueryClient);

  constructor(private cd: ChangeDetectorRef) {
    effect(() => {
        const data = this.revenuesData();
        if (data.length) {
            console.log("Mise à jour du graphique avec de nouvelles données", data);
            this.initChart();
        }
    });
  }

  ngOnInit() {
    this.initChart();
  }

  initChart() {
    if (isPlatformBrowser(this.platformId)) {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--p-text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
        const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

        const data = this.revenuesData(); // Récupération des données

        if (!data.length) {
            console.warn("Aucune donnée disponible pour le graphique.");
            return;
        }

        // Formatage des données pour le graphique
        this.basicData = {
            labels: data.map((d: { _id: string; }) => d._id), // Les dates
            datasets: [
                {
                    label: 'Revenus des 7 derniers jours',
                    data: data.map((d: { totalRevenue: number; }) => d.totalRevenue), // Les revenus
                    backgroundColor: 'rgba(0, 123, 255, 0.8)',
                    borderColor: 'rgba(0, 123, 255, 1)',
                    borderRadius: 5,
                },
            ],
        };

        this.basicOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor,
                    },
                },
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                    },
                    grid: {
                        color: surfaceBorder,
                    },
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: textColorSecondary,
                    },
                    grid: {
                        color: surfaceBorder,
                    },
                },
            },
        };

        this.cd.markForCheck();
    }
}
  
  // Appel API utilisant tanstack
  async fetchRepairsSummary() {
    try {
      const response = await instanceAxios.get('manager/dashboard/repairs-summary',{
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return {
        ongoingRepairs: response.data.ongoingRepairs || 0,
        completedRepairs: response.data.completedRepairs || 0,
        requestQuotes: response.data.requestQuotes || 0,
        acceptedQuotes: response.data.acceptedQuotes || 0,
      };
    } catch (error) {
      console.error("Erreur lors de la récupération des données du dashboard :", error);
      return { ongoingRepairs: 0, completedRepairs: 0, requestQuotes: 0, acceptedQuotes: 0 };
    }
  }
  useRepairsSummary  = injectQuery(() => ({
    queryKey: ['repairsSummary'],
    queryFn: this.fetchRepairsSummary,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  }));

  getOngoingRepairs(): number {
    return this.useRepairsSummary.data()?.ongoingRepairs || 0;
  }
  
  getCompletedRepairs(): number {
    return this.useRepairsSummary.data()?.completedRepairs || 0;
  }

  getRequestedQuotes(): number{
    return this.useRepairsSummary.data()?.requestQuotes || 0;
  }

  getAcceptedQuotes(): number{
    return this.useRepairsSummary.data()?.acceptedQuotes || 0;
  }

//   integration revenus des 7 derniers jours 
    async fetchRevenues() {
        try {
        const response = await instanceAxios.get('manager/dashboard/revenues-summary', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
    
        return response.data.revenues;
        } catch (error) {
        console.error("Erreur lors de la récupération des revenus :", error);
        return [];
        }
    }
    useRevenues = injectQuery(() => ({
        queryKey: ['revenues'],
        queryFn: this.fetchRevenues,
        staleTime: 60000,
        refetchOnWindowFocus: false,
    }));
    isLoading = computed(() => this.useRevenues.isFetching());
    revenuesData = computed(() => this.useRevenues.data() || []);

    async fetchTopParts() {
        try {
          const response = await instanceAxios.get('manager/dashboard/top-parts', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          });
          return response.data.topParts || [];
        } catch (error) {
          console.error("Erreur lors de la récupération des pièces les plus utilisées :", error);
          return [];
        }
      }
      useTopParts = injectQuery(() => ({
        queryKey: ['topParts'],
        queryFn: this.fetchTopParts,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
      }));
      getTopParts() {
        return this.useTopParts.data() || [];
      }      

}


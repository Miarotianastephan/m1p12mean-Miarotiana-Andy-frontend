import { ChangeDetectorRef, Component, effect, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Button } from 'primeng/button';
import { isPlatformBrowser } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';


@Component({
  selector: 'app-boardmanager',
  imports: [Button, ChartModule, DividerModule, ButtonModule, RippleModule],
  templateUrl: './boardmanager.component.html',
  styleUrl: './boardmanager.component.css'
})
export class BoardmanagerComponent implements OnInit{
  
  basicData: any;

  basicOptions: any;

  platformId = inject(PLATFORM_ID);

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {
      this.initChart();
  }

  initChart() {
      if (isPlatformBrowser(this.platformId)) {
          const documentStyle = getComputedStyle(document.documentElement);
          const textColor = documentStyle.getPropertyValue('--p-text-color');
          const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
          const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

          this.basicData = {
              labels: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7'],
              datasets: [
                  {
                      label: 'Revenus des 7 derniers jours',
                      data: [540, 325, 702, 620, 200, 435, 620],
                      backgroundColor: ['rgba(0, 0, 0, 0.93)'],
                      borderColor: ['rgba(0, 0, 0, 0.93)'],
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
          this.cd.markForCheck()
      }
  }
}

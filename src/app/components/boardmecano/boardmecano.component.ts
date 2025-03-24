import { ChartModule } from 'primeng/chart';
import { isPlatformBrowser } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import {
  Component,
  ChangeDetectorRef,
  inject,
  PLATFORM_ID,
} from '@angular/core';
@Component({
  selector: 'app-boardmecano',
  imports: [ChartModule, ButtonModule],
  templateUrl: './boardmecano.component.html',
  styleUrl: './boardmecano.component.css',
})
export class BoardmecanoComponent {
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
      const textColorSecondary = documentStyle.getPropertyValue(
        '--p-text-muted-color'
      );
      const surfaceBorder = documentStyle.getPropertyValue(
        '--p-content-border-color'
      );

      this.basicData = {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        datasets: [
          {
            label: 'Sales',
            data: [540, 325, 702, 620],
            backgroundColor: ['rgba(0, 0, 0, 0.93)'],
            borderColor: ['rgba(0, 0, 0, 0.93)'],
            borderRadius: 20,
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
}

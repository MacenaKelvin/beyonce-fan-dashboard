import { Component } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import {
  ChartConfiguration,
  ChartData,
} from 'chart.js';

interface EraData {
  name: string;
  value: number;
  color: string;
}

@Component({
  selector: 'app-era-chart',
  imports: [BaseChartDirective],
  templateUrl: './era-chart.html',
  styleUrl: './era-chart.scss',
})
export class EraChart {
  readonly chartType: 'doughnut' = 'doughnut';

  readonly eras: EraData[] = [
    {
      name: 'Renaissance',
      value: 32,
      color: '#f4f4f5',
    },
    {
      name: 'Lemonade',
      value: 24,
      color: '#a1a1aa',
    },
    {
      name: 'Cowboy Carter',
      value: 18,
      color: '#71717a',
    },
    {
      name: 'Beyoncé',
      value: 15,
      color: '#52525b',
    },
    {
      name: 'Outras eras',
      value: 11,
      color: '#27272a',
    },
  ];

  readonly chartData: ChartData<'doughnut', number[], string> = {
    labels: this.eras.map((era) => era.name),
    datasets: [
      {
        data: this.eras.map((era) => era.value),
        backgroundColor: this.eras.map((era) => era.color),
        borderColor: '#121216',
        borderWidth: 5,
        hoverBorderColor: '#121216',
        hoverOffset: 8,
      },
    ],
  };

  readonly chartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '72%',

    animation: {
      duration: 1100,
      easing: 'easeOutQuart',
    },

    plugins: {
      legend: {
        display: false,
      },

      tooltip: {
        displayColors: false,
        backgroundColor: 'rgba(9, 9, 11, 0.96)',
        titleColor: '#fafafa',
        bodyColor: '#d4d4d8',
        padding: 12,
        cornerRadius: 12,

        callbacks: {
          label: (context) => {
            return `${context.label}: ${context.parsed}%`;
          },
        },
      },
    },
  };
}
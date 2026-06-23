import { Component } from '@angular/core';
import { StatCard } from '../../../../shared/components/stat-card/stat-card';

@Component({
  selector: 'app-stats-grid',
  imports: [StatCard],
  templateUrl: './stats-grid.html',
  styleUrl: './stats-grid.scss',
})
export class StatsGrid {}
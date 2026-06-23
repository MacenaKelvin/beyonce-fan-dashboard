import { Component } from '@angular/core';
import { StatsGrid } from './components/stats-grid/stats-grid';
import { TopSongs } from './components/top-songs/top-songs';

@Component({
  selector: 'app-dashboard',
  imports: [StatsGrid, TopSongs],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {}
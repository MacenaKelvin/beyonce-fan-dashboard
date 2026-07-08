import { Component, OnInit, inject, signal } from '@angular/core';

import { Lastfm } from '../../core/services/lastfm';
import { Track } from '../../shared/models/track';

import { StatsGrid } from './components/stats-grid/stats-grid';
import { TopSongs } from './components/top-songs/top-songs';
import { Hero } from './components/hero/hero';
import { EraChart } from './components/era-chart/era-chart';
import { AlbumTimeline } from './components/album-timeline/album-timeline';
@Component({
  selector: 'app-dashboard',
  imports: [StatsGrid, TopSongs, Hero, EraChart, AlbumTimeline],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {

  private readonly lastfm = inject(Lastfm);

  tracks = signal<Track[]>([]);

  loading = signal(true);

  ngOnInit(): void {

    this.lastfm.getTopTracks().subscribe({

      next: (tracks) => {

        this.tracks.set(tracks);

        this.loading.set(false);

      },

      error: () => {

        this.loading.set(false);

      },

    });

  }

}
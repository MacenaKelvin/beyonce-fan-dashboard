import { Component, OnInit, inject, signal } from '@angular/core';

import { Lastfm } from '../../core/services/lastfm';
import { Track } from '../../shared/models/track';

import { StatsGrid } from './components/stats-grid/stats-grid';
import { TopSongs } from './components/top-songs/top-songs';

@Component({
  selector: 'app-dashboard',
  imports: [StatsGrid, TopSongs],
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
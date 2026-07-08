import { Component, input } from '@angular/core';
import { Track } from '../../../../shared/models/track';
import { SongCard } from '../../../../shared/components/song-card/song-card';

@Component({
  selector: 'app-top-songs',
  imports: [SongCard],
  templateUrl: './top-songs.html',
  styleUrl: './top-songs.scss',
})
export class TopSongs {
  tracks = input<Track[]>([]);
  loading = input(false);
}
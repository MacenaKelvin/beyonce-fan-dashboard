import { Component, input } from '@angular/core';
import { Track } from '../../../../shared/models/track';
import { CompactNumberPipe } from '../../../../shared/pipes/compact-number-pipe';

@Component({
  selector: 'app-top-songs',
  imports: [CompactNumberPipe],
  templateUrl: './top-songs.html',
  styleUrl: './top-songs.scss',
})
export class TopSongs {
  tracks = input<Track[]>([]);
  loading = input(false);
}
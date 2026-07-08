import { Component, input } from '@angular/core';
import { Track } from '../../models/track';
import { CompactNumberPipe } from '../../pipes/compact-number-pipe';

@Component({
  selector: 'app-song-card',
  imports: [CompactNumberPipe],
  templateUrl: './song-card.html',
  styleUrl: './song-card.scss',
})
export class SongCard {
  track = input.required<Track>();
  index = input.required<number>();
}
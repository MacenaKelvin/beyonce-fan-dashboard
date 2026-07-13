import { Component, inject, input } from '@angular/core';
import { Track } from '../../models/track';
import { CompactNumberPipe } from '../../pipes/compact-number-pipe';
import { Player } from '../../../core/services/player';

@Component({
  selector: 'app-song-card',
  imports: [CompactNumberPipe],
  templateUrl: './song-card.html',
  styleUrl: './song-card.scss',
})
export class SongCard {
  private readonly player = inject(Player);

  track = input.required<Track>();
  index = input.required<number>();

  playPreview(): void {
    const track = this.track();

    if (!track.previewUrl) {
      return;
    }

    this.player.play({
      name: track.name,
      artist: track.artist,
      album: track.album,
      image: track.image,
      previewUrl: track.previewUrl,
    });
  }
}
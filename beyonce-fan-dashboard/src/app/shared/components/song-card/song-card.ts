import { Component, inject, input } from '@angular/core';

import { Player } from '../../../core/services/player';
import { Track } from '../../models/track';
import { CompactNumberPipe } from '../../pipes/compact-number-pipe';

@Component({
  selector: 'app-song-card',
  imports: [CompactNumberPipe],
  templateUrl: './song-card.html',
  styleUrl: './song-card.scss',
})
export class SongCard {
  readonly player = inject(Player);

  readonly track = input.required<Track>();
  readonly index = input.required<number>();

  playPreview(): void {
    const track = this.track();

    if (!track.previewUrl) {
      return;
    }

    const isCurrentTrack = this.player.currentTrack()?.name === track.name;

    if (isCurrentTrack) {
      this.player.toggle();
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
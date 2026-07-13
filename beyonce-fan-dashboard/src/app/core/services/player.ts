import { Injectable, signal } from '@angular/core';
import { PlayerTrack } from '../../shared/models/player-track';

@Injectable({
  providedIn: 'root',
})
export class Player {
  readonly currentTrack = signal<PlayerTrack | null>(null);
  readonly isPlaying = signal(false);

  play(track: PlayerTrack): void {
    this.currentTrack.set(track);
    this.isPlaying.set(true);
  }

  pause(): void {
    this.isPlaying.set(false);
  }

  resume(): void {
    if (this.currentTrack()) {
      this.isPlaying.set(true);
    }
  }

  toggle(): void {
    this.isPlaying() ? this.pause() : this.resume();
  }
}
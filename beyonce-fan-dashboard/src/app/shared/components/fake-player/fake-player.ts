import {
  Component,
  DestroyRef,
  effect,
  inject,
  signal,
} from '@angular/core';

import { Player } from '../../../core/services/player';

@Component({
  selector: 'app-fake-player',
  imports: [],
  templateUrl: './fake-player.html',
  styleUrl: './fake-player.scss',
})
export class FakePlayer {
  readonly player = inject(Player);
  private readonly destroyRef = inject(DestroyRef);

  readonly currentTime = signal(0);
  readonly duration = signal(30);
  readonly volume = signal(0.8);

  private readonly audio = new Audio();
  private loadedPreviewUrl = '';

  constructor() {
    this.audio.volume = this.volume();

    this.audio.addEventListener('timeupdate', this.handleTimeUpdate);
    this.audio.addEventListener('loadedmetadata', this.handleLoadedMetadata);
    this.audio.addEventListener('ended', this.handleEnded);

    effect(() => {
      const track = this.player.currentTrack();
      const isPlaying = this.player.isPlaying();

      if (!track) {
        return;
      }

      if (track.previewUrl !== this.loadedPreviewUrl) {
        this.loadedPreviewUrl = track.previewUrl;
        this.audio.src = track.previewUrl;
        this.audio.load();
        this.currentTime.set(0);
      }

      if (isPlaying) {
        this.audio.play().catch(() => {
          this.player.pause();
        });
      } else {
        this.audio.pause();
      }
    });

    this.destroyRef.onDestroy(() => {
      this.audio.pause();
      this.audio.removeEventListener('timeupdate', this.handleTimeUpdate);
      this.audio.removeEventListener(
        'loadedmetadata',
        this.handleLoadedMetadata,
      );
      this.audio.removeEventListener('ended', this.handleEnded);
    });
  }

  togglePlayback(): void {
    this.player.toggle();
  }

  seek(event: Event): void {
    const input = event.target as HTMLInputElement;
    const nextTime = Number(input.value);

    this.audio.currentTime = nextTime;
    this.currentTime.set(nextTime);
  }

  changeVolume(event: Event): void {
    const input = event.target as HTMLInputElement;
    const nextVolume = Number(input.value);

    this.audio.volume = nextVolume;
    this.volume.set(nextVolume);
  }

  formatTime(value: number): string {
    if (!Number.isFinite(value)) {
      return '0:00';
    }

    const minutes = Math.floor(value / 60);
    const seconds = Math.floor(value % 60)
      .toString()
      .padStart(2, '0');

    return `${minutes}:${seconds}`;
  }

  private readonly handleTimeUpdate = (): void => {
    this.currentTime.set(this.audio.currentTime);
  };

  private readonly handleLoadedMetadata = (): void => {
    this.duration.set(
      Number.isFinite(this.audio.duration) ? this.audio.duration : 30,
    );
  };

  private readonly handleEnded = (): void => {
    this.player.pause();
    this.currentTime.set(0);
  };
}
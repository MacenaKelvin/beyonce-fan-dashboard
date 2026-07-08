import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Itunes {
  private readonly http = inject(HttpClient);

  searchTrack(track: string, artist: string) {
    return this.http.get<any>('https://itunes.apple.com/search', {
      params: {
        term: `${artist} ${track}`,
        entity: 'song',
        limit: 1,
      },
    });
  }
}
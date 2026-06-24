import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';

import { environment } from '../../../environments/environment';
import {
  LastfmTopTracksResponse,
  LastfmTrack,
} from '../../shared/models/lastfm-response';
import { Track } from '../../shared/models/track';

@Injectable({
  providedIn: 'root',
})
export class Lastfm {
  private readonly http = inject(HttpClient);

  getTopTracks(artist = 'Beyoncé', limit = 5) {
    return this.http
      .get<LastfmTopTracksResponse>(environment.lastfmBaseUrl, {
        params: {
          method: 'artist.gettoptracks',
          artist,
          api_key: environment.lastfmApiKey,
          format: 'json',
          limit,
        },
      })
      .pipe(
        map((response) =>
          response.toptracks.track.map((track) => this.mapTrack(track))
        )
      );
  }

  private mapTrack(track: LastfmTrack): Track {
    return {
      name: track.name,
      artist: track.artist.name,
      listeners: track.listeners,
      playcount: track.playcount,
      url: track.url,
      image:
        track.image.find((image) => image.size === 'large')?.['#text'] ?? '',
    };
  }
}
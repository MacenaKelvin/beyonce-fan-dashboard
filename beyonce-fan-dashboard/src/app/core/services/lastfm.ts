import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { forkJoin, map, of, switchMap, catchError } from 'rxjs';

import { environment } from '../../../environments/environment';
import {
  LastfmTopTracksResponse,
  LastfmTrack,
} from '../../shared/models/lastfm-response';
import { Track } from '../../shared/models/track';
import { Itunes } from './itunes';

@Injectable({
  providedIn: 'root',
})
export class Lastfm {
  private readonly http = inject(HttpClient);
  private readonly itunes = inject(Itunes);

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
        ),
        switchMap((tracks) => {
          const enrichedTracks = tracks.map((track) =>
            this.itunes.searchTrack(track.name, track.artist).pipe(
              map((result: any) => {
                const item = result.results?.[0];

                return {
                  ...track,
                  album: item?.collectionName ?? track.album,
                  image:
                    item?.artworkUrl100?.replace('100x100', '300x300') ??
                    track.image,
                  previewUrl: item?.previewUrl,
                };
              }),
              catchError(() => of(track))
            )
          );

          return forkJoin(enrichedTracks);
        })
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
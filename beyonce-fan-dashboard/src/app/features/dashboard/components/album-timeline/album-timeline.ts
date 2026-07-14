import { Component, inject, OnInit, signal } from '@angular/core';
import { catchError, forkJoin, map, of } from 'rxjs';

import { Itunes } from '../../../../core/services/itunes';

interface TimelineAlbum {
  year: number;
  title: string;
  era: string;
  image: string;
}

interface ItunesAlbumResult {
  collectionName?: string;
  artistName?: string;
  artworkUrl100?: string;
}

interface ItunesAlbumResponse {
  results?: ItunesAlbumResult[];
}

@Component({
  selector: 'app-album-timeline',
  imports: [],
  templateUrl: './album-timeline.html',
  styleUrl: './album-timeline.scss',
})
export class AlbumTimeline implements OnInit {
  private readonly itunes = inject(Itunes);

  readonly albums = signal<TimelineAlbum[]>([
    {
      year: 2003,
      title: 'Dangerously in Love',
      era: 'Debut era',
      image: '',
    },
    {
      year: 2006,
      title: "B'Day",
      era: 'Pop/R&B era',
      image: '',
    },
    {
      year: 2008,
      title: 'I Am... Sasha Fierce',
      era: 'Global era',
      image: '',
    },
    {
      year: 2011,
      title: '4',
      era: 'Artistic freedom era',
      image: '',
    },
    {
      year: 2013,
      title: 'Beyoncé',
      era: 'Visual era',
      image: '',
    },
    {
      year: 2016,
      title: 'Lemonade',
      era: 'Cultural era',
      image: '',
    },
    {
      year: 2022,
      title: 'Renaissance',
      era: 'Club era',
      image: '',
    },
    {
      year: 2024,
      title: 'Cowboy Carter',
      era: 'Country era',
      image: '',
    },
  ]);

  readonly loading = signal(true);

  ngOnInit(): void {
    const albumRequests = this.albums().map((album) =>
      this.itunes.searchAlbum(album.title).pipe(
        map((response: ItunesAlbumResponse) => {
          const exactMatch =
            response.results?.find(
              (result) =>
                this.normalize(result.collectionName) ===
                  this.normalize(album.title) &&
                this.normalize(result.artistName).includes('beyonce'),
            ) ?? response.results?.[0];

          return {
            ...album,
            image: this.resizeArtwork(exactMatch?.artworkUrl100),
          };
        }),
        catchError(() => of(album)),
      ),
    );

    forkJoin(albumRequests).subscribe({
      next: (albums) => {
        this.albums.set(albums);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }

  private normalize(value?: string): string {
    return (value ?? '')
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '');
  }

  private resizeArtwork(url?: string): string {
    return url?.replace('100x100bb', '600x600bb') ?? '';
  }
}
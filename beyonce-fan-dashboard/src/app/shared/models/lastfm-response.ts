export interface LastfmTopTracksResponse {
  toptracks: {
    track: LastfmTrack[];
  };
}

export interface LastfmTrack {
  name: string;
  playcount: string;
  listeners: string;
  url: string;
  artist: {
    name: string;
  };
  image: {
    '#text': string;
    size: string;
  }[];
}
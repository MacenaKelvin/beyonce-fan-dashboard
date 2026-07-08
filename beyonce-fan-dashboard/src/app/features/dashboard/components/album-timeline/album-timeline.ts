import { Component } from '@angular/core';

@Component({
  selector: 'app-album-timeline',
  imports: [],
  templateUrl: './album-timeline.html',
  styleUrl: './album-timeline.scss',
})
export class AlbumTimeline {
  albums = [
    { year: 2003, title: 'Dangerously in Love', era: 'Debut era' },
    { year: 2006, title: "B'Day", era: 'Pop/R&B era' },
    { year: 2008, title: 'I Am... Sasha Fierce', era: 'Global era' },
    { year: 2013, title: 'Beyoncé', era: 'Visual era' },
    { year: 2016, title: 'Lemonade', era: 'Cultural era' },
    { year: 2022, title: 'Renaissance', era: 'Club era' },
  ];
}
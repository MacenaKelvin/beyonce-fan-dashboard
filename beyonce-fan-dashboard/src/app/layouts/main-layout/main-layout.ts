import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from '../../shared/components/sidebar/sidebar';
import { Header } from '../../shared/components/header/header';
import { FakePlayer } from '../../shared/components/fake-player/fake-player';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, Sidebar, Header, FakePlayer],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout {}
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {}

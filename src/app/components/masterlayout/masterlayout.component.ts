import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../share/sidebar/sidebar.component';

@Component({
  selector: 'app-masterlayout',
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './masterlayout.component.html',
  styleUrl: './masterlayout.component.css',
})
export class MasterlayoutComponent {}

import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MasterlayoutComponent } from './components/masterlayout/masterlayout.component';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MasterlayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'product-management-ui';
  ngOnInit(): void {
    initFlowbite();
  }
}

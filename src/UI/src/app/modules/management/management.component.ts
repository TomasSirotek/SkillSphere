import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { BoxesComponent } from './pages/boxes/boxes.component';

@Component({
  selector: 'app-management',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

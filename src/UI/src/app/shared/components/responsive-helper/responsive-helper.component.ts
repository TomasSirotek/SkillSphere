import { Component, OnInit } from '@angular/core';

import { NgIf } from '@angular/common';
import { environment } from 'src/environments/environment';


@Component({
    selector: 'app-responsive-helper',
    templateUrl: './responsive-helper.component.html',
    styleUrls: ['./responsive-helper.component.scss'],
    standalone: true,
    imports: [NgIf],
})
export class ResponsiveHelperComponent implements OnInit {
  public env = environment;

  constructor() {}

  ngOnInit(): void {}
}

import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { DrBlytheModule } from 'src/app/dr-blythe-module';

@Component({
  selector: 'app-buttons',
  standalone: true,
  imports: [DrBlytheModule, MatButtonModule],
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent {
  constructor() { }
}

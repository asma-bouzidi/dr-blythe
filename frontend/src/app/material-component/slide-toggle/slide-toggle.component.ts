import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DrBlytheModule } from 'src/app/dr-blythe-module';

@Component({
  selector: 'app-slide-toggle',
  standalone: true,
  imports: [DrBlytheModule, FormsModule, MatCardModule, MatRadioModule, MatCheckboxModule, MatSlideToggleModule],
  templateUrl: './slide-toggle.component.html',
  styleUrls: ['./slide-toggle.component.scss']
})
export class SlideToggleComponent {
  color = 'accent';
  checked = false;
  disabled = false;
}

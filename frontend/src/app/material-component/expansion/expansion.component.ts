import { Component } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { DrBlytheModule } from 'src/app/dr-blythe-module';

@Component({
  selector: 'app-expansion',
  standalone: true,
  imports: [DrBlytheModule],
  templateUrl: './expansion.component.html',
  styleUrls: ['./expansion.component.scss']
})
export class ExpansionComponent {
  panelOpenState = false;
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
}

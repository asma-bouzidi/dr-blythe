import { CdkScrollable } from '@angular/cdk/scrolling';
import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DrBlytheModule } from 'src/app/dr-blythe-module';


@Component({
  selector: 'app-tooltip',
  standalone: true,
  imports:[DrBlytheModule, FormsModule, MatButtonModule, MatTooltipModule, MatFormFieldModule, MatSelectModule, ReactiveFormsModule, NgFor, CdkScrollable],
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent {
  position: any = 'before';
}

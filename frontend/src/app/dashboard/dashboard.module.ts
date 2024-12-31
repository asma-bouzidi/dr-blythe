import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DrBlytheModule } from '../dr-blythe-module';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutes } from './dashboard.routing';

@NgModule({
  imports: [
    CommonModule,
    DrBlytheModule,
    RouterModule.forChild(DashboardRoutes),
    DashboardComponent,
  ],
})
export class DashboardModule { }

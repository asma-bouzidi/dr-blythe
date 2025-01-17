import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { AppointmentService } from '../../../services/appointment.service';
import { NgIf } from '@angular/common';
import { NgToastModule } from 'ng-angular-popup';
import { MatTableModule } from '@angular/material/table';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from "@angular/material/card";
import { MatIcon } from "@angular/material/icon";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { ScrollerComponent } from "../../scroller/scroller.component";

@Component({
  selector: 'app-appointment-details',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    NgIf,
    NgToastModule,
    MatTableModule,
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatCardHeader,
    MatIcon,
    MatProgressSpinner,
    ScrollerComponent
  ],
  templateUrl: './appointment-details.component.html',
  styleUrl: './appointment-details.component.scss'
})
export class AppointmentDetailsComponent {
  appointment: any | null = null;
  error: string | null = null;

  displayedColumns: string[] = [
    'primaryPhysician',
    'reason',
    'note',
    'cancellationReason',
    'schedule'
  ];

  message: string = '';

  constructor(
    private appointmentService: AppointmentService, 
    private route: ActivatedRoute) {
}

  ngOnInit(): void {
    const appointmentId = this.route.snapshot.paramMap.get('appointmentId');
    if (appointmentId){
      this.loadAppointmentData(appointmentId);
    } else {
      this.error = 'Invalid appointment ID'
    }
  }

  loadAppointmentData(appointmentId: string): void{
    this.appointmentService.getAppointmentById(appointmentId).subscribe({
      next: (data) => (this.appointment = data)
    });
  }
}
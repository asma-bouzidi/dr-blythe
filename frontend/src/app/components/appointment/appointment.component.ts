import { Component, OnInit } from '@angular/core';
import { Appointment } from "../../models/appointment.model";
import { catchError, EMPTY, tap } from "rxjs";
import { NgToastService } from "ng-angular-popup";
import { AppointmentService } from "../../services/appointment.service";
import { Router } from "@angular/router";
import {MatButton, MatIconButton} from "@angular/material/button";
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from "@angular/forms";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [
    MatTableModule,
    FormsModule,
    MatIcon,
    MatButton,
    MatIconButton
  ],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.scss'
})
export class AppointmentComponent implements OnInit{
  appointments: Appointment[] = [];

  displayedColumns: string[] = ['primaryPhysician', 'reason', 'note', 'status', 'actions'];
  
  message: string = '';

  constructor(
    private router: Router,
    private appointmentService: AppointmentService,
    private toast: NgToastService
  ) {
  }

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments(): void {
    this.appointmentService.getAllAppointments().pipe(
      tap((appointments) => {
        this.appointments = appointments;
        this.message = 'Appointments fetched successfully!';
        this.toast.success(this.message, '', 3000);
      }),
      catchError((error) => {
        this.message = 'Error fetching appointments!';
        this.toast.danger(this.message, '', 3000);
        console.error(error);
        return EMPTY;
      })
    ).subscribe();
  }

  deleteAppointment(appointmentId: string): void {
    if (confirm('Are you sure you want to delete this Appointment?')) {
      this.appointmentService.deleteAppointmentById(appointmentId).pipe(
        tap(() => {
          this.appointments = this.appointments.filter(appointment => appointment.id !== appointmentId);
          this.message = 'Appointment deleted successfully!';
          this.toast.success(this.message, '', 3000);
        }),
        catchError((error) => {
          this.message = 'Error deleting appointment';
          this.toast.danger(this.message, '', 3000);
          console.error(error);
          return EMPTY;
        })
      ).subscribe();
    }
  }

  navigateToAppointmentDetails(appointmentId: string): void {
    this.router.navigate(['appointment/details/', appointmentId]);
  }

  addAppointment() {
    this.router.navigate(['appointment/add']);
  }

  navigateToAppointmentEdit(appointmentId: string): void {
    this.router.navigate(['appointment/edit/', appointmentId]);
  }
}

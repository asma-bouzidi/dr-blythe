import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogTitle,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AppointmentService } from 'src/app/services/appointment.service';
import { Appointment } from 'src/app/models/appointment.model';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogModule,
    MatTableModule,
    MatDialogContent,
    MatDialogModule,
    MatCheckboxModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './dlg.component.html',
  styleUrl: './dlg.component.scss',
})
export class DlgComponent implements OnInit {
  appointments: Appointment[] = [];
  selectedAppointments: Set<string> = new Set();
  isLoading = true;
  errorMessage = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { assignedAppointments: string[] },
    private dialogRef: MatDialogRef<DlgComponent>,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit(): void {
    this.selectedAppointments = new Set(this.data.assignedAppointments);
    this.loadAppointments();
  }

  loadAppointments(): void {
    this.appointmentService.getAllAppointments().subscribe(
      (appointments) => {
        this.appointments = appointments;
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Failed to load appointments.';
        console.error(error);
        this.isLoading = false;
      }
    );
  }

  toggleSelection(appointmentId: string): void {
    if (this.selectedAppointments.has(appointmentId)) {
      this.selectedAppointments.delete(appointmentId);
    } else {
      this.selectedAppointments.add(appointmentId);
    }
  }

  confirmSelection(): void {
    const selectedAppointments = this.appointments.filter((a) =>
      this.selectedAppointments.has(a.id)
    );
    this.dialogRef.close(selectedAppointments);
  }

  closeDlg(): void {
    this.dialogRef.close();
  }
}

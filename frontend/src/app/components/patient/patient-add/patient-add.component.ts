import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { PatientService } from '../../../services/patient.service';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { NgIf } from '@angular/common';
import {
  NgToastModule,
  NgToastService,
  ToasterPosition,
} from 'ng-angular-popup';
import {
  MatCard,
  MatCardContent,
  MatCardTitle,
  MatCardHeader,
} from '@angular/material/card';
import { Patient } from '../../../models/patient.model';
import { MatCheckbox } from '@angular/material/checkbox';
import { Util } from '../../../utils/Util';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { ScrollerComponent } from '../../scroller/scroller.component';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DlgComponent } from '../../dlg/dlg.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { Appointment } from 'src/app/models/appointment.model';
import { AppointmentService } from 'src/app/services/appointment.service';

export interface DlgData {
  assignedAppointments: number[];
}
@Component({
  selector: 'app-patient-add',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    FormsModule,
    MatIcon,
    NgIf,
    NgToastModule,
    MatCardTitle,
    MatCardHeader,
    MatCardContent,
    MatCard,
    MatCheckbox,
    MatButton,
    MatChipsModule,
    MatInput,
    ScrollerComponent,
  ],
  templateUrl: './patient-add.component.html',
  styleUrl: './patient-add.component.scss',
})
export class PatientAddComponent {
  patient: Patient = Util.initializePatient();
  assignedAppointments: Appointment[] = [];
  message = '';
  protected readonly ToasterPosition = ToasterPosition;

  isSubmitting = false;
  constructor(
    private router: Router,
    private patientService: PatientService,
    private toast: NgToastService,
    private dialog: MatDialog
  ) {}

  createPatient(): void {
    this.isSubmitting = true;
    this.patient.appointments = this.assignedAppointments.map(
      (appointment) => ({
        ...appointment,
      })
    );

    this.patientService
      .createPatient(this.patient)
      .pipe(
        tap(() => {
          this.message = 'Patient created successfully!';
          setTimeout(() => {
            this.toast.success(this.message, '', 3000);
          });
          this.resetForm();
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 3000);
        }),
        catchError((error) => {
          this.message = 'Error creating patient!';
          this.toast.danger(this.message, '', 3000);
          console.error(error);
          return of(error);
        })
      )
      .subscribe();
  }

  openDlg(): void {
    const dlgRef = this.dialog.open(DlgComponent, {
      data: {
        assignedAppointments: this.assignedAppointments.map((a) => a.id),
      },
    });

    dlgRef.afterClosed().subscribe((selectedAppointments: Appointment[]) => {
      if (selectedAppointments) {
        this.assignedAppointments = selectedAppointments;
      }
    });
  }

  resetForm(): void {
    this.patient = Util.initializePatient();
    this.assignedAppointments = [];
  }
}

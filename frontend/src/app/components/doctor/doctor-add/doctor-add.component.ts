import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { DoctorService } from '../../../services/doctor.service';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';
import { NgIf } from '@angular/common';
import { NgFor } from '@angular/common';
import {
  NgToastModule,
  NgToastService,
  ToasterPosition,
} from 'ng-angular-popup';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { Doctor } from '../../../models/doctor.model';
import { Util } from '../../../utils/Util';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../dialog/dialog.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { Patient } from 'src/app/models/patient.model';
import { PatientService } from 'src/app/services/patient.service';

export interface DialogData {
  assignedPatients: number[]; // Array of patient IDs already assigned to the doctor
}

@Component({
  selector: 'app-doctor-add',
  standalone: true,
  imports: [
    MatFormFieldModule,
    NgFor,
    MatIcon,
    MatInputModule,
    MatCardTitle,
    MatCardHeader,
    MatSelectModule,
    FormsModule,
    NgToastModule,
    MatCardContent,
    MatCard,
    MatButton,
    NgIf,
    MatChipsModule,
    MatDialogModule,
  ],
  templateUrl: './doctor-add.component.html',
  styleUrl: './doctor-add.component.scss',
})
export class DoctorAddComponent {
  doctor: Doctor = Util.initializeDoctor();
  assignedPatients: Patient[] = [];
  message = '';
  protected readonly ToasterPosition = ToasterPosition;

  isSubmitting = false;

  constructor(
    private doctorService: DoctorService,
    private patientService: PatientService,
    private toast: NgToastService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  createDoctor(): void {
    this.isSubmitting = true;

    // Modify patient isAssigned before updating them in the backend
    const updatedPatients = this.assignedPatients.map((patient) => ({
      ...patient,
      isAssigned: true, // Example modification
    }));

    // Create an array of update observables for each patient
    const updateObservables = updatedPatients.map((patient) =>
      this.patientService.updatePatientById(patient.id, patient)
    );

    // Execute all updates before creating the doctor
    forkJoin(updateObservables)
      .pipe(
        switchMap(() => {
          this.doctor.patients = updatedPatients; // Ensure doctor has updated patients
          return this.doctorService.createDoctor(this.doctor);
        }),
        tap(() => {
          this.toast.success(this.message, '', 3000);
          this.resetForm();
          this.router.navigate(['/doctor']);
        }),
        catchError((error) => {
          this.toast.danger(this.message, '', 3000);
          console.error(error);
          return of(error);
        })
      )
      .subscribe(() => (this.isSubmitting = false));
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { assignedPatients: this.assignedPatients.map((p) => p.id) },
    });

    dialogRef.afterClosed().subscribe((selectedPatients: Patient[]) => {
      if (selectedPatients) {
        this.assignedPatients = selectedPatients;
      }
    });
  }

  resetForm(): void {
    this.doctor = Util.initializeDoctor();
    this.assignedPatients = [];
  }
}

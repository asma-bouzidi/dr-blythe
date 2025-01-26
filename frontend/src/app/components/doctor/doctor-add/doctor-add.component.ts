import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { DoctorService } from '../../../services/doctor.service';
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
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { Doctor } from '../../../models/doctor.model';
import { Util } from '../../../utils/Util';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { ScrollerComponent } from '../../scroller/scroller.component';
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
    ScrollerComponent,
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
    this.doctor.patients = this.assignedPatients.map((patient) => ({
      ...patient,
    }));

    this.doctorService
      .createDoctor(this.doctor)
      .pipe(
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

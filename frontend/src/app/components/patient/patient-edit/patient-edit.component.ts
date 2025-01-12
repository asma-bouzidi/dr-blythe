import {Component, OnInit} from '@angular/core';
import {Patient} from "../../../models/patient.model";
import {ActivatedRoute, Router} from "@angular/router";
import {PatientService} from "../../../services/patient.service";
import {NgToastModule, NgToastService, ToasterPosition,} from 'ng-angular-popup';
import {catchError, of, tap} from "rxjs";
import {FormsModule} from "@angular/forms";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatFormField} from "@angular/material/form-field";
import {NgIf} from "@angular/common";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-patient-edit',
  standalone: true,
  imports: [
    FormsModule,
    MatCard,
    MatCardContent,
    MatFormField,
    MatCardTitle,
    NgToastModule,
    NgIf,
    MatInput,
    MatButton
  ],
  templateUrl: './patient-edit.component.html',
  styleUrl: './patient-edit.component.scss'
})
export class PatientEditComponent implements OnInit {
  patient: Patient | null = null; // Initially null until data is fetched
  message = '';

  protected readonly ToasterPosition = ToasterPosition;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private patientService: PatientService,
    private toast: NgToastService
  ) {
  }

  routeId = this.route.snapshot.paramMap.get('patientId');

  ngOnInit() {
    const patientId = this.routeId;

    if (patientId) {
      this.fetchPatient(patientId); // Fetch patient data by ID
    } else {
      this.message = 'Invalid Patient ID!';
      this.toast.danger(this.message, '', 3000);
    }
  }

  fetchPatient(id: string) {
    this.patientService
    .getPatientById(id)
    .pipe(
      tap((data) => {
        if (data) {
          this.patient = data; // Assign fetched patient data
        } else {
          this.message = 'Patient not found!';
          this.toast.danger(this.message, '', 3000);
        }
      }),
      catchError((error) => {
        this.message = 'Error fetching patient details!';
        this.toast.danger(this.message, '', 3000);
        console.error(error);
        return of(null); // Return an observable with null in case of error
      })
    )
    .subscribe();
  }

  updatePatient() {
    const patientId = this.routeId;
    if (this.patient?.id) {
      this.patientService
      .updatePatientById(this.patient.id, this.patient)
      .pipe(
        tap(() => {
          this.message = 'Patient updated successfully!';
          this.toast.success(this.message, '', 3000);
          setTimeout(() => {
            this.navigateToPatientEdit(patientId!);
          }, 3000);
        }),
        catchError((error) => {
          this.message = 'Error updating patient!';
          this.toast.danger(this.message, '', 3000);
          console.error(error);
          return of(null);
        })
      )
      .subscribe();
    } else {
      this.message = 'Patient ID is missing!';
      this.toast.danger(this.message, '', 3000);
    }
  }

  navigateToPatientEdit(patientId: string): void {
    this.router.navigate(['patient/details/', patientId]);
  }
}

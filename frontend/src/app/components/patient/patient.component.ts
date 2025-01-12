import {Component, OnInit} from '@angular/core';
import {Patient} from "../../models/patient.model";
import {catchError, EMPTY, tap} from "rxjs";
import {NgToastService} from "ng-angular-popup";
import {PatientService} from "../../services/patient.service";
import {NgForOf, NgIf} from "@angular/common";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {Router} from "@angular/router";

@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    MatButton,
    MatIcon,
    MatIconButton
  ],
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.scss'
})
export class PatientComponent implements OnInit {
  patients: Patient[] = [];

  message: string = '';

  constructor(
    private router: Router,
    private patientService: PatientService,
    private toast: NgToastService
  ) {
  }

  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients(): void {
    this.patientService.getAllPatients().pipe(
      tap((patients) => {
        this.patients = patients;
        this.message = 'Patients fetched successfully!';
        this.toast.success(this.message, '', 3000);
      }),
      catchError((error) => {
        this.message = 'Error fetching patients!';
        this.toast.danger(this.message, '', 3000);
        console.error(error);
        // Return an empty observable or handle the error as needed
        return EMPTY;
      })
    ).subscribe();
  }

  deletePatient(patientId: string): void {
    if (confirm('Are you sure you want to delete this Patient?')) {
      this.patientService.deletePatientById(patientId).pipe(
        tap(() => {
          this.patients = this.patients.filter(patient => patient.id !== patientId);
          this.message = 'Patient deleted successfully';
          this.toast.success(this.message, '', 3000);
        }),
        catchError((error) => {
          this.message = 'Error deleting patient';
          this.toast.danger(this.message, '', 3000);
          console.error(error);
          return EMPTY;
        })
      ).subscribe();
    }
  }

  viewPatientDetails(patientId: string): void {
    this.router.navigate(['patient/details', patientId]);
  }

  addPatient() {
    this.router.navigate(['patient/add']);
  }

}


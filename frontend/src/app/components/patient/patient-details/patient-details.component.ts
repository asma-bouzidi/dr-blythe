import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {PatientService} from '../../../services/patient.service';
import {NgIf} from '@angular/common';
import {NgToastModule,} from 'ng-angular-popup';
import {MatTableModule} from '@angular/material/table';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {ScrollerComponent} from "../../scroller/scroller.component";

@Component({
  selector: 'app-patient-details',
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
  templateUrl: './patient-details.component.html',
  styleUrl: './patient-details.component.scss'
})
export class PatientDetailsComponent implements OnInit {
  patient: any | null = null;
  error: string | null = null;

  displayedColumns: string[] = [
    'name',
    'age',
    'gender',
    'address',
    'email',
    'phone',
    'occupation',
    'emergencyContactName',
    'emergencyContactNumber',
    'insuranceProvider',
    'insurancePolicyNumber',
    'allergies',
    'currentMedication',
    'primaryConsent',
    'familyMedicalHistory',
    'pastMedicalHistory',
    'identificationType',
    'identificationNumber',
    'identificationDocumentId',
    'identificationDocumentUrl'];


  message: string = '';

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService
  ) {
  }

  ngOnInit(): void {
    const patientId = this.route.snapshot.paramMap.get('patientId');
    if (patientId) {
      this.loadPatientData(patientId);
    } else {
      this.error = 'Invalid patient ID';
    }
  }

  loadPatientData(patientId: string): void {
    this.patientService.getPatientById(patientId).subscribe({
      next: (data) => (this.patient = data)
    });
  }

}

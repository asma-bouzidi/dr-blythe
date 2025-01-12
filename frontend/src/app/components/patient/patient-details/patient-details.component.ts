import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {PatientService} from '../../../services/patient.service';
import {NgIf} from '@angular/common';
import {NgToastModule,} from 'ng-angular-popup';
import {Patient} from '../../../models/patient.model';

@Component({
  selector: 'app-patient-details',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    NgIf,
    NgToastModule,

  ],
  templateUrl: './patient-details.component.html',
  styleUrl: './patient-details.component.scss'
})
export class PatientDetailsComponent implements OnInit {
  patient: Patient | null = null;
  error: string | null = null;

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

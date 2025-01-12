import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {PatientService} from '../../../services/patient.service';
import {NgIf} from '@angular/common';
import {NgToastModule, ToasterPosition,} from 'ng-angular-popup';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {Patient} from '../../../models/patient.model';
import {Util} from '../../../utils/Util';

@Component({
  selector: 'app-patient-details',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    NgIf,
    NgToastModule,
    MatCardTitle,
    MatCardContent,
    MatCard,
  ],
  templateUrl: './patient-details.component.html',
  styleUrl: './patient-details.component.scss'
})
export class PatientDetailsComponent implements OnInit {
  patient: Patient | null = null;
  error: string | null = null;

  protected readonly ToasterPosition = ToasterPosition;

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService
  ) {}

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
      next: (data) => (this.patient = data),
      error: (err) => (this.error = err)
    });
  }


}

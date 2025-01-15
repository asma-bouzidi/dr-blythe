import {Component} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {PatientService} from '../../../services/patient.service';
import {catchError, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {NgIf} from '@angular/common';
import {NgToastModule, NgToastService, ToasterPosition,} from 'ng-angular-popup';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {Patient} from '../../../models/patient.model';
import {MatCheckbox} from '@angular/material/checkbox';
import {Util} from '../../../utils/Util';
import {MatButton, MatIconButton} from "@angular/material/button";
import {Router} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {ScrollerComponent} from "../../scroller/scroller.component";

@Component({
  selector: 'app-patient-add',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    NgIf,
    NgToastModule,
    MatCardTitle,
    MatCardContent,
    MatCard,
    MatCheckbox,
    MatButton,
    MatIcon,
    MatIconButton,
    ScrollerComponent,
  ],
  templateUrl: './patient-add.component.html',
  styleUrl: './patient-add.component.scss'
})
export class PatientAddComponent {
  patient: Patient = Util.initializePatient();
  message = '';

  protected readonly ToasterPosition = ToasterPosition;

  constructor(
    private router: Router,
    private patientService: PatientService,
    private toast: NgToastService,
  ) {
  }

  createPatient() {
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
      }),
    )
    .subscribe();
  }

  private resetForm() {
    this.patient = Util.initializePatient();
  }
}

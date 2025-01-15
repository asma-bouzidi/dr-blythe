import { Component } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {DoctorService} from '../../../services/doctor.service';
import {catchError, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {NgIf} from '@angular/common';
import {NgToastModule, NgToastService, ToasterPosition,} from 'ng-angular-popup';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {Doctor} from '../../../models/doctor.model';
import {MatCheckbox} from '@angular/material/checkbox';
import {Util} from '../../../utils/Util';
import {MatButton} from "@angular/material/button";
import {Router} from "@angular/router";

@Component({
  selector: 'app-doctor-add',
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
  ],
  templateUrl: './doctor-add.component.html',
  styleUrl: './doctor-add.component.scss'
})
export class DoctorAddComponent {

  doctor: Doctor = Util.initializeDoctor();
  message = '';

  protected readonly ToasterPosition = ToasterPosition;

  constructor(
    private router: Router,
    private doctorService: DoctorService,
    private toast: NgToastService,
  ) {
  }

  createDoctor() {
    this.doctorService
      .createDoctor(this.doctor)
      .pipe(
        tap(() => {
          this.message = 'Doctor created successfully!';
          setTimeout(() => {
            this.toast.success(this.message, '', 3000);
          });
          this.resetForm();
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 3000);
        }),
        catchError((error) => {
          this.message = 'Error creating Doctor!';
          this.toast.danger(this.message, '', 3000);
          console.error(error);
          return of(error);
        }),
      )
      .subscribe();
  }

  private resetForm() {
    this.doctor = Util.initializeDoctor();
  }
}

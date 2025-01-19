import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { AppointmentService } from '../../../services/appointment.service';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { NgIf } from '@angular/common';
import { NgToastModule, NgToastService, ToasterPosition, } from 'ng-angular-popup';
import { MatCard, MatCardContent } from '@angular/material/card';
import { Appointment } from '../../../models/appointment.model';
import { Util } from '../../../utils/Util';
import { MatButton } from "@angular/material/button";
import { Router } from "@angular/router";
import { ScrollerComponent } from "../../scroller/scroller.component";

@Component({
  selector: 'app-appointment-add',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    NgToastModule,
    MatCardContent,
    MatCard,
    MatButton,
    NgIf,
    ScrollerComponent
  ],
  templateUrl: './appointment-add.component.html',
  styleUrl: './appointment-add.component.scss'
})
export class AppointmentAddComponent {

  appointment: Appointment = Util.initializeAppointment();
  message = '';

  protected readonly ToasterPosition = ToasterPosition;

  constructor(
    private router: Router,
    private appointmentService: AppointmentService,
    private toast: NgToastService,
  ) {
  }

  createAppointment() {
    this.appointmentService
      .createAppointment(this.appointment)
      .pipe(
        tap(() => {
          this.message = 'Appointment created successfully!';
          setTimeout(() => {
            this.toast.success(this.message, '', 3000);
          });
          this.resetForm();
          setTimeout(() => {
            this.router.navigate(['/appointment']);
          }, 3000);
        }),
        catchError((error) => {
          this.message = 'Error creating appointment';
            this.toast.danger(this.message, '', 3000);
            console.error(error);
            return of(error);
          }),
        )
      .subscribe();
  }

  private resetForm() {
    this.appointment = Util.initializeAppointment();
  }

}

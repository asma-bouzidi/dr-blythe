import { Component, OnInit } from '@angular/core';
import {Appointment} from "../../../models/appointment.model";
import {ActivatedRoute, Router} from "@angular/router";
import {AppointmentService} from "../../../services/appointment.service";
import {NgToastModule, NgToastService, ToasterPosition,} from 'ng-angular-popup';
import {catchError, of, tap} from "rxjs";
import {FormsModule} from "@angular/forms";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {NgIf} from "@angular/common";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatIcon} from "@angular/material/icon";
import {ScrollerComponent} from "../../scroller/scroller.component";

@Component({
  selector: 'app-appointment-edit',
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
    MatButton,
    MatSelect,
    MatOption,
    MatCardHeader,
    MatIcon,
    MatFormFieldModule,
    MatInputModule,
    ScrollerComponent,
  ],
  templateUrl: './appointment-edit.component.html',
  styleUrl: './appointment-edit.component.scss'
})
export class AppointmentEditComponent implements OnInit{
  appointment: Appointment | null = null; // Initially null until data is fetched
  message = '';
  routeId = this.route.snapshot.paramMap.get('appointmentId');
  protected readonly ToasterPosition = ToasterPosition;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appointmentService: AppointmentService,
    private toast: NgToastService
  ) {
  }

  ngOnInit() {
    const appointmentId = this.routeId;

    if (appointmentId) {
      this.fetchAppointment(appointmentId); // Fetch appointment data by ID
    } else {
      this.message = 'Invalid Appointment ID!';
      this.toast.danger(this.message, '', 3000);
    }
  }

  fetchAppointment(id: string) {
    this.appointmentService
    .getAppointmentById(id)
      .pipe(
        tap((data) => {
          if(data) {
            this.appointment = data;
          } else {
            this.message = 'Appointment not found!';
            this.toast.danger(this.message, '', 3000);
          }
        }),
        catchError((error) => {
          this.message = 'Error fetching appointment details!';
          this.toast.danger(this.message, '', 3000);
          console.error(error);
          return of(null);
        })
      ).subscribe();
    }
          
      updateAppointment() {
        const appointmentId = this.routeId;
        if (this.appointment?.id) {
          this.appointmentService
          .updateAppointmentById(this.appointment.id, this.appointment)
          .pipe(
            tap(() => {
                this.message = 'Appointment updated successfully!';
                this.toast.success(this.message, '', 3000);
                setTimeout(() => {
                  this.navigateToAppointmentEdit(appointmentId!);
                }, 3000);
            }),
            catchError((error) => {
              this.message = 'Error updating appointment!';
              this.toast.danger(this.message, '', 3000);
              console.error(error);
              return of(null);
            })
          ).subscribe();
        } else {
          this.message = 'Invalid Appointment ID!';
          this.toast.danger(this.message, '', 3000);
        }
      }

      navigateToAppointmentEdit(appointmentId: string) {
        this.router.navigate(['/appointment/details', appointmentId]);
      }
    }

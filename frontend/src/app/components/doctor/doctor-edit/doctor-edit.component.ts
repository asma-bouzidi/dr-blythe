import { Component, OnInit } from '@angular/core';
import {Doctor} from "../../../models/doctor.model";
import {ActivatedRoute, Router} from "@angular/router";
import {DoctorService} from "../../../services/doctor.service";
import {NgToastModule, NgToastService, ToasterPosition,} from 'ng-angular-popup';
import {FormsModule} from "@angular/forms";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {NgIf} from "@angular/common";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatIcon} from "@angular/material/icon";
import {ScrollerComponent} from "../../scroller/scroller.component";
import { catchError, of, tap } from 'rxjs';


@Component({
  selector: 'app-doctor-edit',
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
  templateUrl: './doctor-edit.component.html',
  styleUrl: './doctor-edit.component.scss'
})
export class DoctorEditComponent implements OnInit {
  doctor: Doctor | null = null; // Initially null until data is fetched
  message = '';
  routeId = this.route.snapshot.paramMap.get('doctorId');
  protected readonly ToasterPosition = ToasterPosition;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private doctorService: DoctorService,
    private toast: NgToastService
  ) {
  }

  ngOnInit() {
    const doctorId = this.routeId;

    if (doctorId) {
      this.fetchDoctor(doctorId); // Fetch doctor data by ID
    } else {
      this.message = 'Invalid Doctor ID!';
      this.toast.danger(this.message, '', 3000);
    }
  }

  fetchDoctor(id: string) {
    this.doctorService.
    getDoctorById(id)
      .pipe(
        tap((data) => {
          if (data) {
            this.doctor = data;
          } else {
            this.message = 'Doctor not found!';
            this.toast.danger(this.message, 'danger', 3000);
          }
        }),
        catchError((error) => {
          this.message = 'Error fetching doctor details!';
          this.toast.danger(this.message, '', 3000);
          console.error(error);
          return of(null);
        })
      )
      .subscribe();
  }

  updateDoctor(){
    const doctorId = this.routeId;
    if(this.doctor?.id) {
      this.doctorService
      .updateDoctorById(this.doctor.id, this.doctor)
      .pipe(
        tap(() => {
          this.message = 'Doctor updated successfully!';
          this.toast.success(this.message, '', 3000);
          setTimeout(() => {
            this.navigateToDoctorEdit(doctorId!);
          }, 3000);
        }),
        catchError((error) => {
          this.message = 'Error updating doctor!';
          this.toast.danger(this.message, '', 3000);
          console.error(error);
          return of(null);
        })
      ).subscribe();
    } else {
      this.message = 'Invalid Doctor ID!';
      this.toast.danger(this.message, '', 3000);
    }
  }

  navigateToDoctorEdit(doctorId: string): void {
    this.router.navigate(['/doctor/details/', doctorId]);
  }
}

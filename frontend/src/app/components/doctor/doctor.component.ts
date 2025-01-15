import { Component, OnInit } from '@angular/core';
import {Doctor} from "../../models/doctor.model";
import {catchError, EMPTY, tap} from "rxjs";
import {NgToastService} from "ng-angular-popup";
import {DoctorService} from "../../services/doctor.service";
import {NgForOf, NgIf} from "@angular/common";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {Router} from "@angular/router";
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-doctor',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    MatButton,
    MatIcon,
    MatIconButton,
    MatTableModule
  ],
  templateUrl: './doctor.component.html',
  styleUrl: './doctor.component.scss'
})
export class DoctorComponent {


  doctors: Doctor[] = [];
  message: string = '';

  constructor(
      private router: Router,
      private doctorService: DoctorService,
      private toast: NgToastService
  ) {
  }

  ngOnInit(): void {
    this.loadDoctors();
  }

  loadDoctors(): void {
    this.doctorService.getAllDoctors().pipe(
        tap((doctors) => {
          this.doctors = doctors;
          this.message = 'Doctors fetched successfully!';
          this.toast.success(this.message, '', 3000);
        }),
        catchError((error) => {
          this.message = 'Error fetching doctors!';
          this.toast.danger(this.message, '', 3000);
          console.error(error);
          return EMPTY;
        })
    ).subscribe();
  }

  addDoctor() {
    this.router.navigate(['doctor/add']);
  }
}

import { Component, OnInit } from '@angular/core';
import { Doctor } from '../../models/doctor.model';
import { catchError, EMPTY, tap } from 'rxjs';
import { NgToastService } from 'ng-angular-popup';
import { DoctorService } from '../../services/doctor.service';
import { MatButton, MatIconButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { ScrollerComponent } from '../scroller/scroller.component';

@Component({
  selector: 'app-doctor',
  standalone: true,
  imports: [MatButton, MatTableModule, FormsModule, MatIcon, ScrollerComponent, MatIconButton],
  templateUrl: './doctor.component.html',
  styleUrl: './doctor.component.scss',
})
export class DoctorComponent implements OnInit {
  doctors: Doctor[] = [];

  displayedColumns: string[] = [
    'name',
    'specialization',
    'email',
    'address',
    'actions',
  ];
  message: string = '';

  constructor(
    private router: Router,
    private doctorService: DoctorService,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.loadDoctors();
  }

  loadDoctors(): void {
    this.doctorService
      .getAllDoctors()
      .pipe(
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
      )
      .subscribe();
  }

  deleteDoctor(doctorId: string): void {
    if (confirm('Are you sure you want to delete this Doctor?')) {
      this.doctorService
        .deleteDoctorById(doctorId)
        .pipe(
          tap(() => {
            this.doctors = this.doctors.filter(
              (doctor) => doctor.id !== doctorId
            );
            this.message = 'Doctor deleted successfully';
            this.toast.success(this.message, '', 3000);
          }),
          catchError((error) => {
            this.message = 'Error deleting doctor';
            this.toast.danger(this.message, '', 3000);
            console.error(error);
            return EMPTY;
          })
        )
        .subscribe();
    }
  }

  navigateToDoctorDetails(doctorId: string): void {
    this.router.navigate(['doctor/details/', doctorId]);
  }

  addDoctor() {
    this.router.navigate(['doctor/add']);
  }

  navigateToDoctorEdit(doctorId: string): void {
    this.router.navigate(['doctor/edit/', doctorId]);
  }
}

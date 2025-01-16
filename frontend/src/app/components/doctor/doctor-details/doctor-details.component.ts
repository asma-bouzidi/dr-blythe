import {Component, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {NgIf} from "@angular/common";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule} from "@angular/forms";
import {NgToastModule} from "ng-angular-popup";
import {MatTableModule} from "@angular/material/table";
import {ActivatedRoute} from "@angular/router";
import {DoctorService} from "../../../services/doctor.service";

@Component({
  selector: 'app-doctor-details',
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
    MatProgressSpinner
  ],
  templateUrl: './doctor-details.component.html',
  styleUrl: './doctor-details.component.scss'
})
export class DoctorDetailsComponent implements OnInit {

  doctor: any | null = null;
  error: string | null = null;

  displayedColumns: string[] = [
    'name',
    'image']

  message: string = '';

  constructor(
    private route: ActivatedRoute,
    private doctorService: DoctorService,
  ) {
  }

  ngOnInit(): void {
    const doctorId = this.route.snapshot.paramMap.get("doctorId");
    if (doctorId) {
      this.loadDoctorData(doctorId);
    } else {
      this.error = 'Invalid doctor ID';
    }
  }

  loadDoctorData(doctorId: string): void {
    this.doctorService.getDoctorById(doctorId).subscribe({
      next: (data) => (this.doctor = data)
    });
  }
}

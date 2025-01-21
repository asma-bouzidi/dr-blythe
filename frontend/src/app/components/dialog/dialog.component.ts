import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { DialogData } from '../doctor/doctor-add/doctor-add.component';
import { PatientComponent } from '../patient/patient.component';
import { PatientService } from 'src/app/services/patient.service';
import { Patient } from 'src/app/models/patient.model';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private patientService: PatientService
  ) {

  }


  patients: Patient[] = [];

  ngOnInit(): void {
    this.patientService.getAllPatients().subscribe((data: Patient[]) => {
      this.patients = data;
      console.log(this.patients);
    });
  }
}

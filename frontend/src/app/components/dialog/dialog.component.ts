import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogTitle, MatDialogModule} from '@angular/material/dialog';
import { DialogData } from '../doctor/doctor-add/doctor-add.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PatientComponent } from '../patient/patient.component';
import { PatientService } from 'src/app/services/patient.service';
import { Patient } from 'src/app/models/patient.model';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common'; // Import CommonModule for *ngIf and *ngFor


@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatTableModule,
    MatDialogContent,
    MatDialogModule,
    MatCheckboxModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {
  patients: Patient[] = [];

  displayedColumns: string[] = ['select', 'name', 'age', 'gender'];
  message: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private patientService: PatientService
  ) {

  }


  ngOnInit(): void {
    this.patientService.getAllPatients().subscribe((data: Patient[]) => {
      this.patients = data;
      console.log(this.patients);
    });
  }
}

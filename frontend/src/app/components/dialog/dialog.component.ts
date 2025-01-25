import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogTitle, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';  // Ensure this import
import { MatCheckboxModule } from '@angular/material/checkbox';
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
export class DialogComponent implements OnInit {
  patients: Patient[] = []; // List of available patients
  selectedPatients: Set<string> = new Set(); // Tracks selected patient IDs
  displayedColumns: string[] = ['select', 'name', 'age', 'gender'];
  dataSource = new MatTableDataSource<Patient>([]);
  isLoading = true;
  errorMessage = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DialogComponent>,
    private patientService: PatientService
  ) {}

  ngOnInit(): void {
    if (this.data.assignedPatients) {
      this.selectedPatients = new Set(this.data.assignedPatients);
    }
    this.loadPatients();
  }

  loadPatients(): void {
    this.patientService.getAllPatients().subscribe(
      (data: Patient[]) => {
        this.patients = data.filter(patient => !this.selectedPatients.has(patient.id));
        this.dataSource.data = this.patients;  // Update the data in MatTableDataSource
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching patients', error);
        this.errorMessage = 'Failed to load patient data.';
        this.isLoading = false;
      }
    );
  }

  toggleSelection(patientId: string): void {
    if (this.selectedPatients.has(patientId)) {
      this.selectedPatients.delete(patientId);
    } else {
      this.selectedPatients.add(patientId);
    }
  }

  assignPatients(): void {
    const selectedPatientIds = Array.from(this.selectedPatients);
    this.dialogRef.close(selectedPatientIds);
  }
}
import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogTitle,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table'; // Ensure this import
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
    CommonModule,
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent implements OnInit {
  patients: Patient[] = [];
  selectedPatients: Set<string> = new Set();
  isLoading = true;
  errorMessage = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { assignedPatients: string[] },
    private dialogRef: MatDialogRef<DialogComponent>,
    private patientService: PatientService
  ) {}

  ngOnInit(): void {
    this.selectedPatients = new Set(this.data.assignedPatients);
    this.loadPatients();
  }

  loadPatients(): void {
    this.patientService.getAllPatients().subscribe(
      (patients) => {
        this.patients = patients;
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Failed to load patients.';
        console.error(error);
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

  confirmSelection(): void {
    const selectedPatients = this.patients.filter((p) =>
      this.selectedPatients.has(p.id)
    );
    this.dialogRef.close(selectedPatients);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}

// test

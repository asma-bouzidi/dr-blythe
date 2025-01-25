import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogTitle, MatDialogModule} from '@angular/material/dialog';
import { DialogData } from '../doctor/doctor-add/doctor-add.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PatientService } from 'src/app/services/patient.service';
import { Patient } from 'src/app/models/patient.model';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
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
  patients: Patient[] = []; // List of available patients
  assignedPatients: Set<number> = new Set(); // Tracks patients already assigned
  selectedPatients: Set<number> = new Set(); // Tracks patients selected for this session
  displayedColumns: string[] = ['select', 'name', 'age', 'gender'];
  dataSource = new MatTableDataSource<Patient>([]);
  isLoading = true;
  errorMessage = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData, // Inject the data passed to the dialog
    private patientService: PatientService
  ) {}

  ngOnInit(): void {
    // Load assigned patients from the passed data
    if (this.data.assignedPatients) {
      this.assignedPatients = new Set(this.data.assignedPatients);
    }

    this.loadPatients();
  }

  loadPatients(): void {
    this.patientService.getAllPatients().subscribe(
      (data: Patient[]) => {
        this.patients = [];

        // Loop through patients and exclude already assigned ones
        for (const patient of data) {
          if (!this.assignedPatients.has(patient.id)) {
            this.patients.push(patient);
          }
        }

        this.dataSource.data = this.patients;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching patients', error);
        this.errorMessage = 'Failed to load patient data.';
        this.isLoading = false;
      }
    );
  }

  // Toggle patient selection
  toggleSelection(patientId: number): void {
    if (this.selectedPatients.has(patientId)) {
      this.selectedPatients.delete(patientId); // Deselect
    } else {
      this.selectedPatients.add(patientId); // Select
    }
  }

  assignPatients(): void {
    if (this.selectedPatients.size === 0) {
      return; // No patients selected, exit early
    }

    // Add selected patients to assigned list
    for (const patientId of this.selectedPatients) {
      this.assignedPatients.add(patientId);
    }

    // Remove assigned patients from the displayed list
    this.patients = this.patients.filter(p => !this.assignedPatients.has(p.id));
    this.dataSource.data = this.patients;

    // Clear selected patients
    this.selectedPatients.clear();
  }
}
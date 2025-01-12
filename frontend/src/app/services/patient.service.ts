import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {Patient} from "../models/patient.model";

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private apiUrl = 'http://localhost:8080/api'; // Backend API URL

  constructor(private http: HttpClient) {
  }

  getAllPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.apiUrl}/patient`);
  }

  createPatient(patient: { name: string; }): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/patient`, patient);
  }

  deletePatientById(patientId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/patient/${patientId}`);
  }

  viewPatientDetails(patientId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/patient/${patientId}`);
  }

  getPatientById(patientId: string): Observable<Patient> {
    return this.http.get<Patient>(`${this.apiUrl}/patient/${patientId}`).pipe(
      catchError(err => {
        console.error('Error fetching patient data', err);
        return throwError(() => 'Failed to retrieve patient data.');
      })
    );
  }


}

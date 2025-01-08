import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
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
}

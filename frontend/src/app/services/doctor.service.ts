import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Doctor} from "../models/doctor.model";


@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private apiUrl = 'http://localhost:8080/api'; // Backend API URL

  constructor(private http: HttpClient) {
  }

  getAllDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`${this.apiUrl}/doctor`);
  }

  createDoctor(doctor: { name: string; }): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/doctor`, doctor);
  }

  deleteDoctorById(doctorId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/doctor/${doctorId}`);
  }

  getDoctorById(doctorId: string): Observable<Doctor> {
    return this.http.get<Doctor>(`${this.apiUrl}/doctor/${doctorId}`);
  }


  updateDoctorById(doctorId: string, doctor: Doctor): Observable<Doctor> {
    return this.http.put<Doctor>(`${this.apiUrl}/doctor/${doctorId}`, doctor);
  }
}

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Appointment } from "../models/appointment.model";

@Injectable({
    providedIn: 'root'
})
export class AppointmentService {

    private apiUrl = 'http://localhost:8080/api'; // Backend API URL

    constructor(private http: HttpClient) {
    }

    getAllAppointments(): Observable<Appointment[]> {
        return this.http.get<Appointment[]>(`${this.apiUrl}/appointment`);
    }

    createAppointment(appointment: { primaryPhysician: string; }): Observable<string> {
        return this.http.post<string>(`${this.apiUrl}/appointment`, appointment);
    }

    deleteAppointmentById(appointmentId: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/appointment/${appointmentId}`);
    }

    getAppointmentById(appointmentId: string): Observable<Appointment> {
        return this.http.get<Appointment>(`${this.apiUrl}/appointment/${appointmentId}`);
    }

    updateAppointmentById(appointmentId: string, appointment: Appointment): Observable<Appointment> {
        return this.http.put<Appointment>(`${this.apiUrl}/appointment/${appointmentId}`, appointment);
    }
}
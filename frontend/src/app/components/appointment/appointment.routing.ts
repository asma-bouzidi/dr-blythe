import { Routes } from "@angular/router";
import { AppointmentComponent } from "./appointment.component";
import { AppointmentAddComponent } from "./appointment-add/appointment-add.component";
import { AppointmentDetailsComponent } from "./appointment-details/appointment-details.component";
import { AppointmentEditComponent } from "./appointment-edit/appointment-edit.component";


export const AppointmentRoutes: Routes = 
[
  {
    path: '',
    component: AppointmentComponent
  },
  {
    path: 'add',
    component: AppointmentAddComponent
  },
  {
    path: 'details/:appointmentId',
    component: AppointmentDetailsComponent
  },
    {
        path: 'edit/:appointmentId',
        component: AppointmentEditComponent
    }
];
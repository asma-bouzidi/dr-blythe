import {Routes} from '@angular/router';

import {DoctorComponent} from "./doctor.component";
import {DoctorAddComponent} from "./doctor-add/doctor-add.component";
import {DoctorDetailsComponent} from "../doctor/doctor-details/doctor-details.component";
import {DoctorEditComponent} from "../doctor/doctor-edit/doctor-edit.component";

export const DoctorRoutes: Routes =
  [
    {
      path: '',
      component: DoctorComponent
    },
    {
      path: 'add',
      component: DoctorAddComponent
    },
    {
      path: 'details/:doctorId',
      component: DoctorDetailsComponent
    },
    {
      path: 'edit/:doctorId',
      component: DoctorEditComponent
    }
  ];

import {Routes} from '@angular/router';

import {PatientComponent} from "./patient.component";
import {PatientAddComponent} from "./patient-add/patient-add.component";
import {PatientDetailsComponent} from "./patient-details/patient-details.component";
import {PatientEditComponent} from "./patient-edit/patient-edit.component";

export const PatientRoutes: Routes =
  [
    {
      path: '',
      component: PatientComponent
    },
    {
      path: 'add',
      component: PatientAddComponent
    },
    {
      path: 'details/:patientId',
      component: PatientDetailsComponent
    },
    {
      path: 'edit/:patientId',
      component: PatientEditComponent
    }
  ];


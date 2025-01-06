import {Routes} from '@angular/router';

import {PatientComponent} from "./patient.component";
import {PatientAddComponent} from "./patient-add/patient-add.component";

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
  ];


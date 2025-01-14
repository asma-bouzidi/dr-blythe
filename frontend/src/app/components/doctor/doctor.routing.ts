import {Routes} from '@angular/router';

import {DoctorComponent} from "./doctor.component";
import {DoctorAddComponent} from "./doctor-add/doctor-add.component";

export const DoctorRoutes: Routes =
  [
    {
      path: '',
      component: DoctorComponent
    },
    {
      path: 'add',
      component: DoctorAddComponent
    }
    ];

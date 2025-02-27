import {Routes} from '@angular/router';

import {FullComponent} from './components/layouts/full/full.component';

export const AppRoutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/patient',
        pathMatch: 'full'
      },
      /*{
        path: 'dashboard',
        loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule)
      },*/
      {
        path: 'patient',
        loadChildren: () => import('./components/patient/patient.module').then(m => m.PatientModule)
      },
      {
        path: 'doctor',
        loadChildren: () => import('./components/doctor/doctor.module').then(m => m.DoctorModule)
      },
      {
        path: 'appointment',
        loadChildren: () => import('./components/appointment/appointment.module').then(m => m.AppointmentModule)
      }

    ]
  }
];

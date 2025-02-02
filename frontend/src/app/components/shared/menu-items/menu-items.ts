import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [
  { state: 'patient', name: 'Patient', type: 'link', icon: '' },
  { state: 'doctor', name: 'Doctor', type: 'link', icon: '' },
  { state: 'appointment', name: 'Appointment', type: 'link', icon: '' },
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}

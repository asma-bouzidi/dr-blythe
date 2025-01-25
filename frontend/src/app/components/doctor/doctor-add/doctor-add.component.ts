import {Component} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {DoctorService} from '../../../services/doctor.service';
import {catchError, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {NgIf} from '@angular/common';
import {NgToastModule, NgToastService, ToasterPosition,} from 'ng-angular-popup';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {Doctor} from '../../../models/doctor.model';
import {Util} from '../../../utils/Util';
import {MatButton} from "@angular/material/button";
import {Router} from "@angular/router";
import {ScrollerComponent} from "../../scroller/scroller.component";
import {MatIcon} from "@angular/material/icon";
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from '../../dialog/dialog.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';

export interface DialogData {
  assignedPatients: number[]; // Array of patient IDs already assigned to the doctor
}


@Component({
  selector: 'app-doctor-add',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatIcon,
    MatInputModule,
    MatCardTitle,
    MatCardHeader,
    MatSelectModule,
    FormsModule,
    NgToastModule,
    MatCardContent,
    MatCard,
    MatButton,
    NgIf,
    ScrollerComponent,
    MatChipsModule,
    MatDialogModule,
  ],
  templateUrl: './doctor-add.component.html',
  styleUrl: './doctor-add.component.scss'
})
export class DoctorAddComponent {

  doctor: Doctor = Util.initializeDoctor();
  message = '';

  protected readonly ToasterPosition = ToasterPosition;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private doctorService: DoctorService,
    private toast: NgToastService,
  ) {
  }


  createDoctor() {
    console.log("hi");
    this.doctorService
    .createDoctor(this.doctor)
    .pipe(
      tap(() => {
        this.message = 'Doctor created successfully!';
        setTimeout(() => {
          this.toast.success(this.message, '', 3000);
        });
        this.resetForm();
        setTimeout(() => {
          this.router.navigate(['/doctor']);
        }, 3000);
      }),
      catchError((error) => {
        this.message = 'Error creating Doctor!';
        this.toast.danger(this.message, '', 3000);
        console.error(error);
        return of(error);
      }),
    )
    .subscribe();
  }

  /*openDialog() {
    this.dialog.open(DialogComponent, {
      data: {
        animal: 'panda',
      },
    });
  }*/

  openDialog() {
    const assignedPatients = [1, 2, 3]; // Example of already assigned patient IDs
  
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { assignedPatients } // Pass the assigned patients data
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed');
    });
  }

  private resetForm() {
    this.doctor = Util.initializeDoctor();
  }
}

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DemoMaterialModule } from "../../demo-material-module";
import { RouterModule } from "@angular/router";
import { AppointmentRoutes } from "./appointment.routing";
import { AppointmentComponent } from "./appointment.component";
import { AppointmentAddComponent } from "./appointment-add/appointment-add.component";
import { AppointmentDetailsComponent } from "./appointment-details/appointment-details.component";


@NgModule({
  imports: [
    CommonModule,
    DemoMaterialModule,
    AppointmentComponent,
    AppointmentAddComponent,
    AppointmentDetailsComponent,
    RouterModule.forChild(AppointmentRoutes)
  ]
})

export class AppointmentModule {
}
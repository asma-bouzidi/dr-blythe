import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {DemoMaterialModule} from "../../demo-material-module";
import {RouterModule} from "@angular/router";
import {DoctorRoutes} from "./doctor.routing";
import {DoctorComponent} from "./doctor.component";
import {DoctorAddComponent} from "./doctor-add/doctor-add.component";

@NgModule({
  imports: [
    CommonModule,
    DemoMaterialModule,
    DoctorComponent,
    DoctorAddComponent,
    RouterModule.forChild(DoctorRoutes)
  ]
})

export class DoctorModule {
}

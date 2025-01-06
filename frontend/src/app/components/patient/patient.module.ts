import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {DemoMaterialModule} from "../../demo-material-module";
import {RouterModule} from "@angular/router";
import {PatientRoutes} from "./patient.routing";
import {PatientComponent} from "./patient.component";
import {PatientAddComponent} from "./patient-add/patient-add.component";

@NgModule({
  imports: [
    CommonModule,
    DemoMaterialModule,
    PatientComponent,
    PatientAddComponent,
    RouterModule.forChild(PatientRoutes),
  ]
})
export class PatientModule {
}

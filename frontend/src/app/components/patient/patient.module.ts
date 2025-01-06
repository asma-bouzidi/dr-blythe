import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {DemoMaterialModule} from "../../demo-material-module";
import {RouterModule} from "@angular/router";
import {PatientRoutes} from "./patient.routing";
import {PatientComponent} from "./patient.component";

@NgModule({
  imports: [
    CommonModule,
    DemoMaterialModule,
    RouterModule.forChild(PatientRoutes),
    PatientComponent,
  ],
})
export class PatientModule {
}

import {Component} from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { DrBlytheModule } from 'src/app/dr-blythe-module';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports:[DrBlytheModule, MatTabsModule],
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent {

}

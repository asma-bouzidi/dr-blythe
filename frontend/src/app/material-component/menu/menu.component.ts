import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { DrBlytheModule } from 'src/app/dr-blythe-module';
@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [DrBlytheModule, MatMenuModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent { }

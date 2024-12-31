import { Component, OnInit } from '@angular/core';
import { DrBlytheModule } from 'src/app/dr-blythe-module';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [DrBlytheModule],
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

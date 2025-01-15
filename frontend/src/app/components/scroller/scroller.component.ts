import {Component, Input} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";

@Component({
  selector: 'app-scroller',
  standalone: true,
  imports: [
    MatIcon,
    MatIconButton
  ],
  templateUrl: './scroller.component.html',
  styleUrl: './scroller.component.scss'
})
export class ScrollerComponent {
  @Input() currentComponentSelector: string = '';

  scrollToTop() {
    const container = document.querySelector('.container') as HTMLElement;

    container?.scrollTo({top: 0, behavior: 'smooth'});
  }

  scrollToBottom() {
    const container = document.querySelector('.container') as HTMLElement;
    container?.scrollTo({top: container.scrollHeight, behavior: 'smooth'});
  }

}

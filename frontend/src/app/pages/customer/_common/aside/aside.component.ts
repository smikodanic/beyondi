import { Component } from '@angular/core';

@Component({
  selector: 'app-customer-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class CustomerAsideComponent {
  label: string;

  toggleSubMenu(label: string) {
    this.label = (this.label === label) ? '' : label;
  }

}

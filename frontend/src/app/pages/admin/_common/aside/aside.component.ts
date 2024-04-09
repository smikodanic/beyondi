import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-admin-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AdminAsideComponent {

  @Input() curSite: any; // current site
  label: string;

  constructor() { }


  toggleSubMenu(label: string) {
    this.label = (this.label === label) ? '' : label;
  }


}

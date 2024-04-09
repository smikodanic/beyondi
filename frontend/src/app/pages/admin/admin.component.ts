import { Component } from '@angular/core';
import { GlobalsService } from '../../ng/services/globals.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  loggedUser: any;
  apiResponse: any;
  curSite: any;
  sites: any;


  constructor(
    private globalsService: GlobalsService,
  ) { }


}

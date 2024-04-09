import { Component, Input } from '@angular/core';
import { AuthService } from 'ngboost-auth';



@Component({
  selector: 'app-admin-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class AdminHeaderComponent {

  loggedUser: any;
  @Input() curSite: any; // current site
  errMsg: string | boolean;


  constructor(
    private authService: AuthService
  ) {
    this.loggedUser = authService.getLoggedUserInfo();
  }


  logout(evt: any) {
    // console.log('LOGOUT:: evt', evt);
    this.authService.logout();

    //prevent open page by link
    evt.stopPropagation();
    return false;
  }




}

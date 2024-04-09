import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'ngboost-auth';

@Component({
  selector: 'app-customer-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class CustomerHeaderComponent {

  loggedUser: any;

  constructor(private authService: AuthService, private httpClient: HttpClient) {
    this.loggedUser = authService.getLoggedUserInfo();
  }

  logout() {
    // console.log('LOGOUT:: ');
    this.authService.logout();
  }

}

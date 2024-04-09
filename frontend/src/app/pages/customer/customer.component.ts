import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'ngboost-auth';



@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  loggedUser: any;
  apiResponse: any;

  constructor(private authService: AuthService, private httpClient: HttpClient) {
    this.loggedUser = authService.getLoggedUserInfo();
  }

  ngOnInit() {
  }

}

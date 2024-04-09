import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpReq } from '../../ng/services/httpReq.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerFG: FormGroup;
  successMsg: string;
  errMsg: string;

  constructor(
    private fb: FormBuilder,
    @Inject('API') private API: any,
    @Inject(HttpReq) private httpReq: any
  ) { }

  ngOnInit() {
    this.registerFG = this.fb.group({
      name: '',
      email: '',
      password: ''
    });
  }


  async signUp() {
    const body = this.registerFG.value; // {name, email, password}
    this.successMsg = '';
    this.errMsg = '';
    try {
      const apiResp = await this.httpReq.ask(this.API.USERS.register, 'POST', body);
      if (!apiResp) { throw new Error('No API response'); }
      console.log(apiResp);
      this.successMsg = apiResp.message;
      this.errMsg = apiResp.error;
    } catch (err: any) {
      console.error(err);
      this.errMsg = err.error.message || err.message;
    }
  }

}

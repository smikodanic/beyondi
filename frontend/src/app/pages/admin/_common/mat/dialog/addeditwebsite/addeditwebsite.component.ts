import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpReq } from '../../../../../../ng/services/httpReq.service';
import { IUser, IWebsite } from '../../../../../../ng/interfaces'



@Component({
  selector: 'app-admin-mat-dialog-addeditwebsite',
  templateUrl: './addeditwebsite.component.html',
  styleUrls: ['./addeditwebsite.component.css']
})
export class AdminMatDialogAddeditwebsiteComponent implements OnInit {
  errMsg: string;
  successMsg: string;
  site: IWebsite;
  users: IUser[];

  constructor(
    public dialogRef: MatDialogRef<AdminMatDialogAddeditwebsiteComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogInput: any,
    @Inject('API') private API: any,
    @Inject(HttpReq) private httpReq: any
  ) {
    this.errMsg = '';
    this.successMsg = '';
    this.site = {
      user_id: '',
      title: '',
      description: '',
      protocol: 'https:',
      host: '',
      origprotocol: 'http:',
      orighost: '',
      sitemap_url: '',
      fastly_service_id: '',
      is_active: true
    };
  }


  async ngOnInit() {
    await this.getUsers();
    if (this.dialogInput.dialogType === 'Edit') { this.site = this.dialogInput.site; }
  }


  // list users with role customer
  async getUsers(): Promise<void> {
    const apiResp = await this.httpReq.ask(this.API.ADMIN.users + `/list?role=customer&limit=0&sort=last_name`);
    this.users = apiResp.data;
  }


  async add() {
    this.errMsg = '';
    try {
      this.checkHost(this.site.host);
      if (this.site.host === this.site.orighost) { throw new Error('The host and orighost can\'t have same value'); }
      const apiResp = await this.httpReq.ask(`${this.API.ADMIN.websites}/addnew`, 'POST', this.site);
      if (!apiResp) { throw new Error('No API response'); }
      this.successMsg = apiResp.msg;
      await this.dialogClose(2100);
    } catch (err) {
      console.error(err);
      this.errMsg = err.error ? err.error.message : err.message;
    }
  }


  async update() {
    this.errMsg = '';
    try {
      this.checkHost(this.site.host);
      if (this.site.host === this.site.orighost) { throw new Error('The host and orighost can\'t have same value'); }
      const apiResp = await this.httpReq.ask(`${this.API.ADMIN.websites}/${this.site._id}`, 'PUT', this.site);
      if (!apiResp) { throw new Error('No API response'); }
      this.successMsg = apiResp.msg;
      await this.dialogClose(2100);
    } catch (err) {
      console.error(err);
      this.errMsg = err.error ? err.error.message : err.message;
    }
  }


  checkHost(host = '') {
    host = host.trim();
    const err = new Error();
    if (/^http/.test(host)) { err.message = 'Don\'t use http(s) in the host name'; throw err; }
    if (/\//.test(host)) { err.message = `The host name shouldn't contain /`; throw err; }
    // if (!/^[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,6}$/.test(host)) { err.message = `The host name "${host}" is not valid`; throw err; }
  }


  async dialogClose(ms) {
    await new Promise(r => setTimeout(r, ms));
    this.dialogRef.close();
  }

}

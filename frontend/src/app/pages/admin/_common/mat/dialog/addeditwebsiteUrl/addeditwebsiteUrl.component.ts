import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpReq } from '../../../../../../ng/services/httpReq.service';
import { IWebsite, IWebsiteurl } from '../../../../../../ng/interfaces'



@Component({
  selector: 'app-admin-mat-dialog-addeditwebsiteurl',
  templateUrl: './addeditwebsiteUrl.component.html',
  styleUrls: ['./addeditwebsiteUrl.component.css']
})
export class AdminMatDialogAddeditwebsiteurlComponent implements OnInit {
  errMsg: string;
  successMsg: string;
  websiteUrl: IWebsiteurl;
  websites: IWebsite[];
  website_id: string;

  constructor(
    public dialogRef: MatDialogRef<AdminMatDialogAddeditwebsiteurlComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogInput: any,
    @Inject('API') private API: any,
    @Inject(HttpReq) private httpReq: any
  ) {
    this.errMsg = '';
    this.successMsg = '';
    this.websiteUrl = {
      website_id: '',
      url: 'https://'
    };
  }


  async ngOnInit() {
    await this.getWebsites();
    if (this.dialogInput.dialogType === 'Edit') {
      this.websiteUrl = this.dialogInput.websiteUrl;
      this.website_id = this.websiteUrl.website_id._id;
    }
  }


  async getWebsites(): Promise<void> {
    const apiResp = await this.httpReq.ask(this.API.ADMIN.websites + `/list?limit=0&sort=host`);
    this.websites = apiResp.data;
  }


  async add() {
    try {
      const bdy = [this.websiteUrl.url];
      const apiResp = await this.httpReq.ask(`${this.API.ADMIN.websiteUrls}/addmanual/${this.website_id}`, 'POST', bdy);
      if (!apiResp) { throw new Error('No API response'); }
      this.successMsg = apiResp.msg;
      await this.dialogClose(2100);
    } catch (err) {
      console.error(err);
      this.errMsg = err.error.message || err.message;
    }
  }


  async update() {
    try {
      const apiResp = await this.httpReq.ask(`${this.API.ADMIN.websiteUrls}/${this.websiteUrl._id}`, 'PUT', this.websiteUrl);
      if (!apiResp) { throw new Error('No API response'); }
      this.successMsg = apiResp.msg;
      await this.dialogClose(2100);
    } catch (err) {
      console.error(err);
      this.errMsg = err.error.message || err.message;
    }
  }


  async dialogClose(ms) {
    await new Promise(r => setTimeout(r, ms));
    this.dialogRef.close();
  }

}

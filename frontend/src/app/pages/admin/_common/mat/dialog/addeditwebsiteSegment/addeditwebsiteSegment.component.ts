import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpReq } from '../../../../../../ng/services/httpReq.service';
import { IWebsite, IWebsiteSegment } from '../../../../../../ng/interfaces'



@Component({
  selector: 'app-admin-mat-dialog-addeditwebsiteSegment',
  templateUrl: './addeditwebsiteSegment.component.html',
  styleUrls: ['./addeditwebsiteSegment.component.css']
})
export class AdminMatDialogAddeditwebsiteSegmentComponent implements OnInit {
  errMsg: string;
  successMsg: string;
  websiteSegment: IWebsiteSegment;
  websites: IWebsite[];

  constructor(
    public dialogRef: MatDialogRef<AdminMatDialogAddeditwebsiteSegmentComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogInput: any,
    @Inject('API') private API: any,
    @Inject(HttpReq) private httpReq: any
  ) {
    this.errMsg = '';
    this.successMsg = '';
    this.websiteSegment = {
      website_id: '',
      segment_name: '',
      path_regex: ''
    };
  }


  async ngOnInit() {
    await this.getWebsites();
    if (this.dialogInput.dialogType === 'Edit') { this.websiteSegment = this.dialogInput.websiteSegment; }
  }


  async getWebsites(): Promise<void> {
    const apiResp = await this.httpReq.ask(this.API.ADMIN.websites + `/list?limit=0&sort=host`);
    this.websites = apiResp.data;
  }


  async add() {
    try {
      const apiResp = await this.httpReq.ask(`${this.API.ADMIN.websiteSegments}/addnew`, 'POST', this.websiteSegment);
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
      const apiResp = await this.httpReq.ask(`${this.API.ADMIN.websiteSegments}/${this.websiteSegment._id}`, 'PUT', this.websiteSegment);
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

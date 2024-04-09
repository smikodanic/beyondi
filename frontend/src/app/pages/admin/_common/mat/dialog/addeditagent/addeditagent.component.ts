import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpReq } from '../../../../../../ng/services/httpReq.service';
import { IWebsite, IAgent } from '../../../../../../ng/interfaces'



@Component({
  selector: 'app-admin-mat-dialog-addeditagent',
  templateUrl: './addeditagent.component.html',
  styleUrls: ['./addeditagent.component.css']
})
export class AdminMatDialogAddeditagentComponent implements OnInit {
  errMsg: string;
  successMsg: string;
  agent: IAgent;
  websites: IWebsite[];

  constructor(
    public dialogRef: MatDialogRef<AdminMatDialogAddeditagentComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogInput: any,
    @Inject('API') private API: any,
    @Inject(HttpReq) private httpReq: any
  ) {
    this.errMsg = '';
    this.successMsg = '';
    this.agent = {
      website_id: '',
      ip: '',
      port: 9021,
      authtoken: ''
    };
  }


  async ngOnInit() {
    await this.getWebsites();
    if (this.dialogInput.dialogType === 'Edit') { this.agent = this.dialogInput.agent; }
  }


  async getWebsites(): Promise<void> {
    const apiResp = await this.httpReq.ask(this.API.ADMIN.websites + `/list?limit=0&sort=host`);
    this.websites = apiResp.data;
  }


  async add() {
    this.successMsg = '';
    this.errMsg = '';
    try {
      const apiResp = await this.httpReq.ask(`${this.API.ADMIN.agents}/addnew`, 'POST', this.agent);
      if (!apiResp) { throw new Error('No API response'); }
      this.successMsg = apiResp.msg;
      await this.dialogClose(2100);
    } catch (err) {
      console.error(err);
      this.errMsg = err.error.message || err.message;
    }
  }


  async update() {
    this.successMsg = '';
    this.errMsg = '';
    try {
      const apiResp = await this.httpReq.ask(`${this.API.ADMIN.agents}/${this.agent._id}`, 'PUT', this.agent);
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

import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpReq } from '../../../../../../ng/services/httpReq.service';
import { IWebsite, IMediator } from '../../../../../../ng/interfaces'



@Component({
  selector: 'app-admin-mat-dialog-addeditmediator',
  templateUrl: './addeditmediator.component.html',
  styleUrls: ['./addeditmediator.component.css']
})
export class AdminMatDialogAddeditmediatorComponent implements OnInit {
  errMsg: string;
  successMsg: string;
  mediator: IMediator;
  websites: IWebsite[];

  constructor(
    public dialogRef: MatDialogRef<AdminMatDialogAddeditmediatorComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogInput: any,
    @Inject('API') private API: any,
    @Inject(HttpReq) private httpReq: any
  ) {
    this.errMsg = '';
    this.successMsg = '';
    this.mediator = {
      website_id: '',
      ip: '',
      port: 9011,
      authtoken: '',
      proxy_port: 9111,
      proxy_type: 'dynamic'
    };
  }


  async ngOnInit() {
    await this.getWebsites();
    if (this.dialogInput.dialogType === 'Edit') { this.mediator = this.dialogInput.mediator; }
  }


  async getWebsites(): Promise<void> {
    const apiResp = await this.httpReq.ask(this.API.ADMIN.websites + `/list?limit=0&sort=host`);
    this.websites = apiResp.data;
  }


  async add() {
    this.successMsg = '';
    this.errMsg = '';
    try {
      const apiResp = await this.httpReq.ask(`${this.API.ADMIN.mediators}/addnew`, 'POST', this.mediator);
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
      console.log(this.mediator);
      const apiResp = await this.httpReq.ask(`${this.API.ADMIN.mediators}/${this.mediator._id}`, 'PUT', this.mediator);
      if (!apiResp) { throw new Error('No API response'); }
      console.log(apiResp);
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

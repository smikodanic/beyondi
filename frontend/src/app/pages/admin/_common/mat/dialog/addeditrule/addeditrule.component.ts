import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpReq } from '../../../../../../ng/services/httpReq.service';
import { IWebsite, IRule } from '../../../../../../ng/interfaces'



@Component({
  selector: 'app-admin-mat-dialog-addeditrule',
  templateUrl: './addeditrule.component.html',
  styleUrls: ['./addeditrule.component.css']
})
export class AdminMatDialogAddeditruleComponent implements OnInit {
  errMsg: string;
  successMsg: string;
  rule: IRule;
  websites: IWebsite[];

  constructor(
    public dialogRef: MatDialogRef<AdminMatDialogAddeditruleComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogInput: any,
    @Inject('API') private API: any,
    @Inject(HttpReq) private httpReq: any
  ) {
    this.errMsg = '';
    this.successMsg = '';
    this.rule = {
      website_id: '',
      css_selector: '',
      tip: '',
      exists: true,
      attribute: '',
      contains: '',
      notcontains: '',
    };
  }


  async ngOnInit() {
    await this.getWebsites();
    if (this.dialogInput.dialogType === 'Edit') { this.rule = this.dialogInput.rule; }
  }


  async getWebsites(): Promise<void> {
    const apiResp = await this.httpReq.ask(this.API.ADMIN.websites + `/list?limit=0&sort=host`);
    this.websites = apiResp.data;
  }


  formatRuleObj() {
    delete this.rule.__v;
    if (this.rule.tip === 'exists') {
      this.rule.contains = '';
      this.rule.attribute = '';
      this.rule.notcontains = '';
    } else if (this.rule.tip === 'text') {
      this.rule.exists = null;
      this.rule.attribute = '';
    } else if (this.rule.tip === 'attribute') {
      this.rule.exists = null;
    }
  }


  async add() {
    try {
      const apiResp = await this.httpReq.ask(`${this.API.ADMIN.rules}/addnew`, 'POST', this.rule);
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
      const apiResp = await this.httpReq.ask(`${this.API.ADMIN.rules}/${this.rule._id}`, 'PUT', this.rule);
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

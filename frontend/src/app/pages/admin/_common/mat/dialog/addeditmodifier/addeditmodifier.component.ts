import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpReq } from '../../../../../../ng/services/httpReq.service';
import { IWebsite, IWebsiteSegment, IModifier, IModifierElement } from '../../../../../../ng/interfaces'



@Component({
  selector: 'app-admin-mat-dialog-addeditmodifier',
  templateUrl: './addeditmodifier.component.html',
  styleUrls: ['./addeditmodifier.component.css']
})
export class AdminMatDialogAddeditmodifierComponent implements OnInit {
  errMsg: string;
  successMsg: string;
  websites: IWebsite[];
  websiteSegments: IWebsiteSegment[];


  modifier: IModifier;

  constructor(
    public dialogRef: MatDialogRef<AdminMatDialogAddeditmodifierComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogInput: any,
    @Inject('API') private API: any,
    @Inject(HttpReq) private httpReq: any
  ) {
    this.errMsg = '';
    this.successMsg = '';
    this.modifier = {
      website_id: '',
      websiteSegment_id: '',
      css_selector: '',
      action: 'remove',
      content: ''
    };
  }


  async ngOnInit() {
    await this.getWebsites();
    await new Promise(r => setTimeout(r, 100));
    if (this.dialogInput.dialogType === 'Edit') {
      this.modifier = this.dialogInput.modifier;
      if (!this.modifier.websiteSegment_id) { this.modifier.websiteSegment_id = {}; }
      await this.getWebsiteSegments();
    }
  }


  async getWebsites(): Promise<void> {
    const apiResp = await this.httpReq.ask(this.API.ADMIN.websites + `/list?limit=0&sort=host`);
    this.websites = apiResp.data;
  }


  async getWebsiteSegments(): Promise<void> {
    const url = this.dialogInput.dialogType === 'Add' ?
      this.API.ADMIN.websiteSegments + `/list?website_id=${this.modifier.website_id}&limit=0&sort=host` :
      this.API.ADMIN.websiteSegments + `/list?website_id=${this.modifier.website_id._id}&limit=0&sort=host`;
    const apiResp = await this.httpReq.ask(url);
    this.websiteSegments = apiResp.data;
  }


  formatModifierObj() {
    delete this.modifier.__v;
    if (this.modifier.action === 'remove') {
      this.modifier.content = '';
    } else if (this.modifier.action.includes('insert')) {
      this.modifier.content = '';
    } else if (this.modifier.action === 'replace') {
      this.modifier.content = '';
    } else if (this.modifier.action === '404-recognizer-corrector') {
      this.modifier.content = '';
    } else if (this.modifier.action === 'custom') {
      this.modifier.css_selector = '';
      this.modifier.content = '';
    }
  }


  async add() {
    try {
      // console.log(this.modifier);
      const apiResp = await this.httpReq.ask(`${this.API.ADMIN.modifiers}/addnew`, 'POST', this.modifier);
      if (!apiResp) { throw new Error('No API response'); }
      this.successMsg = apiResp.msg;
      await this.dialogClose(2100);
    } catch (err) {
      console.error(err);
      this.errMsg = err.error ? err.error.message : err.message;
    }
  }


  async update() {
    try {
      const modifier = { ...this.modifier };
      modifier.website_id = modifier.website_id._id;
      modifier.websiteSegment_id = modifier.websiteSegment_id ? modifier.websiteSegment_id._id : '';
      // console.log(this.modifier);
      const apiResp = await this.httpReq.ask(`${this.API.ADMIN.modifiers}/${this.modifier._id}`, 'PUT', this.modifier);
      if (!apiResp) { throw new Error('No API response'); }
      this.successMsg = apiResp.msg;
      await this.dialogClose(2100);
    } catch (err) {
      console.error(err);
      this.errMsg = err.error ? err.error.message : err.message;
    }
  }


  async dialogClose(ms) {
    await new Promise(r => setTimeout(r, ms));
    this.dialogRef.close();
  }


  closeMessages() {
    this.successMsg = '';
    this.errMsg = '';
  }


}

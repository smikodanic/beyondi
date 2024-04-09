import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpReq } from '../../../../../../ng/services/httpReq.service';
import { IUser, ISchedule } from '../../../../../../ng/interfaces'



@Component({
  selector: 'app-admin-mat-dialog-addeditschedule',
  templateUrl: './addeditschedule.component.html',
  styleUrls: ['./addeditschedule.component.css']
})
export class AdminMatDialogAddeditscheduleComponent implements OnInit {
  errMsg: string;
  successMsg: string;
  schedule: ISchedule;
  users: IUser[];

  constructor(
    public dialogRef: MatDialogRef<AdminMatDialogAddeditscheduleComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogInput: any,
    @Inject('API') private API: any,
    @Inject(HttpReq) private httpReq: any
  ) {
    this.errMsg = '';
    this.successMsg = '';
    this.schedule = {
      user_id: '',
      title: '',
      cron: {
        span: 'every week',
        at_minute: 0,
        at_hour: 9
      },
      job: '',
      job_params: '{ }'
    };
  }


  async ngOnInit() {
    await this.getUsers();
    if (this.dialogInput.dialogType === 'Edit') {
      this.dialogInput.schedule.job_params = !!this.dialogInput.schedule.job_params ? this.dialogInput.schedule.job_params = JSON.stringify(this.dialogInput.schedule.job_params, null, 2) : '{}'
      this.schedule = this.dialogInput.schedule;
    }
  }


  // list users with role customer
  async getUsers(): Promise<void> {
    const apiResp = await this.httpReq.ask(this.API.ADMIN.users + `/list?role=customer&limit=0&sort=last_name`);
    this.users = apiResp.data;
  }


  async add() {
    try {
      const apiResp = await this.httpReq.ask(`${this.API.ADMIN.schedules}/addnew`, 'POST', this.schedule);
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
      const schedule = { ...this.schedule }; // deattach from model
      try { schedule.job_params = JSON.parse(schedule.job_params); }
      catch (err) { throw new Error('The "Job Params" doesn\'t have valid JSON'); }

      const apiResp = await this.httpReq.ask(`${this.API.ADMIN.schedules}/${schedule._id}`, 'PUT', schedule);
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

}

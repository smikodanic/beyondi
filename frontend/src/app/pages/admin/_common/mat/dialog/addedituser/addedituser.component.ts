import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IUser } from '../../../../../../ng/interfaces'



@Component({
  selector: 'app-admin-mat-dialog-addedituser',
  templateUrl: './addedituser.component.html',
  styleUrls: ['./addedituser.component.css']
})
export class AdminMatDialogAddedituserComponent implements OnInit {

  errMsg: string | boolean;
  successMsg: string | boolean;
  user: IUser;

  constructor(
    private dialogRef: MatDialogRef<AdminMatDialogAddedituserComponent>,
    private httpClient: HttpClient,
    @Inject(MAT_DIALOG_DATA) public dialogInput: any,
    @Inject('API') private API: any,
  ) {
    this.errMsg = false;
    this.successMsg = false;

    this.user = {
      first_name: '',
      last_name: '',
      email: '',
      username: '',
      password: '',
      role: 'customer',
      is_active: true
    };
  }


  ngOnInit() {
    if (this.dialogInput.dialogType === 'Edit') {
      this.httpClient.get(this.API.ADMIN.users + '/' + this.dialogInput.user_id)
        .subscribe({
          next: (apiResp: any) => {
            this.user = apiResp.data;
          },
          error: (e: HttpErrorResponse) => {
            console.error(e);
            this.errMsg = e.error.message;
          }
        });
    }
  }


  add() {
    this.closeMessages();
    this.httpClient.post(this.API.ADMIN.users + '/addnew', this.user)
      .subscribe({
        next: (apiResp: any) => {
          this.successMsg = apiResp.message;
          const dialogOut = apiResp;
          setTimeout(() => {
            this.dialogRef.close(dialogOut);
          }, 2100);
        },
        error: (e: HttpErrorResponse) => {
          console.error(e);
          this.errMsg = e.error.message;
        }
      });
  }


  update() {
    this.closeMessages();
    if (this.user.password) { throw new Error('password not allowed'); }
    this.httpClient.put(`${this.API.ADMIN.users}/${this.user._id}`, this.user)
      .subscribe({
        next: (apiResp: any) => {
          this.successMsg = apiResp.message;
          const dialogOut = apiResp;
          setTimeout(() => {
            this.dialogRef.close(dialogOut);
          }, 2100);
        },
        error: (e: HttpErrorResponse) => {
          console.error(e);
          this.errMsg = e.error.message;
        }
      });
  }


  dialogClose() {
    this.dialogRef.close();
  }


  closeMessages() {
    this.errMsg = false;
    this.successMsg = false;
  }


}

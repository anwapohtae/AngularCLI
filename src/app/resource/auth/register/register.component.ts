import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { User } from './../../../services/modules/user';
import { Component, OnInit } from '@angular/core';
import { NgZone } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private _authService: AuthService,
    private _ngZone: NgZone,
    private _router: Router,
    private messageService: MessageService
  ) {}

  user: User = {
    firstname: '',
    lastname: '',
    googlefirstname: '',
    googlelastname: '',
    age: '',
    numberphone: '',
    gid: '',
    email: '',
    profile: '',
  };

  ngOnInit() {}

  register() {
    this._authService.registerUser(this.user).subscribe(
      (res) => {
        console.log(res);

        this._ngZone.run(() => this._router.navigateByUrl('/login?registered=success')); //เมื่อ navigate ไปที่ "" ให้แสเงข้อความนี้หน้า this.messageService.add({severity: 'success', summary: 'Success', detail: 'ลงทะเบียนสำเร็จ',});
      },
      (err) => {
        console.log(err);
      }
    );
  }

  message() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'ลงทะเบียนสำเร็จ',
    });
  }
}

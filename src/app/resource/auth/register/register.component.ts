import { User } from './../../../modules/user';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgZone } from '@angular/core';
import { MessageService } from 'primeng/api';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { response } from 'express';

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

  formRegister!: FormGroup;

  user: any = {};

  submitted: boolean = false;

  ngOnInit() {
    this.formRegister = new FormGroup({
      firstname: new FormControl<string | null>(null, Validators.required),
      lastname: new FormControl<string | null>(null, Validators.required),
      age: new FormControl<string | null>(null, [
        Validators.required,
        Validators.min(18),
      ]),
      numberphone: new FormControl<string | null>(null, [
        Validators.required,
        Validators.pattern(/^\d{10}$/),
      ]),
      email: new FormControl<string | null>(null, [
        Validators.required,
        Validators.email,
      ]),
    });
  }

  onRegister() {
    this.submitted = true;

    if (this.formRegister.valid) {
      this._authService.registerUser(this.formRegister.value).subscribe({
        next: () => {
          this._ngZone.run(() => this._router.navigateByUrl('/login?registered=success')); //เมื่อ navigate ไปที่ "" ให้แสเงข้อความนี้หน้า this.messageService.add({severity: 'success', summary: 'Success', detail: 'ลงทะเบียนสำเร็จ',});
        },
        error: (error) => {},
      });
      // console.log(this.formRegister);
    } else {
      console.error('Register Not found');
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'ลงทะเบียนสำเร็จ, กรุณากรอกข้อมูลในช่องว่างให้สมบูรณ์',
      });
      this.formRegister.markAllAsTouched();
    }

    // this._authService.registerUser(this.user).subscribe(
    //   (res) => {
    //     console.log(res);

    //     this._ngZone.run(() => this._router.navigateByUrl('/login?registered=success')); //เมื่อ navigate ไปที่ "" ให้แสเงข้อความนี้หน้า this.messageService.add({severity: 'success', summary: 'Success', detail: 'ลงทะเบียนสำเร็จ',});
    //   },
    //   (err) => {
    //     console.log(err);
    //   }
    // );
  }

  message() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'ลงทะเบียนสำเร็จ',
    });
  }
}

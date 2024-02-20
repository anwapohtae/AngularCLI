declare const google: any;
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../../../services/auth/auth.service';
import { User } from '../../../services/modules/user';
import { NgZone } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  title = 'Angular';

  constructor(
    private router: Router,
    private _activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private _authService: AuthService,
    private _ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this._activatedRoute.queryParams.subscribe((params) => {
      if (params['registered'] === 'success') {
        setTimeout(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Message Content',
          });
          this.router.navigate(['']);
        }, 100); // 5000 milliseconds = 5 seconds
      }
      if (params['logoutedUser'] === 'success') {
        setTimeout(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'ออกจากระบบสำเร็จ',
          });
          this.router.navigate(['']);
        }, 100); // 5000 milliseconds = 5 seconds
      }
    });

    // Check if google is defined before using it
    if (typeof google !== 'undefined' && google.accounts) {
      // Initialize Google Identity Services API
      google.accounts.id.initialize({
        client_id:
          '536151736909-7mm0j9iv39g6ig7pmvl8hi88sad0g2u5.apps.googleusercontent.com',
        callback: (rest: any) => this.loginUser(rest),
      });

      // Render Google Sign-In button
      google.accounts.id.renderButton(document.getElementById('google-btn'), {
        theme: 'filled_blue',
        size: 'large',
        shape: 'rectangle',
        width: 300,
        border: '100px',
      });
    }
  }

  loginUser(response: any) {
    if (response) {
      // Decode the token
      const decodeToken = jwtDecode(response.credential);

      // Store in session
      localStorage.setItem('tokenuser', JSON.stringify(decodeToken));

      const getData = localStorage.getItem('tokenuser');

      if (getData !== null) {
        const tokenData = JSON.parse(getData);
        const data = {
          email: tokenData.email,
          googlefirstsname: tokenData.given_name,
          googlelastname: tokenData.family_name,
          googleid: tokenData.sub,
          profile: tokenData.picture,
        };

        this._authService.loginUser(data as User).subscribe(
          (res: any) => {
            localStorage.removeItem('tokenuser');
            // console.log(res.token);
            // localStorage.setItem('token', JSON.stringify(res.token));

            this._ngZone.run(() =>
            this.router.navigateByUrl('/home?loggedIn=success')
            ); //เมื่อ navigate ไปที่ "" ให้แสเงข้อความนี้หน้า this.messageService.add({severity: 'success', summary: 'Success', detail: 'ลงทะเบียนสำเร็จ',});
            localStorage.setItem('token', res.token);
          },
          (err) => {
            this.router.navigate(['']);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: err.error.error,
            });
          }
        );
      }
    }
  }
}

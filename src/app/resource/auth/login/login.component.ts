declare const google: any;
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService],
})
export class LoginComponent implements OnInit {
  title = 'Angular';

  constructor(
    private router: Router,
    private _activatedRoute: ActivatedRoute,
    public messageService: MessageService
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
    });

    // Check if google is defined before using it
    if (typeof google !== 'undefined' && google.accounts) {
      // Initialize Google Identity Services API
      google.accounts.id.initialize({
        client_id:
          '536151736909-7mm0j9iv39g6ig7pmvl8hi88sad0g2u5.apps.googleusercontent.com',
        callback: (rest: any) => this.handleLogin(rest),
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
  handleLogin(response: any) {
    if (response) {
      // Decode the token
      const decodeToken = jwtDecode(response.credential);

      // Store in session
      sessionStorage.setItem('token', JSON.stringify(decodeToken));

      // Navigate to the home page
      // this.router.navigate(['/dashboard']);
    }
  }
}

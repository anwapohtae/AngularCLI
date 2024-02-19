import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { jwtDecode } from 'jwt-decode';
import { UserService } from '../../../services/user/user.service';
import { Token } from '@angular/compiler';
import { decode } from 'punycode';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: any = {
    id: null,
    email: null,
    firstname: null,
    lastname: null,
    profile: null
  }


  constructor(
    private _authService: AuthService,
    private userService: UserService
    ) { }

    ngOnInit(): void {
      const getToken = localStorage.getItem('token');

      if (getToken !== null) {
        const decodeToken: any = jwtDecode(getToken);
        this.user = {
          id: decodeToken.userId,
          email: decodeToken.email,
          firstname: decodeToken.firstname,
          lastname: decodeToken.lastname,
          profile: decodeToken.picture,
        };
        console.log('User data:', this.user.id); // แสดงข้อมูลผู้ใช้ที่ถูกดึงมาจาก token ในคอนโซล

        this.userService.getUserById(this.user.id).subscribe(
          (res) => {
            console.log('User data:', res);
            this.user = res;
          }
        )
      } else {
        // กรณีที่ไม่พบ token ใน localStorage
        console.error('Token not found in localStorage');
      }
    }

  Logout() {
    this._authService.logoutedUser()
  }
}

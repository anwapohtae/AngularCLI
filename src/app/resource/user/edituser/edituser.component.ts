import { User } from './../../../services/modules/user';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { UserService } from '../../../services/user/user.service';
import { jwtDecode } from 'jwt-decode';
import { get } from 'http';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css'],
})
export class EdituserComponent implements OnInit {
  getId: any = null;

  dataUser!: User;
  
  constructor(
    private _userService: UserService
  ) {}

  ngOnInit() {
    const getToken: any = localStorage.getItem('token');

    const decodeToken: any = jwtDecode(getToken);
    this.getId = decodeToken.userId
    console.log(this.getId);

    this._userService.getUserById(this.getId).subscribe(
      (res) => {
        console.log("dataUser", res);
        this.dataUser = res as User;
      }
    )

  }
}

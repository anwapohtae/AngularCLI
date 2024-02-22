import { User } from './../../../modules/user';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { jwtDecode } from 'jwt-decode';

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

    this._userService.getUserById(this.getId).subscribe(
      (res) => {
        this.dataUser = res as User;
      }
    )

  }
}

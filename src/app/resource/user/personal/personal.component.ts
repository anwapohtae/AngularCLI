import { User } from './../../../modules/user';
import { Component, NgZone, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { jwtDecode } from 'jwt-decode';
import { ThaidataService } from '../../../services/thia-data/thaidata.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Thaidata } from '../../../modules/thai-data';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

interface Province {
  province_nameth: string;
  province_id: number;
}

interface UserData {
  province: any;
  amphure: any;
  tambon: any;
  zipcode: any;
  [key: string]: any; // ลายเซ็นต์ดัชนี
}
@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css'],
})
export class PersonalComponent implements OnInit {
  getId: any = null;

  user!: User[];
  submitted: boolean = false;

  getUser: User | undefined;

  dataProvinces!: any;
  dataAmphure!: any[];
  dataTambon!: any;
  dataZipcode!: any;

  autoZipcode = '';

  // disabled
  visible = false;
  inputAmphureDropdown = true;
  inputTambonDropdown = true;

  formGroup!: FormGroup;

  filteredProvince: any = [];

  selectedProvince!: any;
  selectedAmphure!: any;
  selectedTambon!: any;
  selectedZipcode!: any;

  constructor(
    private _userService: UserService,
    private _thaidataService: ThaidataService,
    private messageService: MessageService,
    private router: Router,
    private _ngZone: NgZone
  ) {}

  ngOnInit() {
    const getToken: any = localStorage.getItem('token');

    const decodeToken: any = jwtDecode(getToken);
    this.getId = decodeToken.userId;

    this.getUsers();
    // GetProvinces
    this._thaidataService.getProvinces().subscribe((res) => {
      this.dataProvinces = res;
    });

    this.formGroup = new FormGroup({
      selectedProvince: new FormControl<object | null>(null),
    });
  }

  private getUsers() {
    this._userService.getUserById(this.getId).subscribe({
      next: (res) => {
        this.getUser = res;
      },
    });
  }

  filterProvince(event: any) {
    let filtered: Province[] = [];
    let query = event.query;

    (this.dataProvinces as Province[]).forEach((province: Province) => {
      if (
        province.province_nameth.toLowerCase().indexOf(query.toLowerCase()) ==
          0 ||
        province.province_id.toString().indexOf(query.toLowerCase()) == 0
      ) {
        filtered.push(province);
      }
    });

    this.filteredProvince = filtered;
  }

  amphure(event: any) {
    this.inputAmphureDropdown = false;
    const getidProvince = event.value.province_id;
    this._thaidataService
      .getAmphureByProvinceId(getidProvince)
      .subscribe((res) => {
        this.dataAmphure = res;
      });
  }

  tambon(event: any) {
    this.inputTambonDropdown = false;
    const getidAmphure = event.value.amphure_id;

    this._thaidataService
      .getTambonByAmphureId(getidAmphure)
      .subscribe((res) => {
        this.dataTambon = res;
      });
  }

  zipcode(event: any) {
    const getidTambon = event.value.tambon_id;
    this._thaidataService
      .getZipcodeByTambonId(getidTambon)
      .subscribe((res: Thaidata[]) => {
        this.dataZipcode = res;
        console.log(this.dataZipcode);
        this.autoZipcode = this.dataZipcode[0].zipcode;
      });
  }

  showEditAddress() {
    this.visible = true;
    this.submitted = false;
  }

  save() {
    this.submitted = true;
    // addressData
    const userData = {
      province: this.selectedProvince.province_nameth,
      amphure: this.selectedAmphure.amphure_nameth,
      tambon: this.selectedTambon.tambon_nameth,
      zipcode: this.autoZipcode,
      role: '0',
    };

    const getToken: any = localStorage.getItem('token');
    const decodeToken: any = jwtDecode(getToken);

    this.getId = decodeToken.userId;

    this._userService
      .updateUser(this.getId, userData as User)
      .subscribe((res) => {
        // console.log('update user', res);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'อัพเดทข้อมูลสำเร็จ',
        });
        this.getUsers();
        // this.router.navigate(['personal-info'])
        // this._ngZone.run(() => {
        //   this.router.navigateByUrl('/personal-info')
        // })
        console.log(userData);
      });
    this.selectedProvince = '';
    this.selectedAmphure = '';
    this.selectedTambon = '';
    this.selectedZipcode = '';
    this.visible = false;
  }
}

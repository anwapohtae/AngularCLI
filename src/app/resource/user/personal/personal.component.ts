import { Component, OnInit } from '@angular/core';
import { User } from '../../../modules/user';
import { UserService } from '../../../services/user/user.service';
import { jwtDecode } from 'jwt-decode';
import { ThaidataService } from '../../../services/thia-data/thaidata.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Thaidata } from '../../../modules/thai-data';
import { get } from 'http';
import { log } from 'console';
import { filter } from 'rxjs';

interface Province {
  province_nameth: string;
  province_id: number;
}

interface Amphures {
  amphure_nameth: string;
  amphure_id: number;
  province_id: number;
}

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css'],
})
export class PersonalComponent implements OnInit {
  getId: any = null;

  dataUser = {
    firstname: null,
    lastname: null,
    googlefirstsname: null,
    googlelastname: null,
    age: null,
    numberphone: null,
    googleid: null,
    email: null,
    profile: null,
    province: null,
    amphure: null,
    tambon: null,
    zipcode: null,
  };
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

  constructor(
    private _userService: UserService,
    private _thaidataService: ThaidataService
  ) {}

  ngOnInit() {
    const getToken: any = localStorage.getItem('token');

    const decodeToken: any = jwtDecode(getToken);
    this.getId = decodeToken.userId;

    this._userService.getUserById(this.getId).subscribe({
      next: (res) => {
        this.dataUser = res;
      },
    });

    // GetProvinces
    this._thaidataService.getProvinces().subscribe((res) => {
      this.dataProvinces = res;
    });

    this.formGroup = new FormGroup({
      selectedCountry: new FormControl<object | null>(null),
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
    const getidTambon = event.value.tambon_id
    this._thaidataService
    .getZipcodeByTambonId(getidTambon)
    .subscribe((res: Thaidata[]) => {
      this.dataZipcode = res
      console.log(this.dataZipcode);
      this.autoZipcode = this.dataZipcode[0].zipcode
    })


  }

  showEditAddress() {
    this.visible = true;
  }
}

import { Component, OnInit } from '@angular/core';
import { User } from '../../../modules/user';
import { UserService } from '../../../services/user/user.service';
import { jwtDecode } from 'jwt-decode';
import { ThaidataService } from '../../../services/thia-data/thaidata.service';
import { log } from 'console';
import { FormControl, FormGroup } from '@angular/forms';

interface localtion {
  province_nameth: string;
  amphure_nameth: string;
  tambon_nameth: string;
  // Define other properties of the country object if there are any
}

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css'],
})
export class PersonalComponent implements OnInit {
  getId: any = null;

  dataUser!: User;

  visible = false;
  thaiData!: any;

  // autocomplete

  formGroup!: FormGroup;

  filteredProvince: any = [];
  filteredAmphure: any = [];
  filteredTambon: any = [];

  constructor(
    private _userService: UserService,
    private _thaidataService: ThaidataService
  ) {}

  ngOnInit() {
    const getToken: any = localStorage.getItem('token');

    const decodeToken: any = jwtDecode(getToken);
    this.getId = decodeToken.userId;

    this._userService.getUserById(this.getId).subscribe((res) => {
      this.dataUser = res as User;
    });

    this._thaidataService.getAllThaiData().subscribe((res) => {
      this.thaiData = res;
    });

    this.formGroup = new FormGroup({
      selectedCountry: new FormControl<object | null>(null),
    });
  }

  // autocomplete province
  filterProvince(event: any) {
    let query = event.query;

    // สร้าง Set เพื่อเก็บชื่อจังหวัดโดยไม่ให้ซ้ำกัน
    let uniqueProvinces = new Set<string>();

    // กรองข้อมูลโดยเพิ่มชื่อจังหวัดเข้าไปใน Set
    this.thaiData.forEach((province: localtion) => {
      if (
        province.province_nameth.toLowerCase().startsWith(query.toLowerCase())
      ) {
        uniqueProvinces.add(province.province_nameth);
      }
    });

    // แปลง Set เป็นอาร์เรย์
    let uniqueProvincesArray = Array.from(uniqueProvinces);

    // กำหนดค่าให้กับ filteredProvince โดยใช้ข้อมูลที่ไม่ซ้ำกัน
    this.filteredProvince = uniqueProvincesArray.map((provinceName) => {
      return {
        province_nameth: provinceName,
      };
    });
  }

  // autocomplete amphure
  filterAmphure(event: any) {
    let query = event.query;

    // สร้าง Set เพื่อเก็บชื่อจังหวัดโดยไม่ให้ซ้ำกัน
    let uniqueAmphure = new Set<string>();

    // กรองข้อมูลโดยเพิ่มชื่อจังหวัดเข้าไปใน Set
    this.thaiData.forEach((amphure: localtion) => {
      if (
        amphure.amphure_nameth.toLowerCase().startsWith(query.toLowerCase())
      ) {
        uniqueAmphure.add(amphure.amphure_nameth);
      }
    });

    // แปลง Set เป็นอาร์เรย์
    let uniqueAmphureArray = Array.from(uniqueAmphure);

    // กำหนดค่าให้กับ filteredCountries โดยใช้ข้อมูลที่ไม่ซ้ำกัน
    this.filteredAmphure = uniqueAmphureArray.map((amphureName) => {
      return {
        amphure_nameth: amphureName,
      };
    });
  }

  // autocomplete amphure
  filterTambon(event: any) {
    let query = event.query;

    // สร้าง Set เพื่อเก็บชื่อจังหวัดโดยไม่ให้ซ้ำกัน
    let uniqueTambon = new Set<string>();

    // กรองข้อมูลโดยเพิ่มชื่อจังหวัดเข้าไปใน Set
    this.thaiData.forEach((tambon: localtion) => {
      if (
        tambon.tambon_nameth.toLowerCase().startsWith(query.toLowerCase())
      ) {
        uniqueTambon.add(tambon.tambon_nameth);
      }
    });

    // แปลง Set เป็นอาร์เรย์
    let uniqueTambonArray = Array.from(uniqueTambon);

    // กำหนดค่าให้กับ filteredCountries โดยใช้ข้อมูลที่ไม่ซ้ำกัน
    this.filteredTambon = uniqueTambonArray.map((tambonName) => {
      return {
        tambon_nameth: tambonName,
      };
    });
  }

  showEditAddress() {
    this.visible = true;
  }
}

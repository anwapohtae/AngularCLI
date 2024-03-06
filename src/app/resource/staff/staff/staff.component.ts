import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CheckboxService } from '../../../services/checkbox/checkbox.service';
import { Console, log } from 'console';
import { BlockList } from 'net';
// import { Staff } from '../../../modules/staff';

interface Religion {
  religion: string;
}

interface Blood {
  bloodgroup: string;
}

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css'],
})
export class StaffComponent implements OnInit {
  formStaff!: FormGroup;

  prefix!: any | undefined;
  position!: any | undefined;
  religion!: Religion[] | undefined;
  cardnumber!: string | undefined;
  blood!: Blood[] | undefined;
  activeIndex: number = 0;

  constructor(private _checkbox: CheckboxService) {}

  ngOnInit() {
    this.religion = [
      {religion: 'อิสลาม'},
      {religion: 'พุทธ'},
      {religion: 'คริสต์'},
      {religion: 'ฮินดู'},
    ]

    this.blood = [
      {bloodgroup: 'A'},
      {bloodgroup: 'B'},
      {bloodgroup: 'AB'},
      {bloodgroup: 'O'},
    ]

    this._checkbox.getAllPrefix().subscribe((res) => {
      this.prefix = res;
      console.log(this.prefix);

    });

    this._checkbox.getAllPosition().subscribe((res) => {
      this.position = res
      console.log(this.position);

    });

    this.formStaff = new FormGroup({
      prefixth: new FormControl<object | null>(null),
      firstnameth: new FormControl<object | null>(null),
      lastnameth: new FormControl<object | null>(null),
      nickname: new FormControl<object | null>(null),
      prefixen: new FormControl<object | null>(null),
      firstname_en: new FormControl<object | null>(null),
      lastname_en: new FormControl<object | null>(null),
      birthdayme: new FormControl<object | null>(null),
      religion: new FormControl<object | null>(null),
      cardnumber: new FormControl<object | null>(null)
    });
  }

  Onsubmit() {
    const prefixthValue = this.formStaff.get('prefixth')?.value.name_th;
    const prefixenValue = this.formStaff.get('prefixen')?.value.name_en;

    this.formStaff.value.prefixth = prefixthValue;
    this.formStaff.value.prefixen = prefixenValue;

    // Menampilkan formStaff dengan modifikasi
    console.log(this.formStaff);
  }
}

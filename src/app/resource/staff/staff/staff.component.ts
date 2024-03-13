import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CheckboxService } from '../../../services/checkbox/checkbox.service';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import localeTh from '@angular/common/locales/th';
import { PrimeNGConfig } from 'primeng/api';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
pdfMake.fonts = {
  THSarabunNew: {
    normal: 'THSarabunNew.ttf',
  },
};

interface Religion {
  religion: string;
}

interface Blood {
  bloodgroup: string;
}

interface statuslife {
  idstatus: string;
  status: string;
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
  statuses!: any | undefined;
  cardnumber!: string | undefined;
  religion!: Religion[] | undefined;
  blood!: Blood[] | undefined;
  statuslife!: statuslife[] | undefined;
  activeIndex: number = 0;

  ingredient: any = null;

  pdfMake: any;
  // visible from father status
  visibleLife = true;
  visibleDead = true;

  th = {
    firstDayOfWeek: 1,
    dayNames: [
      'วันอาทิตย์',
      'วันจันทร์',
      'วันอังคาร',
      'วันพุธ',
      'วันพฤหัสบดี',
      'วันศุกร์',
      'วันเสาร์',
    ],
    dayNamesShort: ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'],
    dayNamesMin: ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'],
    monthNames: [
      'มกราคม',
      'กุมภาพันธ์',
      'มีนาคม',
      'เมษายน',
      'พฤษภาคม',
      'มิถุนายน',
      'กรกฎาคม',
      'สิงหาคม',
      'กันยายน',
      'ตุลาคม',
      'พฤศจิกายน',
      'ธันวาคม',
    ],
    monthNamesShort: [
      'ม.ค.',
      'ก.พ.',
      'มี.ค.',
      'เม.ย.',
      'พ.ค.',
      'มิ.ย.',
      'ก.ค.',
      'ส.ค.',
      'ก.ย.',
      'ต.ค.',
      'พ.ย.',
      'ธ.ค.',
    ],
    today: 'วันนี้',
    clear: 'ลบทิ้ง',
  };

  constructor(private _checkbox: CheckboxService) {}

  ngOnInit() {
    this.religion = [
      { religion: 'อิสลาม' },
      { religion: 'พุทธ' },
      { religion: 'คริสต์' },
      { religion: 'ฮินดู' },
    ];

    this.blood = [
      { bloodgroup: 'A' },
      { bloodgroup: 'B' },
      { bloodgroup: 'AB' },
      { bloodgroup: 'O' },
    ];

    this.statuslife = [
      { idstatus: '1', status: 'มีชีวิตอยู่' },
      { idstatus: '2', status: 'ถึงแก่กรรม' },
    ];

    this._checkbox.getAllPrefix().subscribe((res) => {
      this.prefix = res;
      console.log(this.prefix);
    });

    this._checkbox.getAllPosition().subscribe((res) => {
      this.position = res;
      console.log(this.position);
    });

    this._checkbox.getAllStatus().subscribe((res) => {
      this.statuses = res;
      console.log(this.statuses);
    });

    this.formStaff = new FormGroup({
      // dataMe
      prefixth: new FormControl<string | null>(null),
      firstnameth: new FormControl<string | null>(null),
      lastnameth: new FormControl<string | null>(null),
      nickname: new FormControl<string | null>(null),
      prefixen: new FormControl<string | null>(null),
      firstname_en: new FormControl<string | null>(null),
      lastname_en: new FormControl<string | null>(null),
      position: new FormControl<string | null>(null),
      birthdayme: new FormControl<string | null>(null),
      religion: new FormControl<string | null>(null),
      cardnumber: new FormControl<string | null>(null),
      blood: new FormControl<string | null>(null),

      // dataAddressMe
      numberhouse: new FormControl<string | null>(null),
      village: new FormControl<string | null>(null),
      villagename: new FormControl<string | null>(null),
      alley: new FormControl<string | null>(null),
      road: new FormControl<string | null>(null),
      tambon: new FormControl<string | null>(null),
      amphure: new FormControl<string | null>(null),
      province: new FormControl<string | null>(null),
      zipcode: new FormControl<string | null>(null),
      telephone: new FormControl<string | null>(null),
      telephonemobile: new FormControl<string | null>(null),
      emailme: new FormControl<string | null>(null),

      // family address
      fhousenumber: new FormControl<string | null>(null),
      fvillage: new FormControl<string | null>(null),
      fvillagename: new FormControl<string | null>(null),
      falley: new FormControl<string | null>(null),
      froad: new FormControl<string | null>(null),
      ftambon: new FormControl<string | null>(null),
      famphure: new FormControl<string | null>(null),
      fprovince: new FormControl<string | null>(null),
      fzipcode: new FormControl<string | null>(null),
      ftelephone: new FormControl<string | null>(null),
      ftelephonemobile: new FormControl<string | null>(null),
      femail: new FormControl<string | null>(null),

      // status
      status: new FormControl<string | null>(null),

      // spouse
      spousename: new FormControl<string | null>(null),
      spouselastname: new FormControl<string | null>(null),
      spouseoldlastname: new FormControl<string | null>(null),
      spouseage: new FormControl<string | null>(null),
      spousereligion: new FormControl<string | null>(null),
      spouseoccupation: new FormControl<string | null>(null),
      spouseoccupationwork: new FormControl<string | null>(null),
      spouseworkprovince: new FormControl<string | null>(null),
      spousetelephone: new FormControl<string | null>(null),

      // datafather
      fathername: new FormControl<string | null>(null),
      fatherlastname: new FormControl<string | null>(null),
      fatherbirthday: new FormControl<string | null>(null),
      fatherreligion: new FormControl<string | null>(null),
      fatherage: new FormControl<string | null>(null),
      statuslife: new FormControl<string | null>(null),

      // fatherstatuslife
      fatherstatuslife: new FormControl<string | null>(null),

      // statuslifefather
      fathernumberhouse: new FormControl<string | null>(null),
      fathervillage: new FormControl<string | null>(null),
      fathervillagename: new FormControl<string | null>(null),
      fatheralley: new FormControl<string | null>(null),
      fatherroad: new FormControl<string | null>(null),
      fathertambon: new FormControl<string | null>(null),
      fatheramphure: new FormControl<string | null>(null),
      fatherprovince: new FormControl<string | null>(null),
      fatherzipcode: new FormControl<string | null>(null),
      fathertelephone: new FormControl<string | null>(null),
      fathertelephonemobile: new FormControl<string | null>(null),

      // statusdeadfather
      fatherdayofdead: new FormControl<string | null>(null),
      fathercertificatedead: new FormControl<string | null>(null),
      fathercertificatenumber: new FormControl<string | null>(null),

      // fatherstatuslife
      motherstatuslife: new FormControl<string | null>(null),

      // statuslifemother
      mothernumberhouse: new FormControl<string | null>(null),
      mothervillage: new FormControl<string | null>(null),
      mothervillagename: new FormControl<string | null>(null),
      motheralley: new FormControl<string | null>(null),
      mothertambon: new FormControl<string | null>(null),
      motheramphure: new FormControl<string | null>(null),
      motherprovince: new FormControl<string | null>(null),
      motherzipcode: new FormControl<string | null>(null),
      mothertelephone: new FormControl<string | null>(null),
      mothertelephonemobile: new FormControl<string | null>(null),

      // statusdeadmother
      motherdayofdead: new FormControl<string | null>(null),
      mothercertificatedead: new FormControl<string | null>(null),
      mothercertificatenumber: new FormControl<string | null>(null),
    });
  }

  Onsubmit() {
    const prefixthValue = this.formStaff.get('prefixth')?.value.name_th;
    const prefixenValue = this.formStaff.get('prefixen')?.value.name_en;
    const positionValue = this.formStaff.get('position')?.value.name_th;
    const religionValue = this.formStaff.get('religion')?.value.religion;
    const bloodValue = this.formStaff.get('blood')?.value.bloodgroup;
    const birthdaymeValue = this.formStaff.get('birthdayme')?.value;

    // Next, extract day, month, and year from the birthdayme value
    const day = birthdaymeValue.getDate(); // Method to get day of the month (1-31)
    const month = birthdaymeValue.getMonth() + 1; // Month index starts from 0 (0-11), so adding 1
    const year = birthdaymeValue.getFullYear(); // Four-digit year

    this.formStaff.value.prefixth = prefixthValue;
    this.formStaff.value.prefixen = prefixenValue;
    this.formStaff.value.position = positionValue;
    this.formStaff.value.religion = religionValue;
    this.formStaff.value.blood = bloodValue;
    this.formStaff.value.blood = bloodValue;
    this.formStaff.get('day')?.setValue(day);
    this.formStaff.get('month')?.setValue(month);
    this.formStaff.get('year')?.setValue(year);
    // Menampilkan formStaff dengan modifikasi
    console.log(this.formStaff);
  }

  radioButton(idstatus: any, status: any) {
    if (idstatus == '1') {
      this.visibleLife = false;
      this.visibleDead = true;
    } else {
      this.visibleLife = true;
      this.visibleDead = false;
    }
  }

  public async generatePDF(): Promise<void> {
    const pdfDefinition: TDocumentDefinitions = {
      content: [
        {
          columns: [
            {
              stack: [
                {
                  text: 'แบบข้อมูลประวัติข้าราชการและลูกจ้างประจำ',
                  alignment: 'center',
                  bold: true,
                  fontSize: 18,
                },
                {
                  margin: [0, 10, 0, 0],
                  alignment: 'center',
                  columns: [
                    {
                      text: '๑. คำนำหน้าชื่อ, ชื่อสกุล เจ้าของประวัติ',
                      style: 'fz16',
                      width: 'auto',
                      margin: [0, 0, 0, 0], // Adjust the margin to align items
                    },
                    {
                      // text: `\t\t${prefixthValue} ${this.formStaff.get('firstnameth')?.value}\t${this.formStaff.get('lastnameth')?.value}\t\t`,
                      text: '\t\tนายอันวา เปาะแต\t\t',
                      decoration: 'underline',
                      decorationStyle: 'dotted',
                      style: 'fz16',
                      margin: [0, 0, 0, 0], // Adjust the margin to align items
                    },
                    {
                      text: 'ชื่อเล่น',
                      style: 'fz16',
                      width: 'auto',
                      margin: [20, 0, 0, 0], // Adjust the margin to align items
                    },
                    {
                      // text: `\t\t${this.formStaff.get('nickname')?.value}\t\t`,
                      text: '\t\tวา\t\t',
                      style: 'fz16',
                      decoration: 'underline',
                      decorationStyle: 'dotted',
                      margin: [0, 0, 0, 0], // Adjust the margin to align items
                    },
                  ],
                },
                {
                  margin: [0, 5, 0, 0],
                  columns: [
                    {
                      text: 'คำนำหน้าชื่อ, ชื่อสกุล (ภาษาอังกฤษ)',
                      fontSize: 16,
                      width: 'auto',
                      bold: false,
                      margin: [0, 0, 0, 0],
                    },
                    {
                      // text: `\t\t${this.formStaff.get('prefixen')?.value.name_en} ${this.formStaff.get('firstname_en')?.value}\t${this.formStaff.get('lastname_en')?.value}\t\t`,
                      text: '\t\tMr.Anwa Pohtae\t\t',
                      decoration: 'underline',
                      decorationStyle: 'dotted',
                      style: 'fz16',
                      bold: false,
                      margin: [40, 0, 0, 0],
                    },
                  ],
                },
                {
                  margin: [0, 5, 0, 0],
                  columns: [
                    {
                      text: 'ตำแหน่ง',
                      fontSize: 16,
                      width: 'auto',
                      bold: false,
                      margin: [0, 0, 0, 0],
                    },
                    {
                      text: `\t\t${
                        this.formStaff.get('position')?.value.name_th
                      }\t\t`,
                      style: 'fz16',
                      decoration: 'underline',
                      decorationStyle: 'dotted',
                      width: 'auto',
                      margin: [40, 0, 0, 0],
                    },
                    {
                      text: 'สังกัด (สำนัก)',
                      style: 'fz16',
                      margin: [50, 0, 0, 0],
                    },
                  ],
                },

                {
                  margin: [0, 5, 0, 0],
                  columns: [
                    {
                      text: 'เกิดเมื่อวันที่',
                      fontSize: 16,
                      width: 'auto',
                      bold: false,
                      margin: [0, 0, 0, 0],
                    },
                    {
                      text: `\t\t${
                        this.formStaff.get('birthdayme')?.value
                      }\t\t`,
                      style: 'fz16',
                      decoration: 'underline',
                      decorationStyle: 'dotted',
                      width: 'auto',
                      margin: [40, 0, 0, 0],
                    },
                    {
                      text: 'ศาสนา',
                      style: 'fz16',
                      width: 'auto',
                      margin: [50, 0, 0, 0],
                    },
                    {
                      text: `\t\t${
                        this.formStaff.get('religion')?.value.religion
                      }\t\t`,
                      style: 'fz16',
                      decoration: 'underline',
                      decorationStyle: 'dotted',
                      margin: [40, 0, 0, 0],
                    },
                  ],
                },

                {
                  margin: [0, 5, 0, 0],
                  columns: [
                    {
                      text: 'เลขบัตรประตัวประชาชน',
                      fontSize: 16,
                      width: 'auto',
                      bold: false,
                      margin: [0, 0, 0, 0],
                    },
                    {
                      text: `\t\t${
                        this.formStaff.get('cardnumber')?.value
                      }\t\t`,
                      style: 'fz16',
                      decoration: 'underline',
                      decorationStyle: 'dotted',
                      width: 'auto',
                      margin: [40, 0, 0, 0],
                    },
                    {
                      text: 'หมู่โลหิต',
                      style: 'fz16',
                      width: 'auto',
                      margin: [50, 0, 0, 0],
                    },
                    {
                      text: `\t\t${
                        this.formStaff.get('blood')?.value.bloodgroup
                      }\t\t`,
                      style: 'fz16',
                      decoration: 'underline',
                      decorationStyle: 'dotted',
                      margin: [40, 0, 0, 0],
                    },
                  ],
                },

                {
                  margin: [0, 10, 0, 0],
                  columns: [
                    {
                      text: '๒. ที่พักอาศัยปัจจุบัน บ้านเลขที่',
                      fontSize: 16,
                      width: 'auto',
                      bold: false,
                      margin: [0, 0, 0, 0],
                    },
                    {
                      text: '\t148-148/4\t',
                      style: 'fz16',
                      decoration: 'underline',
                      decorationStyle: 'dotted',
                      width: 'auto',
                      margin: [20, 0, 0, 0],
                    },
                    {
                      text: 'หมู่ที่',
                      style: 'fz16',
                      width: 'auto',
                      margin: [30, 0, 0, 0],
                    },
                    {
                      text: '\t-\t',
                      style: 'fz16',
                      width: 'auto',
                      decoration: 'underline',
                      decorationStyle: 'dotted',
                      margin: [20, 0, 0, 0],
                    },
                    {
                      text: 'หมู่บ้าน',
                      style: 'fz16',
                      width: 'auto',
                      margin: [30, 0, 0, 0],
                    },
                    {
                      text: '\tสุขสรรค์\t',
                      style: 'fz16',
                      decoration: 'underline',
                      decorationStyle: 'dotted',
                      margin: [20, 0, 0, 0],
                    },
                  ],
                },

                {
                  margin: [0, 5, 0, 0],
                  columns: [
                    {
                      text: 'ตรอก/ซอย',
                      fontSize: 16,
                      width: 'auto',
                      bold: false,
                      margin: [0, 0, 0, 0],
                    },
                    {
                      text: '\t-\t',
                      style: 'fz16',
                      decoration: 'underline',
                      decorationStyle: 'dotted',
                      width: 'auto',
                      margin: [40, 0, 0, 0],
                    },
                    {
                      text: 'ถนน',
                      style: 'fz16',
                      width: 'auto',
                      margin: [50, 0, 0, 0],
                    },
                    {
                      text: '\t\tท่าเสด็จ\t\t',
                      style: 'fz16',
                      width: 'auto',
                      decoration: 'underline',
                      decorationStyle: 'dotted',
                      margin: [40, 0, 0, 0],
                    },
                    {
                      text: 'ตำบล/แขวง',
                      style: 'fz16',
                      width: 'auto',
                      margin: [50, 0, 0, 0],
                    },
                    {
                      text: '\t\tตะลุบัน\t\t',
                      style: 'fz16',
                      decoration: 'underline',
                      decorationStyle: 'dotted',
                      margin: [40, 0, 0, 0],
                    },
                  ],
                },

                {
                  margin: [0, 5, 0, 0],
                  columns: [
                    {
                      text: 'อำเภอ/เขต',
                      fontSize: 16,
                      width: 'auto',
                      bold: false,
                      margin: [0, 0, 0, 0],
                    },
                    {
                      text: '\tสายบุรี\t',
                      style: 'fz16',
                      decoration: 'underline',
                      decorationStyle: 'dotted',
                      width: 'auto',
                      margin: [40, 0, 0, 0],
                    },
                    {
                      text: 'จังหวัด',
                      style: 'fz16',
                      width: 'auto',
                      margin: [50, 0, 0, 0],
                    },
                    {
                      text: '\t\tปัตตานี\t\t',
                      style: 'fz16',
                      width: 'auto',
                      decoration: 'underline',
                      decorationStyle: 'dotted',
                      margin: [40, 0, 0, 0],
                    },
                    {
                      text: 'รหัสไปรษณีย์',
                      style: 'fz16',
                      width: 'auto',
                      margin: [50, 0, 0, 0],
                    },
                    {
                      text: '\t\t94110\t\t',
                      style: 'fz16',
                      decoration: 'underline',
                      decorationStyle: 'dotted',
                      margin: [40, 0, 0, 0],
                    },
                  ],
                },

                {
                  margin: [0, 5, 0, 0],
                  columns: [
                    {
                      text: 'โทรศัพท์',
                      fontSize: 16,
                      width: 'auto',
                      bold: false,
                      margin: [0, 0, 0, 0],
                    },
                    {
                      text: '\t0800351940\t',
                      style: 'fz16',
                      decoration: 'underline',
                      decorationStyle: 'dotted',
                      width: 'auto',
                      margin: [20, 0, 0, 0],
                    },
                    {
                      text: 'โทรศัพท์มือถือ',
                      style: 'fz16',
                      width: 'auto',
                      margin: [20, 0, 0, 0],
                    },
                    {
                      text: '\t0615106765\t',
                      style: 'fz16',
                      width: 'auto',
                      decoration: 'underline',
                      decorationStyle: 'dotted',
                      margin: [20, 0, 0, 0],
                    },
                    {
                      text: 'E-mail',
                      style: 'fz16',
                      width: 50,
                      margin: [20, 0, 0, 0],
                    },
                    {
                      text: 'anwa.p2544@gmail.com',
                      style: 'fz16',
                      width: 'auto',
                      decoration: 'underline',
                      decorationStyle: 'dotted',
                      margin: [10, 0, 0, 0],
                    },
                  ],
                },

                {
                  margin: [0, 10, 0, 0],
                  columns: [
                    {
                      text: '๓. ที่อยู่หลักครอบครัว (ตามทะเบียนบ้าน) บ้านเลขที่',
                      fontSize: 16,
                      width: 'auto',
                      bold: false,
                      margin: [0, 0, 0, 0],
                    },
                    {
                      text: '\t148-148/4\t',
                      style: 'fz16',
                      decoration: 'underline',
                      decorationStyle: 'dotted',
                      width: 'auto',
                      margin: [20, 0, 0, 0],
                    },
                    {
                      text: 'หมู่ที่',
                      style: 'fz16',
                      width: 'auto',
                      margin: [30, 0, 0, 0],
                    },
                    {
                      text: '\t-\t',
                      style: 'fz16',
                      width: 'auto',
                      decoration: 'underline',
                      decorationStyle: 'dotted',
                      margin: [20, 0, 0, 0],
                    },
                    {
                      text: 'หมู่บ้าน',
                      style: 'fz16',
                      width: 'auto',
                      margin: [30, 0, 0, 0],
                    },
                    {
                      text: '\tสุขสรรค์\t',
                      style: 'fz16',
                      decoration: 'underline',
                      decorationStyle: 'dotted',
                      margin: [20, 0, 0, 0],
                    },
                  ],
                },

                {
                  margin: [0, 5, 0, 0],
                  columns: [
                    {
                      text: 'ตรอก/ซอย',
                      fontSize: 16,
                      width: 'auto',
                      bold: false,
                      margin: [0, 0, 0, 0],
                    },
                    {
                      text: '\t-\t',
                      style: 'fz16',
                      decoration: 'underline',
                      decorationStyle: 'dotted',
                      width: 'auto',
                      margin: [40, 0, 0, 0],
                    },
                    {
                      text: 'ถนน',
                      style: 'fz16',
                      width: 'auto',
                      margin: [50, 0, 0, 0],
                    },
                    {
                      text: '\t\tท่าเสด็จ\t\t',
                      style: 'fz16',
                      width: 'auto',
                      decoration: 'underline',
                      decorationStyle: 'dotted',
                      margin: [40, 0, 0, 0],
                    },
                    {
                      text: 'ตำบล/แขวง',
                      style: 'fz16',
                      width: 'auto',
                      margin: [50, 0, 0, 0],
                    },
                    {
                      text: '\t\tตะลุบัน\t\t',
                      style: 'fz16',
                      decoration: 'underline',
                      decorationStyle: 'dotted',
                      margin: [40, 0, 0, 0],
                    },
                  ],
                },

                {
                  margin: [0, 5, 0, 0],
                  columns: [
                    {
                      text: 'อำเภอ/เขต',
                      fontSize: 16,
                      width: 'auto',
                      bold: false,
                      margin: [0, 0, 0, 0],
                    },
                    {
                      text: '\tสายบุรี\t',
                      style: 'fz16',
                      decoration: 'underline',
                      decorationStyle: 'dotted',
                      width: 'auto',
                      margin: [40, 0, 0, 0],
                    },
                    {
                      text: 'จังหวัด',
                      style: 'fz16',
                      width: 'auto',
                      margin: [50, 0, 0, 0],
                    },
                    {
                      text: '\t\tปัตตานี\t\t',
                      style: 'fz16',
                      width: 'auto',
                      decoration: 'underline',
                      decorationStyle: 'dotted',
                      margin: [40, 0, 0, 0],
                    },
                    {
                      text: 'รหัสไปรษณีย์',
                      style: 'fz16',
                      width: 'auto',
                      margin: [50, 0, 0, 0],
                    },
                    {
                      text: '\t\t94110\t\t',
                      style: 'fz16',
                      decoration: 'underline',
                      decorationStyle: 'dotted',
                      margin: [40, 0, 0, 0],
                    },
                  ],
                },

                {
                  margin: [0, 5, 0, 0],
                  columns: [
                    {
                      text: 'โทรศัพท์',
                      fontSize: 16,
                      width: 'auto',
                      bold: false,
                      margin: [0, 0, 0, 0],
                    },
                    {
                      text: '\t0800351940\t',
                      style: 'fz16',
                      decoration: 'underline',
                      decorationStyle: 'dotted',
                      width: 'auto',
                      margin: [20, 0, 0, 0],
                    },
                    {
                      text: 'โทรศัพท์มือถือ',
                      style: 'fz16',
                      width: 'auto',
                      margin: [20, 0, 0, 0],
                    },
                    {
                      text: '\t0615106765\t',
                      style: 'fz16',
                      width: 'auto',
                      decoration: 'underline',
                      decorationStyle: 'dotted',
                      margin: [20, 0, 0, 0],
                    },
                    {
                      text: 'E-mail',
                      style: 'fz16',
                      width: 50,
                      margin: [20, 0, 0, 0],
                    },
                    {
                      text: 'anwa.p2544@gmail.com',
                      style: 'fz16',
                      width: 'auto',
                      decoration: 'underline',
                      decorationStyle: 'dotted',
                      margin: [10, 0, 0, 0],
                    },
                  ],
                },

                {
                  margin: [0, 10, 0, 0],
                  columns: [
                    {
                      text: '๔. สถานภาพ',
                      fontSize: 16,
                      width: 'auto',
                      bold: false,
                      margin: [0, 0, 0, 0],
                    },
                    {
                      text: `( ) โสด`,
                      style: 'fz16',
                      width: 'auto',
                      margin: [20, 0, 0, 0],
                    },
                    {
                      text: `( ) สมรสจดทะเบียน`,
                      style: 'fz16',
                      width: 'auto',
                      margin: [30, 0, 0, 0],
                    },
                    {
                      text: ` ( ) สมรมไม่จำทะเบียน`,
                      style: 'fz16',
                      width: 'auto',
                      margin: [20, 0, 0, 0],
                    },
                  ],
                },

                {
                  margin: [0, 5, 0, 0],
                  columns: [
                    {
                      text: `( ) หย่า`,
                      style: 'fz16',
                      width: 130,
                      margin: [77, 0, 0, 0],
                    },
                    {
                      text: `( ) คู่สมรสถึงแก่กรรม`,
                      style: 'fz16',
                      width: 'auto',
                      margin: [5, 0, 0, 0],
                    },
                  ],
                },

                {
                  margin: [0, 10, 0, 0],
                  columns: [
                    {
                      text: '๕. คู่สมรส ชื่อ',
                      fontSize: 16,
                      width: 'auto',
                      bold: false,
                      margin: [0, 0, 0, 0],
                    },
                    {
                      text: '\tชื่อสมมุติ\t',
                      style: 'fz16',
                      decoration: 'underline',
                      decorationStyle: 'dotted',
                      width: 'auto',
                      margin: [20, 0, 0, 0],
                    },
                    {
                      text: 'นามสกุล',
                      style: 'fz16',
                      width: 'auto',
                      margin: [20, 0, 0, 0],
                    },
                    {
                      text: '\tนามสกุลสมมุติ\t',
                      style: 'fz16',
                      width: 'auto',
                      decoration: 'underline',
                      decorationStyle: 'dotted',
                      margin: [20, 0, 0, 0],
                    },
                    {
                      text: 'สกุลเดิมก่อนสมรส (หญิง)',
                      style: 'fz16',
                      width: 'auto',
                      margin: [20, 0, 0, 0],
                    },
                    {
                      text: `\tนามสกุลสมมุติ\t`,
                      style: 'fz16',
                      decoration: 'underline',
                      decorationStyle: 'dotted',
                      margin: [20, 0, 0, 0],
                    },
                  ],
                },

                {
                  margin: [0, 5, 0, 0],
                  columns: [
                    {
                      text: 'อายุ',
                      fontSize: 16,
                      width: 'auto',
                      bold: false,
                      margin: [0, 0, 0, 0],
                    },
                    {
                      text: '\t23\t',
                      style: 'fz16',
                      decoration: 'underline',
                      decorationStyle: 'dotted',
                      width: 'auto',
                      margin: [15, 0, 15, 0],
                    },
                    {
                      text: 'ปี',
                      style: 'fz16',
                      width: 'auto',
                      margin: [0, 0, 0, 0],
                    },
                    {
                      text: 'ศาสนา',
                      style: 'fz16',
                      width: 'auto',
                      margin: [15, 0, 0, 0],
                    },
                    {
                      text: `\tอิสลาม\t`,
                      style: 'fz16',
                      decoration: 'underline',
                      decorationStyle: 'dotted',
                      width: 'auto',
                      margin: [15, 0, 15, 0],
                    },
                    {
                      text: `อาชีพ`,
                      style: 'fz16',
                      width: 'auto',
                      margin: [15, 0, 0, 0],
                    },
                    {
                      text: `\tค้าขาย\t`,
                      style: 'fz16',
                      width: 'auto',
                      decoration: 'underline',
                      decorationStyle: 'dotted',
                      margin: [15, 0, 15, 0],
                    },
                    {
                      text: 'โทรศัพท์',
                      style: 'fz16',
                      width: 'auto',
                      margin: [15, 0, 0, 0],
                    },
                    {
                      text: `\t0800351940\t`,
                      style: 'fz16',
                      width: 'auto',
                      decoration: 'underline',
                      decorationStyle: 'dotted',
                      margin: [15, 0, 0, 0],
                    },
                  ],
                },

                {
                  margin: [0, 5, 0, 0],
                  columns: [
                    {
                      text: 'สถานที่ทำงาน',
                      width: 'auto',
                      style: 'fz16',
                      margin: [0, 0, 0, 0],
                    },
                    {
                      text: `148-148/4 ถ.ท่าเสด็จ ต.ตะลุบัน อ.สายบุรี จ.ปัตตานี 94110`,
                      style: 'fz16',
                      width: 'auto',
                      decoration: 'underline',
                      decorationStyle: 'dotted',
                      margin: [15, 0, 0, 0],
                    },
                    {
                      text: 'จังหวัด',
                      style: 'fz16',
                      width: 'auto',
                      margin: [5, 0, 0, 0],
                    },
                    {
                      text: `\tปัตตานี\t`,
                      decoration: 'underline',
                      decorationStyle: 'dotted',
                      style: 'fz16',
                      margin: [15, 0, 0, 0],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      defaultStyle: {
        font: 'THSarabunNew', // Assign a style object here
      },
      styles: {
        fz18: {
          fontSize: 18,
        },
        fz16: {
          fontSize: 16,
        },
      },
    };

    pdfMake.createPdf(pdfDefinition).open();
  }

  // generatePDF(): void {
  //   const docDefinition: TDocumentDefinitions = {
  //     content: [
  //       { text: 'This is a header', style: 'header' },
  //       'No styling here, this is a standard paragraph',
  //       { text: 'Another text', style: 'anotherStyle' },
  //       { text: 'Multiple styles applied', style: ['header', 'anotherStyle'] },
  //     ],defaultStyle:{
  //       font: 'THSarabunNew'
  //     },

  //     styles: {
  //       header: {
  //         fontSize: 22,
  //       },
  //       anotherStyle: {
  //         italics: true,
  //         alignment: 'right',
  //       },
  //     },
  //   };
  //   // pdfMake.createPdf(docDefinition).open();
  //   pdfMake.createPdf(docDefinition).getBlob((blob: Blob) => {
  //     const url = URL.createObjectURL(blob);
  //     window.open(url); // เปิด PDF ในหน้าต่างใหม่
  //   });
  // }
}

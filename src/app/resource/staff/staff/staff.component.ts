import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CheckboxService } from '../../../services/checkbox/checkbox.service';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import localeTh from '@angular/common/locales/th';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import SignaturePad from 'signature_pad';
import html2canvas from 'html2canvas';
import { RachkarnService } from '../../../services/rachkarn/rachkarn.service';
import { response } from 'express';
import { Router } from '@angular/router';
import { Rachkarn } from '../../../modules/rachkarn';
import { jwtDecode } from 'jwt-decode';
import { UserService } from '../../../services/user/user.service';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
pdfMake.fonts = {
  THSarabunNew: {
    normal: 'THSarabunNew.ttf',
    bold: 'THSarabunNew Bold.ttf',
    italics: 'THSarabunNew Italic.ttf',
    bolditalics: 'THSarabunNew BoldItalic.ttf',
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

  prefixth: string = '';
  prefix!: any | undefined;
  position!: any | undefined;
  statuses!: any | undefined;
  religion!: Religion[] | undefined;
  blood!: Blood[] | undefined;
  statuslife!: statuslife[] | undefined;

  getidUser!: any;
  user: any = {
    id: null,
    email: null,
    firstname: null,
    lastname: null,
    profile: null,
  };
  getRachkarn: Rachkarn | undefined;

  pdfMake: any;
  // visible from father status
  visibleLife = true;
  visibleDead = true;

  thLocale: any;

  // imageLaisen
  imLaisen!: any;

  // Visible button dialog document
  disabledButtondialogDocument: boolean = false;

  constructor(
    private _checkbox: CheckboxService,
    private primengConfig: PrimeNGConfig,
    private rachkarnService: RachkarnService,
    private messageService: MessageService,
    private router: Router,
    private userService: UserService
  ) {
    this.thLocale = localeTh;
    this.primengConfig.setTranslation({
      firstDayOfWeek: 0,
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
      today: 'Today',
      clear: 'Clear',
      dateFormat: 'mm/dd/yy',
      weekHeader: 'Wk',
    });
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
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
      fnumberhouse: new FormControl<string | null>(null),
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
      // fatherdayofdead: new FormControl<string | null>(null),
      // fathercertificatedead: new FormControl<string | null>(null),
      // fathercertificatenumber: new FormControl<string | null>(null),

      // datafather
      mothername: new FormControl<string | null>(null),
      motherlastname: new FormControl<string | null>(null),
      motherbirthday: new FormControl<string | null>(null),
      motherreligion: new FormControl<string | null>(null),
      motherage: new FormControl<string | null>(null),

      // motherstatuslife
      // motherstatuslife: new FormControl<string | null>(null),

      // statuslifemother
      mothernumberhouse: new FormControl<string | null>(null),
      mothervillage: new FormControl<string | null>(null),
      mothervillagename: new FormControl<string | null>(null),
      motheralley: new FormControl<string | null>(null),
      motherroad: new FormControl<string | null>(null),
      mothertambon: new FormControl<string | null>(null),
      motheramphure: new FormControl<string | null>(null),
      motherprovince: new FormControl<string | null>(null),
      motherzipcode: new FormControl<string | null>(null),
      mothertelephone: new FormControl<string | null>(null),
      mothertelephonemobile: new FormControl<string | null>(null),

      // statusdeadmother
      // motherdayofdead: new FormControl<string | null>(null),
      // mothercertificatedead: new FormControl<string | null>(null),
      // mothercertificatenumber: new FormControl<string | null>(null),

      datelaisen: new FormControl<object | null>(null),
      monthlaisen: new FormControl<object | null>(null),
      yearlaisen: new FormControl<object | null>(null),

      userid: new FormControl<object | null>(null),
    });

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

      this.userService.getUserById(this.user.id).subscribe((res) => {
        this.user = res;
      });
    } else {
      console.error('Token not found in localStorage');
    }
    const getUserid = this.user.id;
    const cvStringUserid = getUserid.toString();

    this.rachkarnService.GetRachkarnByUserId(cvStringUserid).subscribe({
      next: async (response: Rachkarn) => {
        if (response != null) {
          this.getRachkarn = response;
          console.log(this.getRachkarn);

          this.disabledButtondialogDocument = true;
        } else {
          this.disabledButtondialogDocument = false;
        }
      },
    });
  }

  OnChangePrefixth(event: any) {
    this.prefixth = event.value.name_th; // Update the prefixth property
  }

  Onsubmit() {
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

      this.userService.getUserById(this.user.id).subscribe((res) => {
        this.user = res;
      });
    } else {
      console.error('Token not found in localStorage');
    }
    const getUserid = this.user.id;
    const cvUserid = getUserid.toString();

    const prefixthValue = this.formStaff.get('prefixth')?.value.name_th;
    const prefixenValue = this.formStaff.get('prefixen')?.value.name_en;
    const positionValue = this.formStaff.get('position')?.value.name_th;
    const religionValue = this.formStaff.get('religion')?.value.religion;
    const bloodValue = this.formStaff.get('blood')?.value.bloodgroup;
    const spousereligionValue =
      this.formStaff.get('spousereligion')?.value.religion;
    const fatherreligionValue =
      this.formStaff.get('fatherligion')?.value.religion;
    const motherreligionValue =
      this.formStaff.get('motherligion')?.value.religion;
    const birthdaymeValue = this.formStaff.get('birthdayme')?.value;
    const fatherBirthday = this.formStaff.get('fatherbirthday')?.value;
    const motherBirthday = this.formStaff.get('motherbirthday')?.value;

    // แปลงวันที่ให้อยู่ในรูปแบบของ string
    // Convert birthdaymeValue to Thai locale date string
    const thaiBirthdayme = new Date(birthdaymeValue).toLocaleDateString(
      'th-TH',
      {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }
    );

    // Convert fatherBirthday to Thai locale date string
    const thaiFatherBirthday = new Date(fatherBirthday).toLocaleDateString(
      'th-TH',
      {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }
    );

    // Convert motherBirthday to Thai locale date string
    const thaiMotherBirthday = new Date(motherBirthday).toLocaleDateString(
      'th-TH',
      {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }
    );

    // แทนที่ปีในข้อความด้วยปีไทย
    // วันเดือนปีตนเอง
    const thaiYearme = new Date(birthdaymeValue).getFullYear() + 543;
    const birthDayme = thaiBirthdayme.replace(
      new Date(birthdaymeValue).getFullYear().toString(),
      thaiYearme.toString()
    );

    // แทนที่ปีในข้อความด้วยปีไทย
    // วันเดือนปีตนเอง
    const thaiYearfather = new Date(thaiFatherBirthday).getFullYear() + 543;
    const birthDayfather = thaiBirthdayme.replace(
      new Date(birthdaymeValue).getFullYear().toString(),
      thaiYearfather.toString()
    );

    // แทนที่ปีในข้อความด้วยปีไทย
    // วันเดือนปีตนเอง
    const thaiYearmother = new Date(thaiMotherBirthday).getFullYear() + 543;
    const birthDaymother = thaiBirthdayme.replace(
      new Date(birthdaymeValue).getFullYear().toString(),
      thaiYearmother.toString()
    );

    this.formStaff.patchValue({
      prefixth: prefixthValue,
      prefixen: prefixenValue,
      position: positionValue,
      religion: religionValue,
      birthdayme: birthDayme,
      blood: bloodValue,
      spousereligion: spousereligionValue,
      fatherreligion: fatherreligionValue,
      motherreligion: motherreligionValue,
      fatherbirthday: birthDayfather,
      motherbirthday: birthDaymother,
      userid: cvUserid,
    });

    console.log(this.formStaff);
    const formData: Rachkarn = Object.assign({}, this.formStaff.value);
    this.rachkarnService.createRachkarn(formData).subscribe(
      (response) => {
        console.log('เอกสารราชการบันทึกเรียบร้อย', response);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'บันทึกข้อมูลเรียบร้อย',
        });
        this.router.navigateByUrl('/staff');
      },
      (error) => {
        console.log('create Rachkarn failed', error);
      }
    );
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

  @ViewChild('laisen') laisen: any;
  @ViewChild('content') content!: ElementRef;
  @ViewChild('contentPage1') contentPage1!: ElementRef;
  @ViewChild('contentPage2') contentPage2!: ElementRef;

  public async generatePDF(): Promise<void> {
    const contentPage1 = this.contentPage1.nativeElement;
    const contentPage2 = this.contentPage2.nativeElement;
    const options = {
      scale: 2, // เพิ่มค่า scale เพื่อปรับขนาดของรูปภาพให้มีขนาดใหญ่ขึ้น
      width: 790, // กำหนดความกว้างของรูปภาพให้มีขนาดเท่ากับความกว้างของกระดาษ A4 ในหน่วยพิกเซล (595)
      height: 1080, // กำหนดความสูงของรูปภาพให้มีขนาดเท่ากับความสูงของกระดาษ A4 ในหน่วยพิกเซล (842)
    };

    const page1 = await html2canvas(contentPage1, options);
    const imgDataPage1 = page1.toDataURL('image/png');

    const page2 = await html2canvas(contentPage2, options);
    const imgDataPage2 = page2.toDataURL('image/png');

    const pdfDefinition: TDocumentDefinitions = {
      content: [
        {
          image: imgDataPage1,
          width: 530,
        },
        {
          image: imgDataPage2,
          width: 530,
          pageBreak: 'before',
        },
      ],

      defaultStyle: {
        font: 'THSarabun',
      },
    };

    pdfMake.createPdf(pdfDefinition).open();
  }

  // public async generatePDF(): Promise<void> {
  //   const birthdaymeValue = this.formStaff.get('birthdayme')?.value;
  //   const fatherBirthday = this.formStaff.get('fatherbirthday')?.value;
  //   const motherBirthday = this.formStaff.get('motherbirthday')?.value;

  //   // แปลงวันที่ให้อยู่ในรูปแบบของ string
  //   // Convert birthdaymeValue to Thai locale date string
  //   const thaiBirthdayme = new Date(birthdaymeValue).toLocaleDateString(
  //     'th-TH',
  //     {
  //       weekday: 'long',
  //       year: 'numeric',
  //       month: 'long',
  //       day: 'numeric',
  //     }
  //   );

  //   // Convert fatherBirthday to Thai locale date string
  //   const thaiFatherBirthday = new Date(fatherBirthday).toLocaleDateString(
  //     'th-TH',
  //     {
  //       weekday: 'long',
  //       year: 'numeric',
  //       month: 'long',
  //       day: 'numeric',
  //     }
  //   );

  //   // Convert motherBirthday to Thai locale date string
  //   const thaiMotherBirthday = new Date(motherBirthday).toLocaleDateString(
  //     'th-TH',
  //     {
  //       weekday: 'long',
  //       year: 'numeric',
  //       month: 'long',
  //       day: 'numeric',
  //     }
  //   );

  //   // แทนที่ปีในข้อความด้วยปีไทย
  //   // วันเดือนปีตนเอง
  //   const thaiYearme = new Date(birthdaymeValue).getFullYear() + 543;
  //   const birthDayme = thaiBirthdayme.replace(
  //     new Date(birthdaymeValue).getFullYear().toString(),
  //     thaiYearme.toString()
  //   );

  //   // แทนที่ปีในข้อความด้วยปีไทย
  //   // วันเดือนปีตนเอง
  //   const thaiYearfather = new Date(thaiFatherBirthday).getFullYear() + 543;
  //   const birthDayfather = thaiBirthdayme.replace(
  //     new Date(birthdaymeValue).getFullYear().toString(),
  //     thaiYearfather.toString()
  //   );

  //   // แทนที่ปีในข้อความด้วยปีไทย
  //   // วันเดือนปีตนเอง
  //   const thaiYearmother = new Date(thaiMotherBirthday).getFullYear() + 543;
  //   const birthDaymother = thaiBirthdayme.replace(
  //     new Date(birthdaymeValue).getFullYear().toString(),
  //     thaiYearmother.toString()
  //   );

  //   this.formStaff.patchValue({
  //     birthdayme: birthDayme,
  //     fatherbirthday: birthDayfather,
  //     motherbirthday: birthDaymother,
  //   });

  //   const status = this.formStaff.get('status')?.value;

  //   var statusLifeImage =
  //     'data:image/png;base64,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';
  //   var statusLifeText = '';

  //   if (status) {
  //     switch (status) {
  //       case 'โสด':
  //         statusLifeImage;
  //         statusLifeText = 'โสด';
  //         break;
  //       case 'หย่า':
  //         statusLifeImage;
  //         statusLifeText = 'หย่า';
  //         break;
  //       case 'สมรสจดทะเบียน':
  //         statusLifeImage;
  //         statusLifeText = 'สมรสจดทะเบียน';
  //         break;
  //       case 'คู่สมรสถึงแก่กรรม':
  //         statusLifeImage;
  //         statusLifeText = 'คู่สมรสถึงแก่กรรม';
  //         break;
  //       case 'สมรสไม่จดทะเบียน':
  //         statusLifeImage;
  //         statusLifeText = 'สมรสไม่จดทะเบียน';
  //         break;
  //     }
  //   }

  //   const laisen = this.laisen.nativeElement;
  //   const canvas = await html2canvas(laisen);
  //   const imgData = canvas.toDataURL('image/png');

  //   const pdfDefinition: TDocumentDefinitions = {
  //     pageSize: 'A4',
  //     content: [
  //       {
  //         margin: [20, 0, 0, 0],
  //         columns: [
  //           {
  //             stack: [
  //               {
  //                 text: 'แบบข้อมูลประวัติข้าราชการและลูกจ้างประจำ',
  //                 alignment: 'center',
  //                 bold: true,
  //                 fontSize: 18,
  //               },

  //               {
  //                 margin: [0, 10, 0, 0],
  //                 alignment: 'center',
  //                 columns: [
  //                   {
  //                     text: '๑. คำนำหน้าชื่อ, ชื่อสกุล เจ้าของประวัติ',
  //                     style: 'fz16',
  //                     width: 'auto',
  //                     margin: [0, 0, 0, 0],
  //                   },
  //                   {
  //                     text: `\t\t${
  //                       this.formStaff.get('prefixth')?.value.name_th
  //                     } ${this.formStaff.get('firstnameth')?.value}\t${
  //                       this.formStaff.get('lastnameth')?.value
  //                     }\t\t`,
  //                     decoration: 'underline',
  //                     decorationStyle: 'dotted',
  //                     style: 'fz16',
  //                     margin: [0, 0, 0, 0],
  //                   },
  //                   {
  //                     text: 'ชื่อเล่น',
  //                     style: 'fz16',
  //                     width: 'auto',
  //                     margin: [20, 0, 0, 0],
  //                   },
  //                   {
  //                     text: `\t\t${this.formStaff.get('nickname')?.value}\t\t`,
  //                     style: 'fz16',
  //                     decoration: 'underline',
  //                     decorationStyle: 'dotted',
  //                     margin: [0, 0, 0, 0],
  //                   },
  //                 ],
  //               },

  //               {
  //                 margin: [0, 5, 0, 0],
  //                 columns: [
  //                   {
  //                     text: 'คำนำหน้าชื่อ, ชื่อสกุล (ภาษาอังกฤษ)',
  //                     fontSize: 16,
  //                     width: 'auto',
  //                     margin: [0, 0, 0, 0],
  //                   },
  //                   {
  //                     text: `\t\t${
  //                       this.formStaff.get('prefixen')?.value.name_en
  //                     } ${this.formStaff.get('firstname_en')?.value}\t${
  //                       this.formStaff.get('lastname_en')?.value
  //                     }\t\t`,
  //                     decoration: 'underline',
  //                     decorationStyle: 'dotted',
  //                     style: 'fz16',
  //                     margin: [40, 0, 0, 0],
  //                   },
  //                 ],
  //               },

  //               {
  //                 margin: [0, 5, 0, 0],
  //                 columns: [
  //                   {
  //                     text: 'ตำแหน่ง',
  //                     fontSize: 16,
  //                     width: 'auto',
  //                     margin: [0, 0, 0, 0],
  //                   },
  //                   {
  //                     text: `\t\t${
  //                       this.formStaff.get('position')?.value.name_th
  //                     }\t\t`,
  //                     style: 'fz16',
  //                     decoration: 'underline',
  //                     decorationStyle: 'dotted',
  //                     width: 'auto',
  //                     margin: [40, 0, 0, 0],
  //                   },
  //                   {
  //                     text: 'สังกัด (สำนัก)',
  //                     style: 'fz16',
  //                     margin: [50, 0, 0, 0],
  //                   },
  //                 ],
  //               },

  //               {
  //                 margin: [0, 5, 0, 0],
  //                 columns: [
  //                   {
  //                     text: 'เกิดเมื่อวันที่',
  //                     fontSize: 16,
  //                     width: 'auto',
  //                     margin: [0, 0, 0, 0],
  //                   },
  //                   {
  //                     text: `\t${this.formStaff.get('birthdayme')?.value}\t`,
  //                     style: 'fz16',
  //                     decoration: 'underline',
  //                     decorationStyle: 'dotted',
  //                     width: 'auto',
  //                     margin: [15, 0, 0, 0],
  //                   },
  //                   {
  //                     text: 'ศาสนา',
  //                     style: 'fz16',
  //                     width: 'auto',
  //                     margin: [50, 0, 0, 0],
  //                   },
  //                   {
  //                     text: `\t\t${
  //                       this.formStaff.get('religion')?.value.religion
  //                     }\t\t`,
  //                     style: 'fz16',
  //                     decoration: 'underline',
  //                     decorationStyle: 'dotted',
  //                     margin: [40, 0, 0, 0],
  //                   },
  //                 ],
  //               },

  //               {
  //                 margin: [0, 5, 0, 0],
  //                 columns: [
  //                   {
  //                     text: 'เลขบัตรประตัวประชาชน',
  //                     fontSize: 16,
  //                     width: 'auto',
  //                     margin: [0, 0, 0, 0],
  //                   },
  //                   {
  //                     text: `\t\t${
  //                       this.formStaff.get('cardnumber')?.value
  //                     }\t\t`,
  //                     style: 'fz16',
  //                     decoration: 'underline',
  //                     decorationStyle: 'dotted',
  //                     width: 'auto',
  //                     margin: [40, 0, 0, 0],
  //                   },
  //                   {
  //                     text: 'หมู่โลหิต',
  //                     style: 'fz16',
  //                     width: 'auto',
  //                     margin: [50, 0, 0, 0],
  //                   },
  //                   {
  //                     text: `\t\t${
  //                       this.formStaff.get('blood')?.value.bloodgroup
  //                     }\t\t`,
  //                     style: 'fz16',
  //                     decoration: 'underline',
  //                     decorationStyle: 'dotted',
  //                     margin: [40, 0, 0, 0],
  //                   },
  //                 ],
  //               },

  //               {
  //                 margin: [0, 10, 0, 0],
  //                 columns: [
  //                   {
  //                     text: '๒. ที่พักอาศัยปัจจุบัน บ้านเลขที่',
  //                     fontSize: 16,
  //                     width: 'auto',
  //                     margin: [0, 0, 0, 0],
  //                   },
  //                   {
  //                     text: `\t${this.formStaff.get('numberhouse')?.value}\t`,
  //                     style: 'fz16',
  //                     decoration: 'underline',
  //                     decorationStyle: 'dotted',
  //                     width: 'auto',
  //                     margin: [20, 0, 0, 0],
  //                   },
  //                   {
  //                     text: 'หมู่ที่',
  //                     style: 'fz16',
  //                     width: 'auto',
  //                     margin: [30, 0, 0, 0],
  //                   },
  //                   {
  //                     text: `\t${this.formStaff.get('village')?.value}\t`,
  //                     style: 'fz16',
  //                     width: 'auto',
  //                     decoration: 'underline',
  //                     decorationStyle: 'dotted',
  //                     margin: [20, 0, 0, 0],
  //                   },
  //                   {
  //                     text: 'หมู่บ้าน',
  //                     style: 'fz16',
  //                     width: 'auto',
  //                     margin: [30, 0, 0, 0],
  //                   },
  //                   {
  //                     text: `\t${this.formStaff.get('villagename')?.value}\t`,
  //                     style: 'fz16',
  //                     decoration: 'underline',
  //                     decorationStyle: 'dotted',
  //                     margin: [20, 0, 0, 0],
  //                   },
  //                 ],
  //               },

  //               {
  //                 margin: [0, 5, 0, 0],
  //                 columns: [
  //                   {
  //                     text: 'ตรอก/ซอย',
  //                     fontSize: 16,
  //                     width: 'auto',
  //                     margin: [0, 0, 0, 0],
  //                   },
  //                   {
  //                     text: `\t${this.formStaff.get('alley')?.value}\t`,
  //                     style: 'fz16',
  //                     decoration: 'underline',
  //                     decorationStyle: 'dotted',
  //                     width: 'auto',
  //                     margin: [15, 0, 0, 0],
  //                   },
  //                   {
  //                     text: 'ถนน',
  //                     style: 'fz16',
  //                     width: 'auto',
  //                     margin: [50, 0, 0, 0],
  //                   },
  //                   {
  //                     text: `\t\t${this.formStaff.get('road')?.value}\t\t`,
  //                     style: 'fz16',
  //                     width: 'auto',
  //                     decoration: 'underline',
  //                     decorationStyle: 'dotted',
  //                     margin: [30, 0, 0, 0],
  //                   },
  //                   {
  //                     text: 'ตำบล/แขวง',
  //                     style: 'fz16',
  //                     width: 'auto',
  //                     margin: [50, 0, 0, 0],
  //                   },
  //                   {
  //                     text: `\t\t${this.formStaff.get('tambon')?.value}\t\t`,
  //                     style: 'fz16',
  //                     decoration: 'underline',
  //                     decorationStyle: 'dotted',
  //                     margin: [30, 0, 0, 0],
  //                   },
  //                 ],
  //               },

  //               {
  //                 margin: [0, 5, 0, 0],
  //                 columns: [
  //                   {
  //                     text: 'อำเภอ/เขต',
  //                     fontSize: 16,
  //                     width: 'auto',
  //                     margin: [0, 0, 0, 0],
  //                   },
  //                   {
  //                     text: `\t${this.formStaff.get('amphure')?.value}\t`,
  //                     style: 'fz16',
  //                     decoration: 'underline',
  //                     decorationStyle: 'dotted',
  //                     width: 'auto',
  //                     margin: [40, 0, 0, 0],
  //                   },
  //                   {
  //                     text: 'จังหวัด',
  //                     style: 'fz16',
  //                     width: 'auto',
  //                     margin: [50, 0, 0, 0],
  //                   },
  //                   {
  //                     text: `\t\t${this.formStaff.get('province')?.value}\t\t`,
  //                     style: 'fz16',
  //                     width: 'auto',
  //                     decoration: 'underline',
  //                     decorationStyle: 'dotted',
  //                     margin: [40, 0, 0, 0],
  //                   },
  //                   {
  //                     text: 'รหัสไปรษณีย์',
  //                     style: 'fz16',
  //                     width: 'auto',
  //                     margin: [50, 0, 0, 0],
  //                   },
  //                   {
  //                     text: `\t\t${this.formStaff.get('zipcode')?.value}\t\t`,
  //                     style: 'fz16',
  //                     decoration: 'underline',
  //                     decorationStyle: 'dotted',
  //                     margin: [40, 0, 0, 0],
  //                   },
  //                 ],
  //               },

  //               {
  //                 margin: [0, 5, 0, 0],
  //                 columns: [
  //                   {
  //                     text: 'โทรศัพท์',
  //                     fontSize: 16,
  //                     width: 'auto',
  //                     margin: [0, 0, 0, 0],
  //                   },
  //                   {
  //                     text: `\t${this.formStaff.get('telephone')?.value}\t`,
  //                     style: 'fz16',
  //                     decoration: 'underline',
  //                     decorationStyle: 'dotted',
  //                     width: 'auto',
  //                     margin: [20, 0, 0, 0],
  //                   },
  //                   {
  //                     text: 'โทรศัพท์มือถือ',
  //                     style: 'fz16',
  //                     width: 'auto',
  //                     margin: [20, 0, 0, 0],
  //                   },
  //                   {
  //                     text: `\t${
  //                       this.formStaff.get('telephonemobile')?.value
  //                     }\t`,
  //                     style: 'fz16',
  //                     width: 'auto',
  //                     decoration: 'underline',
  //                     decorationStyle: 'dotted',
  //                     margin: [20, 0, 0, 0],
  //                   },
  //                   {
  //                     text: 'E-mail',
  //                     style: 'fz16',
  //                     width: 50,
  //                     margin: [20, 0, 0, 0],
  //                   },
  //                   {
  //                     text: `\t${this.formStaff.get('emailme')?.value}\t`,
  //                     style: 'fz16',
  //                     width: 'auto',
  //                     decoration: 'underline',
  //                     decorationStyle: 'dotted',
  //                     margin: [10, 0, 0, 0],
  //                   },
  //                 ],
  //               },

  //               {
  //                 margin: [0, 10, 0, 0],
  //                 columns: [
  //                   {
  //                     text: '๓. ที่อยู่หลักครอบครัว (ตามทะเบียนบ้าน) บ้านเลขที่',
  //                     fontSize: 16,
  //                     width: 'auto',
  //                     margin: [0, 0, 0, 0],
  //                   },
  //                   {
  //                     text: `\t${this.formStaff.get('fnumberhouse')?.value}\t`,
  //                     style: 'fz16',
  //                     decoration: 'underline',
  //                     decorationStyle: 'dotted',
  //                     width: 'auto',
  //                     margin: [20, 0, 0, 0],
  //                   },
  //                   {
  //                     text: 'หมู่ที่',
  //                     style: 'fz16',
  //                     width: 'auto',
  //                     margin: [30, 0, 0, 0],
  //                   },
  //                   {
  //                     text: `\t${this.formStaff.get('fvillage')?.value}\t`,
  //                     style: 'fz16',
  //                     width: 'auto',
  //                     decoration: 'underline',
  //                     decorationStyle: 'dotted',
  //                     margin: [20, 0, 0, 0],
  //                   },
  //                   {
  //                     text: 'หมู่บ้าน',
  //                     style: 'fz16',
  //                     width: 'auto',
  //                     margin: [30, 0, 0, 0],
  //                   },
  //                   {
  //                     text: `\t${this.formStaff.get('fvillagename')?.value}\t`,
  //                     style: 'fz16',
  //                     decoration: 'underline',
  //                     decorationStyle: 'dotted',
  //                     margin: [20, 0, 0, 0],
  //                   },
  //                 ],
  //               },

  //               {
  //                 margin: [0, 5, 0, 0],
  //                 columns: [
  //                   {
  //                     text: 'ตรอก/ซอย',
  //                     fontSize: 16,
  //                     width: 'auto',
  //                     margin: [0, 0, 0, 0],
  //                   },
  //                   {
  //                     text: `\t${this.formStaff.get('falley')?.value}\t`,
  //                     style: 'fz16',
  //                     decoration: 'underline',
  //                     decorationStyle: 'dotted',
  //                     width: 'auto',
  //                     margin: [15, 0, 15, 0],
  //                   },
  //                   {
  //                     text: 'ถนน',
  //                     style: 'fz16',
  //                     width: 'auto',
  //                     margin: [0, 0, 0, 0],
  //                   },
  //                   {
  //                     text: `\t${this.formStaff.get('froad')?.value}\t`,
  //                     style: 'fz16',
  //                     width: 'auto',
  //                     decoration: 'underline',
  //                     decorationStyle: 'dotted',
  //                     margin: [15, 0, 15, 0],
  //                   },
  //                   {
  //                     text: 'ตำบล/แขวง',
  //                     style: 'fz16',
  //                     width: 'auto',
  //                     margin: [0, 0, 0, 0],
  //                   },
  //                   {
  //                     text: `\t\t${this.formStaff.get('ftambon')?.value}\t\t`,
  //                     style: 'fz16',
  //                     decoration: 'underline',
  //                     decorationStyle: 'dotted',
  //                     margin: [15, 0, 15, 0],
  //                   },
  //                 ],
  //               },

  //               {
  //                 margin: [0, 5, 0, 0],
  //                 columns: [
  //                   {
  //                     text: 'อำเภอ/เขต',
  //                     fontSize: 16,
  //                     width: 'auto',
  //                     margin: [0, 0, 0, 0],
  //                   },
  //                   {
  //                     text: `\t${this.formStaff.get('famphure')?.value}\t`,
  //                     style: 'fz16',
  //                     decoration: 'underline',
  //                     decorationStyle: 'dotted',
  //                     width: 'auto',
  //                     margin: [40, 0, 0, 0],
  //                   },
  //                   {
  //                     text: 'จังหวัด',
  //                     style: 'fz16',
  //                     width: 'auto',
  //                     margin: [50, 0, 0, 0],
  //                   },
  //                   {
  //                     text: `\t\t${this.formStaff.get('fprovince')?.value}\t\t`,
  //                     style: 'fz16',
  //                     width: 'auto',
  //                     decoration: 'underline',
  //                     decorationStyle: 'dotted',
  //                     margin: [40, 0, 0, 0],
  //                   },
  //                   {
  //                     text: 'รหัสไปรษณีย์',
  //                     style: 'fz16',
  //                     width: 'auto',
  //                     margin: [50, 0, 0, 0],
  //                   },
  //                   {
  //                     text: `\t\t${this.formStaff.get('fzipcode')?.value}\t\t`,
  //                     style: 'fz16',
  //                     decoration: 'underline',
  //                     decorationStyle: 'dotted',
  //                     margin: [40, 0, 0, 0],
  //                   },
  //                 ],
  //               },

  //               {
  //                 margin: [0, 5, 0, 0],
  //                 columns: [
  //                   {
  //                     text: 'โทรศัพท์',
  //                     fontSize: 16,
  //                     width: 'auto',
  //                     margin: [0, 0, 0, 0],
  //                   },
  //                   {
  //                     text: `\t${this.formStaff.get('ftelephone')?.value}\t`,
  //                     style: 'fz16',
  //                     decoration: 'underline',
  //                     decorationStyle: 'dotted',
  //                     width: 'auto',
  //                     margin: [20, 0, 0, 0],
  //                   },
  //                   {
  //                     text: 'โทรศัพท์มือถือ',
  //                     style: 'fz16',
  //                     width: 'auto',
  //                     margin: [20, 0, 0, 0],
  //                   },
  //                   {
  //                     text: `\t${
  //                       this.formStaff.get('ftelephonemobile')?.value
  //                     }\t`,
  //                     style: 'fz16',
  //                     width: 'auto',
  //                     decoration: 'underline',
  //                     decorationStyle: 'dotted',
  //                     margin: [20, 0, 0, 0],
  //                   },
  //                   {
  //                     text: 'E-mail',
  //                     style: 'fz16',
  //                     width: 50,
  //                     margin: [20, 0, 0, 0],
  //                   },
  //                   {
  //                     text: `${this.formStaff.get('femail')?.value}`,
  //                     style: 'fz16',
  //                     width: 'auto',
  //                     decoration: 'underline',
  //                     decorationStyle: 'dotted',
  //                     margin: [10, 0, 0, 0],
  //                   },
  //                 ],
  //               },

  //               {
  //                 margin: [0, 10, 0, 0],
  //                 columns: [
  //                   {
  //                     text: '๔. สถานภาพ',
  //                     fontSize: 16,
  //                     width: 'auto',
  //                     margin: [0, 0, 0, 0],
  //                   },
  //                   {
  //                     image: statusLifeImage,
  //                     width: 16,
  //                     margin: [10, 0, 0, 0],
  //                   },
  //                   {
  //                     text: statusLifeText,
  //                     style: 'fz16',
  //                     margin: [20, 0, 0, 0],
  //                   },
  //                 ],
  //               },

  //               {
  //                 margin: [0, 10, 0, 0],
  //                 columns: [
  //                   {
  //                     text: '๕. คู่สมรส ชื่อ',
  //                     fontSize: 16,
  //                     width: 'auto',
  //                     margin: [0, 0, 0, 0],
  //                   },
  //                   {
  //                     text: `${this.formStaff.get('spousename')?.value}`,
  //                     style: 'fz16',
  //                     decoration: 'underline',
  //                     decorationStyle: 'dotted',
  //                     width: 'auto',
  //                     margin: [10, 0, 10, 0],
  //                   },
  //                   {
  //                     text: 'นามสกุล',
  //                     style: 'fz16',
  //                     width: 'auto',
  //                     margin: [0, 0, 0, 0],
  //                   },
  //                   {
  //                     text: `${this.formStaff.get('spouselastname')?.value}`,
  //                     style: 'fz16',
  //                     width: 'auto',
  //                     decoration: 'underline',
  //                     decorationStyle: 'dotted',
  //                     margin: [10, 0, 10, 0],
  //                   },
  //                   {
  //                     text: 'สกุลเดิมก่อนสมรส (หญิง)',
  //                     style: 'fz16',
  //                     width: 'auto',
  //                     margin: [0, 0, 0, 0],
  //                   },
  //                   {
  //                     text: `${this.formStaff.get('spouseoldlastname')?.value}`,
  //                     style: 'fz16',
  //                     decoration: 'underline',
  //                     decorationStyle: 'dotted',
  //                     margin: [10, 0, 10, 0],
  //                   },
  //                 ],
  //               },

  //               {
  //                 margin: [0, 5, 0, 0],
  //                 columns: [
  //                   {
  //                     text: 'อายุ',
  //                     fontSize: 16,
  //                     width: 'auto',
  //                     margin: [0, 0, 0, 0],
  //                   },
  //                   {
  //                     text: `\t${this.formStaff.get('spouseage')?.value}\t`,
  //                     style: 'fz16',
  //                     decoration: 'underline',
  //                     decorationStyle: 'dotted',
  //                     width: 'auto',
  //                     margin: [15, 0, 15, 0],
  //                   },
  //                   {
  //                     text: 'ปี',
  //                     style: 'fz16',
  //                     width: 'auto',
  //                     margin: [0, 0, 0, 0],
  //                   },
  //                   {
  //                     text: 'ศาสนา',
  //                     style: 'fz16',
  //                     width: 'auto',
  //                     margin: [15, 0, 0, 0],
  //                   },
  //                   {
  //                     text: `\t${
  //                       this.formStaff.get('spousereligion')?.value.religion
  //                     }\t`,
  //                     style: 'fz16',
  //                     decoration: 'underline',
  //                     decorationStyle: 'dotted',
  //                     width: 'auto',
  //                     margin: [15, 0, 15, 0],
  //                   },
  //                   {
  //                     text: `อาชีพ`,
  //                     style: 'fz16',
  //                     width: 'auto',
  //                     margin: [15, 0, 0, 0],
  //                   },
  //                   {
  //                     text: `\t${
  //                       this.formStaff.get('spouseoccupation')?.value
  //                     }\t`,
  //                     style: 'fz16',
  //                     width: 'auto',
  //                     decoration: 'underline',
  //                     decorationStyle: 'dotted',
  //                     margin: [15, 0, 15, 0],
  //                   },
  //                   {
  //                     text: 'โทรศัพท์',
  //                     style: 'fz16',
  //                     width: 'auto',
  //                     margin: [15, 0, 0, 0],
  //                   },
  //                   {
  //                     text: `\t${
  //                       this.formStaff.get('spousetelephone')?.value
  //                     }\t`,
  //                     style: 'fz16',
  //                     width: 'auto',
  //                     decoration: 'underline',
  //                     decorationStyle: 'dotted',
  //                     margin: [15, 0, 0, 0],
  //                   },
  //                 ],
  //               },

  //               {
  //                 margin: [0, 5, 0, 0],
  //                 columns: [
  //                   {
  //                     text: 'สถานที่ทำงาน',
  //                     width: 'auto',
  //                     style: 'fz16',
  //                     margin: [0, 0, 0, 0],
  //                   },
  //                   {
  //                     text: `\t${
  //                       this.formStaff.get('spouseoccupationwork')?.value
  //                     }\t`,
  //                     style: 'fz16',
  //                     width: 'auto',
  //                     decoration: 'underline',
  //                     decorationStyle: 'dotted',
  //                     margin: [15, 0, 0, 0],
  //                   },
  //                   {
  //                     text: 'จังหวัด',
  //                     style: 'fz16',
  //                     width: 'auto',
  //                     margin: [15, 0, 0, 0],
  //                   },
  //                   {
  //                     text: `\t${
  //                       this.formStaff.get('spouseworkprovince')?.value
  //                     }\t`,
  //                     decoration: 'underline',
  //                     decorationStyle: 'dotted',
  //                     style: 'fz16',
  //                     margin: [15, 0, 0, 0],
  //                   },
  //                 ],
  //               },
  //             ],
  //           },
  //         ],
  //       },

  //       {
  //         margin: [20, 0, 0, 0],
  //         columns: [
  //           {
  //             stack: [
  //               {
  //                 margin: [0, 5, 0, 0],
  //                 columns: [
  //                   {
  //                     text: '๖. ชื่อบิดา',
  //                     style: 'fz16',
  //                     width: 'auto',
  //                   },
  //                   {
  //                     text: `\t\t${
  //                       this.formStaff.get('fathername')?.value
  //                     }\t\t`,
  //                     decoration: 'underline',
  //                     decorationStyle: 'dotted',
  //                     width: 'auto',
  //                     style: 'fz16',
  //                     margin: [30, 0, 30, 0],
  //                   },
  //                   {
  //                     text: 'นามสกุลบิดา',
  //                     style: 'fz16',
  //                     width: 'auto',
  //                   },
  //                   {
  //                     text: `\t\t${
  //                       this.formStaff.get('fatherlastname')?.value
  //                     }\t\t`,
  //                     decoration: 'underline',
  //                     decorationStyle: 'dotted',
  //                     width: 'auto',
  //                     style: 'fz16',
  //                     margin: [30, 0, 30, 0],
  //                   },
  //                   {
  //                     text: 'ศาสนา',
  //                     style: 'fz16',
  //                     width: 'auto',
  //                   },
  //                   {
  //                     text: `\t\t${
  //                       this.formStaff.get('fatherreligion')?.value.religion
  //                     }\t\t`,
  //                     decoration: 'underline',
  //                     decorationStyle: 'dotted',
  //                     style: 'fz16',
  //                     margin: [30, 0, 30, 0],
  //                   },
  //                 ],
  //               },

  //               {
  //                 margin: [0, 5, 0, 0],
  //                 columns: [
  //                   {
  //                     text: 'เกิดเมื่อวันที่',
  //                     style: 'fz16',
  //                     width: 'auto',
  //                   },
  //                   {
  //                     text: `\t\t${
  //                       this.formStaff.get('fatherbirthday')?.value
  //                     }\t\t`,
  //                     decoration: 'underline',
  //                     decorationStyle: 'dotted',
  //                     width: 'auto',
  //                     style: 'fz16',
  //                     margin: [30, 0, 30, 0],
  //                   },
  //                   {
  //                     text: 'อายุ',
  //                     style: 'fz16',
  //                     width: 'auto',
  //                   },
  //                   {
  //                     text: `\t${this.formStaff.get('fatherage')?.value}\t`,
  //                     decoration: 'underline',
  //                     decorationStyle: 'dotted',
  //                     width: 'auto',
  //                     style: 'fz16',
  //                     margin: [30, 0, 30, 0],
  //                   },
  //                   {
  //                     text: 'ปี',
  //                     style: 'fz16',
  //                   },
  //                 ],
  //               },

  //               {
  //                 margin: [0, 5, 0, 0],
  //                 columns: [
  //                   {
  //                     text: 'สถานที่พักอาศัย บ้านเลขที่',
  //                     style: 'fz16',
  //                     width: 'auto',
  //                   },
  //                   {
  //                     text: `\t\t${
  //                       this.formStaff.get('fathernumberhouse')?.value
  //                     }\t\t`,
  //                     decoration: 'underline',
  //                     decorationStyle: 'dotted',
  //                     width: 'auto',
  //                     style: 'fz16',
  //                     margin: [30, 0, 30, 0],
  //                   },
  //                   {
  //                     text: 'หมู่ที่',
  //                     style: 'fz16',
  //                     width: 'auto',
  //                   },
  //                   {
  //                     text: `\t${this.formStaff.get('fathervillage')?.value}\t`,
  //                     decoration: 'underline',
  //                     decorationStyle: 'dotted',
  //                     width: 'auto',
  //                     style: 'fz16',
  //                     margin: [30, 0, 30, 0],
  //                   },
  //                   {
  //                     text: 'หมู่บ้าน',
  //                     style: 'fz16',
  //                     width: 'auto',
  //                   },
  //                   {
  //                     text: `\t${
  //                       this.formStaff.get('fathervillagename')?.value
  //                     }\t`,
  //                     decoration: 'underline',
  //                     decorationStyle: 'dotted',
  //                     width: 'auto',
  //                     style: 'fz16',
  //                     margin: [30, 0, 30, 0],
  //                   },
  //                 ],
  //               },

  //               {
  //                 margin: [0, 5, 0, 0],
  //                 columns: [
  //                   {
  //                     text: 'ตรอก/ซอย',
  //                     style: 'fz16',
  //                     width: 'auto',
  //                   },
  //                   {
  //                     text: `\t${this.formStaff.get('fatheralley')?.value}\t`,
  //                     decoration: 'underline',
  //                     decorationStyle: 'dotted',
  //                     width: 'auto',
  //                     style: 'fz16',
  //                     margin: [15, 0, 15, 0],
  //                   },
  //                   {
  //                     text: 'ถนน',
  //                     style: 'fz16',
  //                     width: 'auto',
  //                   },
  //                   {
  //                     text: `\t${this.formStaff.get('fatherroad')?.value}\t`,
  //                     decoration: 'underline',
  //                     decorationStyle: 'dotted',
  //                     width: 'auto',
  //                     style: 'fz16',
  //                     margin: [15, 0, 15, 0],
  //                   },
  //                   {
  //                     text: 'ตำบล/แขวง',
  //                     style: 'fz16',
  //                     width: 'auto',
  //                   },
  //                   {
  //                     text: `\t${this.formStaff.get('fathertambon')?.value}\t`,
  //                     decoration: 'underline',
  //                     decorationStyle: 'dotted',
  //                     width: 'auto',
  //                     style: 'fz16',
  //                     margin: [15, 0, 15, 0],
  //                   },
  //                   {
  //                     text: 'อำเภอ/เขต',
  //                     style: 'fz16',
  //                     width: 'auto',
  //                   },
  //                   {
  //                     text: `\t${this.formStaff.get('fatheramphure')?.value}\t`,
  //                     decoration: 'underline',
  //                     decorationStyle: 'dotted',
  //                     width: 'auto',
  //                     style: 'fz16',
  //                     margin: [15, 0, 15, 0],
  //                   },
  //                 ],
  //               },

  //               {
  //                 margin: [0, 5, 0, 0],
  //                 columns: [
  //                   {
  //                     text: 'จังหวัด',
  //                     style: 'fz16',
  //                     width: 'auto',
  //                   },
  //                   {
  //                     text: `\t${
  //                       this.formStaff.get('fatherprovince')?.value
  //                     }\t`,
  //                     decoration: 'underline',
  //                     decorationStyle: 'dotted',
  //                     width: 'auto',
  //                     style: 'fz16',
  //                     margin: [15, 0, 15, 0],
  //                   },
  //                   {
  //                     text: 'รหัสไปรษณีย์',
  //                     style: 'fz16',
  //                     width: 'auto',
  //                   },
  //                   {
  //                     text: `\t${this.formStaff.get('fatherzipcode')?.value}\t`,
  //                     decoration: 'underline',
  //                     decorationStyle: 'dotted',
  //                     width: 'auto',
  //                     style: 'fz16',
  //                     margin: [15, 0, 15, 0],
  //                   },
  //                   {
  //                     text: 'โทรศัพท์',
  //                     style: 'fz16',
  //                     width: 'auto',
  //                   },
  //                   {
  //                     text: `\t${
  //                       this.formStaff.get('fathertelephone')?.value
  //                     }\t`,
  //                     decoration: 'underline',
  //                     decorationStyle: 'dotted',
  //                     width: 'auto',
  //                     style: 'fz16',
  //                     margin: [15, 0, 15, 0],
  //                   },
  //                   {
  //                     text: 'โทรศัพท์มือถือ',
  //                     style: 'fz16',
  //                     width: 'auto',
  //                   },
  //                   {
  //                     text: `\t${
  //                       this.formStaff.get('fathertelephonemobile')?.value
  //                     }\t`,
  //                     decoration: 'underline',
  //                     decorationStyle: 'dotted',
  //                     width: 'auto',
  //                     style: 'fz16',
  //                     margin: [15, 0, 15, 0],
  //                   },
  //                 ],
  //               },

  //               {
  //                 margin: [0, 5, 0, 0],
  //                 columns: [
  //                   {
  //                     text: '๗. ชื่อมารดา',
  //                     style: 'fz16',
  //                     width: 'auto',
  //                   },
  //                   {
  //                     text: `\t\t${
  //                       this.formStaff.get('mothername')?.value
  //                     }\t\t`,
  //                     decoration: 'underline',
  //                     decorationStyle: 'dotted',
  //                     width: 'auto',
  //                     style: 'fz16',
  //                     margin: [30, 0, 30, 0],
  //                   },
  //                   {
  //                     text: 'นามสกุลมารดา',
  //                     style: 'fz16',
  //                     width: 'auto',
  //                   },
  //                   {
  //                     text: `\t\t${
  //                       this.formStaff.get('motherlastname')?.value
  //                     }\t\t`,
  //                     decoration: 'underline',
  //                     decorationStyle: 'dotted',
  //                     width: 'auto',
  //                     style: 'fz16',
  //                     margin: [30, 0, 30, 0],
  //                   },
  //                   {
  //                     text: 'ศาสนา',
  //                     style: 'fz16',
  //                     width: 'auto',
  //                   },
  //                   {
  //                     text: `\t\t${
  //                       this.formStaff.get('motherreligion')?.value.religion
  //                     }\t\t`,
  //                     decoration: 'underline',
  //                     decorationStyle: 'dotted',
  //                     style: 'fz16',
  //                     margin: [30, 0, 30, 0],
  //                   },
  //                 ],
  //               },

  //               {
  //                 margin: [0, 5, 0, 0],
  //                 columns: [
  //                   {
  //                     text: 'เกิดเมื่อวันที่',
  //                     style: 'fz16',
  //                     width: 'auto',
  //                   },
  //                   {
  //                     text: `\t\t${
  //                       this.formStaff.get('motherbirthday')?.value
  //                     }\t\t`,
  //                     decoration: 'underline',
  //                     decorationStyle: 'dotted',
  //                     width: 'auto',
  //                     style: 'fz16',
  //                     margin: [30, 0, 30, 0],
  //                   },
  //                   {
  //                     text: 'อายุ',
  //                     style: 'fz16',
  //                     width: 'auto',
  //                   },
  //                   {
  //                     text: `\t\t${this.formStaff.get('motherage')?.value}\t\t`,
  //                     decoration: 'underline',
  //                     decorationStyle: 'dotted',
  //                     width: 'auto',
  //                     style: 'fz16',
  //                     margin: [30, 0, 30, 0],
  //                   },
  //                   {
  //                     text: 'ปี',
  //                     style: 'fz16',
  //                   },
  //                 ],
  //               },

  //               {
  //                 margin: [0, 5, 0, 0],
  //                 columns: [
  //                   {
  //                     text: 'สถานที่พักอาศัย บ้านเลขที่',
  //                     style: 'fz16',
  //                     width: 'auto',
  //                   },
  //                   {
  //                     text: `\t\t${
  //                       this.formStaff.get('mothernumberhouse')?.value
  //                     }\t\t`,
  //                     decoration: 'underline',
  //                     decorationStyle: 'dotted',
  //                     width: 'auto',
  //                     style: 'fz16',
  //                     margin: [30, 0, 30, 0],
  //                   },
  //                   {
  //                     text: 'หมู่ที่',
  //                     style: 'fz16',
  //                     width: 'auto',
  //                   },
  //                   {
  //                     text: `\t\t${
  //                       this.formStaff.get('mothervillage')?.value
  //                     }\t\t`,
  //                     decoration: 'underline',
  //                     decorationStyle: 'dotted',
  //                     width: 'auto',
  //                     style: 'fz16',
  //                     margin: [30, 0, 30, 0],
  //                   },
  //                   {
  //                     text: 'หมู่บ้าน',
  //                     style: 'fz16',
  //                     width: 'auto',
  //                   },
  //                   {
  //                     text: `\t${
  //                       this.formStaff.get('mothervillagename')?.value
  //                     }\t`,
  //                     decoration: 'underline',
  //                     decorationStyle: 'dotted',
  //                     width: 'auto',
  //                     style: 'fz16',
  //                     margin: [30, 0, 30, 0],
  //                   },
  //                 ],
  //               },

  //               {
  //                 margin: [0, 5, 0, 0],
  //                 columns: [
  //                   {
  //                     text: 'ตรอก/ซอย',
  //                     style: 'fz16',
  //                     width: 'auto',
  //                   },
  //                   {
  //                     text: `\t${this.formStaff.get('motheralley')?.value}\t`,
  //                     decoration: 'underline',
  //                     decorationStyle: 'dotted',
  //                     width: 'auto',
  //                     style: 'fz16',
  //                     margin: [30, 0, 30, 0],
  //                   },
  //                   {
  //                     text: 'ถนน',
  //                     style: 'fz16',
  //                     width: 'auto',
  //                   },
  //                   {
  //                     text: `\t${this.formStaff.get('motherroad')?.value}\t`,
  //                     decoration: 'underline',
  //                     decorationStyle: 'dotted',
  //                     width: 'auto',
  //                     style: 'fz16',
  //                     margin: [30, 0, 30, 0],
  //                   },
  //                   {
  //                     text: 'ตำบล/แขวง',
  //                     style: 'fz16',
  //                     width: 'auto',
  //                   },
  //                   {
  //                     text: `\t${this.formStaff.get('mothertambon')?.value}\t`,
  //                     decoration: 'underline',
  //                     decorationStyle: 'dotted',
  //                     width: 'auto',
  //                     style: 'fz16',
  //                     margin: [30, 0, 30, 0],
  //                   },
  //                   {
  //                     text: 'อำเภอ/เขต',
  //                     style: 'fz16',
  //                     width: 'auto',
  //                   },
  //                   {
  //                     text: `\t${this.formStaff.get('motheramphure')?.value}\t`,
  //                     decoration: 'underline',
  //                     decorationStyle: 'dotted',
  //                     width: 'auto',
  //                     style: 'fz16',
  //                     margin: [30, 0, 30, 0],
  //                   },
  //                 ],
  //               },

  //               {
  //                 margin: [0, 5, 0, 0],
  //                 columns: [
  //                   {
  //                     text: 'จังหวัด',
  //                     style: 'fz16',
  //                     width: 'auto',
  //                   },
  //                   {
  //                     text: `\t${
  //                       this.formStaff.get('motherprovince')?.value
  //                     }\t`,
  //                     decoration: 'underline',
  //                     decorationStyle: 'dotted',
  //                     width: 'auto',
  //                     style: 'fz16',
  //                     margin: [15, 0, 15, 0],
  //                   },
  //                   {
  //                     text: 'รหัสไปรษณีย์',
  //                     style: 'fz16',
  //                     width: 'auto',
  //                   },
  //                   {
  //                     text: `\t${this.formStaff.get('motherzipcode')?.value}\t`,
  //                     decoration: 'underline',
  //                     decorationStyle: 'dotted',
  //                     width: 'auto',
  //                     style: 'fz16',
  //                     margin: [15, 0, 15, 0],
  //                   },
  //                   {
  //                     text: 'โทรศัพท์',
  //                     style: 'fz16',
  //                     width: 'auto',
  //                   },
  //                   {
  //                     text: `\t${
  //                       this.formStaff.get('mothertelephone')?.value
  //                     }\t`,
  //                     decoration: 'underline',
  //                     decorationStyle: 'dotted',
  //                     width: 'auto',
  //                     style: 'fz16',
  //                     margin: [15, 0, 15, 0],
  //                   },
  //                   {
  //                     text: 'โทรศัพท์มือถือ',
  //                     style: 'fz16',
  //                     width: 'auto',
  //                   },
  //                   {
  //                     text: `\t${
  //                       this.formStaff.get('mothertelephonemobile')?.value
  //                     }\t`,
  //                     decoration: 'underline',
  //                     decorationStyle: 'dotted',
  //                     width: 'auto',
  //                     style: 'fz16',
  //                     margin: [15, 0, 15, 0],
  //                   },
  //                 ],
  //               },

  //               {
  //                 alignment: 'right',
  //                 margin: [0, 10, 0, 0],
  //                 columns: [
  //                   {
  //                     image: imgData,
  //                     fit: [500, 100],
  //                   },
  //                 ],
  //               },

  //               {
  //                 alignment: 'right',
  //                 margin: [0, 0, 70, 0],
  //                 columns: [
  //                   {
  //                     text: `(${this.formStaff.get('prefixth')?.value.name_th}${
  //                       this.formStaff.get('firstnameth')?.value
  //                     }\t${this.formStaff.get('lastnameth')?.value})`,
  //                     style: 'fz16',
  //                   },
  //                 ],
  //               },

  //               {
  //                 margin: [306, 0, 0, 0],
  //                 columns: [
  //                   {
  //                     text: 'วันที่',
  //                     width: 'auto',
  //                     style: 'fz16',
  //                   },
  //                   {
  //                     text: `${this.formStaff.get('datelaisen')?.value}`,
  //                     width: 'auto',
  //                     style: 'fz16',
  //                     decoration: 'underline',
  //                     decorationStyle: 'dotted',
  //                     margin: [0, 0, 3, 0],
  //                   },
  //                   {
  //                     text: 'เดือน',
  //                     width: 'auto',
  //                     style: 'fz16',
  //                   },
  //                   {
  //                     text: `${this.formStaff.get('monthlaisen')?.value}`,
  //                     width: 'auto',
  //                     style: 'fz16',
  //                     decoration: 'underline',
  //                     decorationStyle: 'dotted',
  //                     margin: [0, 0, 3, 0],
  //                   },
  //                   {
  //                     text: 'พ.ศ.',
  //                     width: 'auto',
  //                     style: 'fz16',
  //                   },
  //                   {
  //                     text: `${this.formStaff.get('yearlaisen')?.value}`,
  //                     style: 'fz16',
  //                     width: 'auto',
  //                     decoration: 'underline',
  //                     decorationStyle: 'dotted',
  //                   },
  //                 ],
  //               },
  //             ],
  //           },
  //         ],
  //         pageBreak: 'before',
  //       },
  //     ],
  //     defaultStyle: {
  //       font: 'THSarabunNew', // Assign a style object here
  //     },
  //     styles: {
  //       fz18: {
  //         fontSize: 18,
  //       },
  //       fz16: {
  //         fontSize: 16,
  //       },
  //     },
  //   };

  //   pdfMake.createPdf(pdfDefinition).open();
  // }

  @ViewChild('signPadCanvas', { static: false }) signaturePadElement: any;
  signPad: any;
  signPadImage: any;

  ngAfterViewInit() {
    this.signPad = new SignaturePad(this.signaturePadElement.nativeElement);
  }

  visibleSignImage: boolean = false;
  visibleSignaturePad: boolean = false;
  showDialogSignaturePad() {
    this.visibleSignaturePad = true;
  }

  clearSignPad() {
    this.signPad.clear();
  }

  visibleButtonDialogSignPad: boolean = true;
  saveSignPad() {
    const base64ImageData = this.signPad.toDataURL();
    this.signPadImage = base64ImageData;
    this.visibleButtonDialogSignPad = false;
    this.visibleSignaturePad = false;
    this.visibleSignImage = true;
  }

  dialogDocument: boolean = false;
}

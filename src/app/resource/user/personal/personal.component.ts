import { Component, OnInit } from '@angular/core';
import { User } from '../../../modules/user';
import { UserService } from '../../../services/user/user.service';
import { jwtDecode } from 'jwt-decode';
import { ThaidataService } from '../../../services/thia-data/thaidata.service';
import { log } from 'console';

// interface AutoCompleteCompleteEvent {
//   originalEvent: Event;
//   query: string;
// }

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
  // selectedCountry: any;
  // filteredCountries: any[] = []

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
      console.log(
        this.thaiData.map(
          (data: { province_nameth: any }) => data.province_nameth
        )
      );
    });
  }

  showEditAddress() {
    this.visible = true;
  }

  selectedCity: string | undefined;
  cities: string[] = [];
  filteredCities: string[] = [];
  filterCities(event: any) {
    let query = event.query;
    for (let i = 0; i < this.thaiData.length; i++) {
      let country = this.thaiData[i];
      let name = country.province_nameth.toLowerCase();
      if (name.indexOf(query.toLowerCase()) === 0) {
        query.add(name);
      }
    }
    this.filteredCities = Array.from(query);
  }
  //   filterCountry(event: AutoCompleteCompleteEvent) {
  //     let uniqueNames = new Set<string>();
  //     let query = event.query;

  //     for (let i = 0; i < this.thaiData.length; i++) {
  //         let country = this.thaiData[i];
  //         let name = country.province_nameth.toLowerCase();
  //         if (name.indexOf(query.toLowerCase()) === 0) {
  //             uniqueNames.add(name);
  //         }
  //     }

  //     this.filteredCountries = Array.from(uniqueNames);
  // }
}

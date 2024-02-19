import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private _activatedRoute: ActivatedRoute,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this._activatedRoute.queryParams.subscribe((params) => {
      if (params['loggedIn'] === 'success') {
        setTimeout(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: "ยินดีต้อนรับเข้าสู่ระบบ",
          });
          this.router.navigate(['/home']);
        }, 100); // 5000 milliseconds = 5 seconds
      }
    });
  }

}

import { Book } from './../../modules/book';
import { User } from '../../modules/user';
import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { BookService } from '../../services/book/book.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  dataUser: any = {}
  dataBook: Book[] = []
  constructor(
    private router: Router,
    private _activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private userService: UserService,
    private bookService: BookService
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

    this.bookService.getAllBooks().subscribe(
      (res: Book[]) => {
        this.dataBook = res
      },
      (err) => {
        console.log("error dataBooks", err);
      }
    )
  }

}

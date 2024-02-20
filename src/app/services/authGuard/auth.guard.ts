import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _authService: AuthService , private router: Router) {}

  canActivate(): boolean {
    if (this._authService.loggedIn()) {
      return true; // อนุญาตให้เข้าถึงหน้า
    } else {
      this.router.navigate(['/login']); // ไม่อนุญาตให้เข้าถึงหน้าและเปลี่ยนเส้นทางไปยังหน้า login
      console.log("ไม่สามารถเข้าสู่ระบบได้");

      return false;
    }
  }
}

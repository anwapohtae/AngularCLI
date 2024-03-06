import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './resource/auth/login/login.component';
import { RegisterComponent } from './resource/auth/register/register.component';
import { HomeComponent } from './resource/home/home.component';
import { AuthGuard } from './services/authGuard/auth.guard';
import { EdituserComponent } from './resource/user/edituser/edituser.component';
import { PersonalComponent } from './resource/user/personal/personal.component';
import { StaffComponent } from './resource/staff/staff/staff.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // ให้เริ่มต้นที่หน้า "/login"
  { path: 'login', component: LoginComponent, },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'personal-info', component: PersonalComponent, canActivate: [AuthGuard] },
  { path: 'staff', component: StaffComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login' } // หน้าอื่นๆที่ไม่ถูกต้องจะเปลี่ยนเส้นทางไปยังหน้า login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

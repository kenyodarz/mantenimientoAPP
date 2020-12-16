/* Angular */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
/* Guards */
import { LoginGuard } from './guards/login.guard';
/* Components */
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  { path: 'home', component: , canActivate: [LoginGuard] },
  { path: 'login', component: LoginComponent },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'home',
    canActivate: [LoginGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

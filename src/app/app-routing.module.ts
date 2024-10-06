import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullComponent } from './layouts/full/full.component';
import { EspaciosListComponent } from './espacios/list/list.component';
import { CreateComponent } from './espacios/create/create.component';
import { MisReservasComponent } from './reservas/mis-reservas/mis-reservas.component';
import { DetailsComponent } from './espacios/details/details.component';
import { ReservaFormComponent } from './reservas/reserva-form/reserva-form.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  {
    path: "",
    component: FullComponent,
    children: [
      { path: "", redirectTo: "/home", pathMatch: "full" },
      { path: "home", component: EspaciosListComponent, canActivate: [AuthGuard] },
      { path: "espacios/list", component: EspaciosListComponent, canActivate: [AuthGuard] },
      { path: "espacios/create", component: CreateComponent, canActivate: [AuthGuard] },
      { path: "espacios/edit/:id", component: CreateComponent, canActivate: [AuthGuard] },
      { path: "espacios/details/:id", component: DetailsComponent, canActivate: [AuthGuard] },
      { path: "reservas/mis-reservas", component: MisReservasComponent, canActivate: [AuthGuard] },
      { path: "reservas/mis-reservas/create", component: ReservaFormComponent, canActivate: [AuthGuard] },
    ]
  },
  { path: "login", component: LoginComponent },
  { path: "signin-v2", component: LoginComponent },
  { path: "**", redirectTo: "/login", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

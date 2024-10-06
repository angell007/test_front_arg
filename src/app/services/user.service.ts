import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interface/login-form.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
    private router: Router) { }

  login(formData: LoginForm) {
    return this.http.post(`${base_url}/login`, formData)
      .pipe(
        tap((resp: any) => {
          console.log(resp);
          console.log(resp.token);
          localStorage.setItem('token', resp.token);
        })
      );
  }

  getUserPermissions(): boolean {
    const permissions = localStorage.getItem('permissions');
    return permissions == '1';
  }

  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${base_url}/renew`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).pipe(
      map((resp: any) => {
        localStorage.setItem('token', resp.token);
        localStorage.setItem('permissions', resp.user.is_admin);
        return true;
      }),
      catchError(error => of(false))
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/auth/login');
  }
}
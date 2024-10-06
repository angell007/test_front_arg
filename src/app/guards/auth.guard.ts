import { Injectable } from "@angular/core";
import { CanActivate, CanLoad, Router } from "@angular/router";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { UserService } from "../services/user.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

    constructor(private userService: UserService,
                private router: Router) { }

    canLoad(): Observable<boolean> {
        return this.checkAuth();
    }

    canActivate(): Observable<boolean> {
        return this.checkAuth();
    }

    private checkAuth(): Observable<boolean> {
        return this.userService.validarToken()
            .pipe(
                tap(estaAutenticado => {
                    if (!estaAutenticado) {
                        this.router.navigateByUrl('/auth/login');
                    }
                })
            );
    }
}
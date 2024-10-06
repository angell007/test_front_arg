import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ConfirmMessageService } from 'src/app/utils/confirmMessage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  year: number = new Date().getFullYear();
  hidePassword: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private confirmMessageService: ConfirmMessageService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      user: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      remember: [false]
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.userService.login(this.loginForm.value)
      .subscribe(
        (resp) => {
          if (this.loginForm.get('remember')?.value) {
            localStorage.setItem('user', this.loginForm.get('user')?.value);
          } else {
            localStorage.removeItem('user');
          }
          this.router.navigateByUrl('/');
        },
        (err) => {
          console.error('Error de inicio de sesión:', err);
          this.confirmMessageService.errorMessage('Error de inicio de sesión', 'Credenciales inválidas. Por favor, inténtelo de nuevo.');
        }
      );
  }
}

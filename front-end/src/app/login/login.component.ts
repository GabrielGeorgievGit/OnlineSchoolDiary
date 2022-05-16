import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { LoginService } from '../Services/login.service';
import { Size } from '../shared/const/Size';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public static loggedUser: User | undefined;
  loginForm: FormGroup;
  hidePassword = true;
  constructor(
    private readonly formBuild: FormBuilder,
    private readonly login: LoginService,
    private readonly router: Router
  ) {
    this.loginForm = this.formBuild.group({
      email: this.formBuild.control('', [
        Validators.required,
        Validators.minLength(Size.EMAIL_MIN_LENGTH),
        Validators.maxLength(Size.EMAIL_MAX_LENGTH),
      ]),
      password: this.formBuild.control('', [
        Validators.required,
        Validators.minLength(Size.PASSWORD_MIN_LENGTH),
        Validators.maxLength(Size.PASSWORD_MAX_LENGTH),
      ]),
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    this.login
      .logIn({
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value,
      })
      .subscribe({
        next: (response) => {
          if (response === undefined) {
            console.log('ERRORRRRR' + { response });
            return;
          }
          this.login.getUser().subscribe({
            next: (resp) => {
              console.log(
                'in get User: ' +
                  resp.role +
                  ' ' +
                  resp.schoolId +
                  ' ' +
                  resp.name
              );
              LoginComponent.loggedUser = resp;
              if (LoginComponent.loggedUser !== undefined) {
                if (LoginComponent.loggedUser.role === 'admin') {
                  if (
                    LoginComponent.loggedUser.schoolId === undefined ||
                    LoginComponent.loggedUser.schoolId === null
                  ) {
                    this.router.navigate(['/school-admin']);
                  } else this.router.navigate(['/school-admin/school/edit']);
                }
              }
            },
            error: (resp) => {
              console.log('in error2');
              console.log(resp);
            },
          });
        },
        error: (response) => {
          console.log('in error1');
          console.log(response);
          //invalid user
        },
      });
  }
}

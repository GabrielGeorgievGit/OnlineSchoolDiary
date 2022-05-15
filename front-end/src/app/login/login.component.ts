import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    private readonly login: LoginService
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
    console.log({
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
    });
    this.login
      .logIn({
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value,
      })
      .subscribe({
        next: (response) => {
          console.log(response);
          this.login.getUser().subscribe({
            next: (resp) => {
              LoginComponent.loggedUser = resp;
            },
            error: (resp) => {},
          });
        },
        error: (response) => {
          console.log(response);
        },
      });
    console.log(LoginComponent.loggedUser);
  }
}

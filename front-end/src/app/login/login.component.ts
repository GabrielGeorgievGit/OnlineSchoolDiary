import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Size } from '../shared/const/Size';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hidePassword = true;
  constructor(private readonly formBuild: FormBuilder) {
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

  onSubmit() {}
}

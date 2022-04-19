import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
      username: this.formBuild.control('', [
        Validators.required,
        Validators.maxLength(30),
      ]),
      password: this.formBuild.control('', [
        Validators.required,
        Validators.maxLength(30),
      ]),
    });
  }

  ngOnInit(): void {}

  onSubmit() {}
}

import { Component, OnInit } from '@angular/core';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  username = LoginComponent.loggedUser?.name;
  title = 'Online-School-Diary';
  public static serverUrl: string = 'http://localhost:5207';
  constructor() {
    this.username = LoginComponent.loggedUser?.name;
  }
  ngOnInit(): void {
    this.username = LoginComponent.loggedUser?.name;
  }
}

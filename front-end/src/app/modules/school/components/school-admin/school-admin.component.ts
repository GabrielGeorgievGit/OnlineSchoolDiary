import { Component, Input, OnInit } from '@angular/core';
import { School } from 'src/app/models/School';

@Component({
  selector: 'app-school-admin',
  templateUrl: './school-admin.component.html',
  styleUrls: ['./school-admin.component.css'],
})
export class SchoolAdminComponent implements OnInit {
  hasSchool = false;

  constructor() {}

  ngOnInit(): void {}
}

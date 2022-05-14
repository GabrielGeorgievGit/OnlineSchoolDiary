import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-school-admin',
  templateUrl: './school-admin.component.html',
  styleUrls: ['./school-admin.component.css'],
})
export class SchoolAdminComponent implements OnInit {
  hasSchool = false;

  constructor(private readonly router: Router) {}

  ngOnInit(): void {}

  registerSchool() {
    this.router.navigate(['school-admin/school/register']);
  }
}

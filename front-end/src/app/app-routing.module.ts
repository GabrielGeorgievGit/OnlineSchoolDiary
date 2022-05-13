import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { EditTeacherComponent } from './modules/school/components/teacher/edit-teacher/edit-teacher.component';
import { EditComponent } from './modules/school/components/school/edit/edit.component';
import { RegisterComponent } from './modules/school/components/school/register/register.component';
import { SchoolAdminComponent } from './modules/school/components/school-admin/school-admin.component';
import { ShowTeachersComponent } from './modules/school/components/teacher/show-teachers/show-teachers.component';
import { TeachersComponent } from './modules/school/components/teacher/teachers/teachers.component';
import { ViewComponent } from './modules/school/components/term/view/view.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'school-admin',
    component: SchoolAdminComponent,
  },
  {
    path: 'school/register',
    component: RegisterComponent,
  },
  {
    path: 'school/edit',
    component: EditComponent,
  },
  {
    path: 'school/edit/teachers/new',
    component: TeachersComponent,
  },
  {
    path: 'school/edit/teachers',
    component: ShowTeachersComponent,
  },
  {
    path: 'school/edit/teachers/edit',
    component: EditTeacherComponent,
  },
  {
    path: 'school/edit/classes',
    component: ViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

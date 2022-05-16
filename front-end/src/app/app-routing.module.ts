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
import { ViewComponent } from './modules/school/components/class/view/view.component';
import { EditGradeComponent } from './modules/school/components/class/edit-grade/edit-grade.component';
import { SubjectsComponent } from './modules/school/components/class/subjects/subjects.component';
import { ChangeTeacherComponent } from './modules/school/components/class/change-teacher/change-teacher.component';

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
    path: 'school-admin/school/register',
    component: RegisterComponent,
  },
  {
    path: 'school-admin/school/edit',
    component: EditComponent,
  },
  {
    path: 'school-admin/school/teachers',
    component: ShowTeachersComponent,
  },
  {
    path: 'school-admin/school/teachers/new',
    component: TeachersComponent,
  },
  {
    path: 'school-admin/school/teachers/edit',
    component: EditTeacherComponent,
  },
  {
    path: 'school-admin/school/classes',
    component: ViewComponent,
  },
  {
    path: 'school-admin/school/grade',
    component: EditGradeComponent,
  },
  {
    path: 'school-admin/school/grade/subjects',
    component: SubjectsComponent,
  },
  {
    path: 'school-admin/school/grade/teacher',
    component: ChangeTeacherComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

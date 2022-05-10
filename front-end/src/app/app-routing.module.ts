import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { EditComponent } from './modules/school/components/edit/edit.component';
import { RegisterComponent } from './modules/school/components/register/register.component';
import { SchoolAdminComponent } from './modules/school/components/school-admin/school-admin.component';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

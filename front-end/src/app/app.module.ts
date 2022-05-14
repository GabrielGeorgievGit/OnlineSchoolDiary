import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { SchoolAdminComponent } from './modules/school/components/school-admin/school-admin.component';
import { RegisterComponent } from './modules/school/components/school/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { ViewComponent } from './modules/school/components/class/view/view.component';
import { EditComponent } from './modules/school/components/school/edit/edit.component';
import { TeachersComponent } from './modules/school/components/teacher/teachers/teachers.component';
import { MatTableModule } from '@angular/material/table';
import { ShowTeachersComponent } from './modules/school/components/teacher/show-teachers/show-teachers.component';
import { EditTeacherComponent } from './modules/school/components/teacher/edit-teacher/edit-teacher.component';
import { MatRadioModule } from '@angular/material/radio';
import { EditGradeComponent } from './modules/school/components/class/edit-grade/edit-grade.component';
import { RegisterStudentComponent } from './modules/school/components/student/register-student/register-student.component';
import { MatNativeDateModule } from '@angular/material/core';
import { SubjectsComponent } from './modules/school/components/class/subjects/subjects.component';
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginComponent,
    SchoolAdminComponent,
    RegisterComponent,
    ViewComponent,
    EditComponent,
    TeachersComponent,
    ShowTeachersComponent,
    EditTeacherComponent,
    EditGradeComponent,
    RegisterStudentComponent,
    SubjectsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatSelectModule,
    HttpClientModule,
    MatTableModule,
    MatRadioModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

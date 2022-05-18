import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject, Observable } from 'rxjs';
import { SchoolClass } from 'src/app/models/SchoolClass';
import { GradeService } from 'src/app/Services/grade.service';
import { SchoolClassService } from 'src/app/Services/school.class.service';
import { EditGradeComponent } from '../edit-grade/edit-grade.component';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
  displayedColumns: string[];
  dataToDisplay: SchoolClass[];

  dataSource: TableDataSource;

  classes: SchoolClass[];

  constructor(
    private readonly schoolClass: SchoolClassService,
    private readonly router: Router,
    private readonly gradeService: GradeService
  ) {
    this.classes = [];

    this.schoolClass.getSchoolClasses().subscribe({
      next: (response) => {
        this.classes = response;
      },
      error: (response) => {},
    });

    for (let i = 1; i < 13; ++i)
      this.classes.push({
        num: i.toString(),
        terms: ['a', 'b', 'c', 'd', 'e'],
      });

    console.log(this.classes);
    this.dataToDisplay = [...this.classes];
    this.dataSource = new TableDataSource(this.dataToDisplay);
    this.displayedColumns = [];
    this.classes.forEach((c) => this.displayedColumns.push(c.num));
  }

  ngOnInit(): void {}

  editTerm(clazz: string, term: string) {
    this.gradeService
      .getSchoolGrade({ name: Number.parseInt(clazz), grade: term })
      .subscribe({
        next: (response) => {
          EditGradeComponent.grade = response;
        },
        error: (response) => console.log(response),
      });
    this.router.navigate(['school-admin/school/grade']);
  }

  addTerm() {}

  addData() {
    const randomElementIndex = Math.floor(Math.random() * this.classes.length);
    this.dataToDisplay = [
      ...this.dataToDisplay,
      this.classes[randomElementIndex],
    ];
    this.dataSource.setData(this.dataToDisplay);
  }

  removeData() {
    this.dataToDisplay = this.dataToDisplay.slice(0, -1);
    this.dataSource.setData(this.dataToDisplay);
  }
}

class TableDataSource extends DataSource<SchoolClass> {
  private _dataStream = new ReplaySubject<SchoolClass[]>();

  constructor(initialData: SchoolClass[]) {
    super();
    this.setData(initialData);
  }

  connect(): Observable<SchoolClass[]> {
    return this._dataStream;
  }

  disconnect() {}

  setData(data: SchoolClass[]) {
    this._dataStream.next(data);
  }
}

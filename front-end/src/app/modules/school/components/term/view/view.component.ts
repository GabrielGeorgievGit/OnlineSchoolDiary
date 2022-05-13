import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { ReplaySubject, Observable } from 'rxjs';
import { SchoolClass } from 'src/app/models/SchoolClass';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

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

  constructor() {
    this.classes = [];
    for (let i = 1; i < 13; ++i)
      this.classes.push({ num: i.toString(), terms: ['a', 'b', 'c', 'd'] });
    this.classes[0].terms.push('e', 'f');
    console.log(this.classes);
    this.dataToDisplay = [...this.classes];
    this.dataSource = new TableDataSource(this.dataToDisplay);
    this.displayedColumns = [];
    this.classes.forEach((c) => this.displayedColumns.push(c.num));
  }

  ngOnInit(): void {}

  editTerm(clazz: string, term: string) {
    //this.router
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

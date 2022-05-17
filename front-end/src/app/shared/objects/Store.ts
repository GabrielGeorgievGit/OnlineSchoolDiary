import { Grade } from 'src/app/models/Grade';
import { School } from 'src/app/models/School';
import { SchoolClass } from 'src/app/models/SchoolClass';
import { Student } from 'src/app/models/Student';
import { Subject } from 'src/app/models/Subject';
import { Teacher } from 'src/app/models/Teacher';
import { User } from 'src/app/models/User';

export class Store {
  public static user: User;
  public static school: School;
  public static schoolClass: SchoolClass;
  public static teacher: Teacher;
  public static grade: Grade;
  public static student: Student;
  public static subject: Subject;
}

using MySql.Data.MySqlClient;
using System.Data;
using WebAPI.DB_connection;
using WebAPI.Models;

namespace WebAPI.Queries
{

    public class gradeQuery
    {
        User user;
        List<int> gradeId;
        List<int> gradeClass;
        List<char> grade;
        List<int> gradeTeacherId;

        public void readGrades()
        {
            DBConnection connection = new DBConnection();
            MySqlCommand command;
            connection.open();
            string query = "";
            MySqlDataReader reader;
            if (user.role == "teacher")
            {
                query += "SELECT id_grade_subject FROM grade_subject_teacher WHERE id_teacher=@teacherId";
                command = new MySqlCommand(query, connection.conn);
                command.Parameters.Add("@teacherId", MySqlDbType.Int32).Value = user.id;

                reader = command.ExecuteReader();

                List<int> gradeSubject = null;
                while (reader.Read())
                {
                    gradeSubject.Add(reader.GetInt32("id_grade_subject"));
                }
                if (gradeSubject != null)
                    query = "SELECT DISTINCT id_grade  FROM grade_subject_teacher WHERE id_grade_subject in (" + gradeSubject[0];
                else return;
                for (int i = 1; i < gradeSubject.Count; ++i)
                {
                    query += "," + gradeSubject[i].ToString();
                }
                query += ");";
            }
            else query = "SELECT * FROM grade WHERE id_shool=@shoolId";

            command = new MySqlCommand(query, connection.conn);
            command.Parameters.Add("@shoolId", MySqlDbType.Int32).Value = user.schoolId;

            reader = command.ExecuteReader();

            while (reader.Read())
            {
                gradeId.Add(reader.GetInt32("id_grade"));
                gradeClass.Add(reader.GetInt32("class"));
                grade.Add(reader.GetChar("grade"));
                gradeTeacherId.Add(reader.GetInt32("id_class_teacher"));
            }
            connection.close();
        }

        public string findClassTeacher(int idClassTeacher)
        {
            DBConnection connection = new DBConnection();
            MySqlCommand command;
            connection.open();
            string query = "SELECT FULL_NAME FROM TEACHER WHERE id_teacher=@id";
            MySqlDataReader reader;
            command = new MySqlCommand(query, connection.conn);
            command.Parameters.Add("@id", MySqlDbType.Int32).Value = idClassTeacher;

            reader = command.ExecuteReader();
            string name = "";
            if (reader.Read())
            {
                name = reader.GetString("FULL_NAME");
            }
            reader.Close();
            connection.close();
            return name;
        }

        public Grade findGrade(ClassGrade classGrade)
        {
            DBConnection connection = new DBConnection();
            MySqlCommand command;
            connection.open();
            string query = "SELECT * FROM GRADE WHERE ID_SCHOOL=@idSchool AND CLASS=@class AND GRADE=@grade";
            MySqlDataReader reader;
            command = new MySqlCommand(query, connection.conn);
            command.Parameters.Add("@idSchool", MySqlDbType.Int32).Value = SchoolQuery.findSchoolId(Finder.school.Name);
            command.Parameters.Add("@class", MySqlDbType.Int32).Value = classGrade.name;
            command.Parameters.Add("@grade", MySqlDbType.String).Value = classGrade.grade;

            reader = command.ExecuteReader();

            Grade grade = null;
            if (reader.Read())
            {
                grade = new Grade();
                grade.id = reader.GetInt32("ID_GRADE");
                grade.classNumber = reader.GetInt32("CLASS").ToString();
                grade.grade = reader.GetString("GRADE");
                grade.schoolName = Finder.school.Name;

                if (reader.IsDBNull(4))
                {
                    grade.teacherName = "";
                }
                else grade.teacherName = findClassTeacher(reader.GetInt32("ID_CLASS_TEACHER"));
            }
            reader.Close();
            connection.close();
            Finder.grade = grade;
            Console.WriteLine(grade.schoolName);
            return grade;
        }

        public static Student[] findStudents(int idGrade)
        {
            DBConnection connection = new DBConnection();
            MySqlCommand command;
            connection.open();
            string query = "SELECT ID_STUDENT, FULL_NAME FROM STUDENT WHERE ID_GRADE=@idGrade";
            MySqlDataReader reader;
            command = new MySqlCommand(query, connection.conn);
            command.Parameters.Add("@idGrade", MySqlDbType.Int32).Value = idGrade;

            reader = command.ExecuteReader();
            List<Student> students = new List<Student>();
            while (reader.Read())
            {
                students.Add(new Student(reader.GetInt32("ID_STUDENT"), reader.GetString("FULL_NAME"), idGrade));
            }
            reader.Close();
            connection.close();
            return students.ToArray();
        }

        public static void addStudent(Student student)
        {
            DBConnection connection = new DBConnection();
            MySqlCommand command;
            connection.open();
            string query = "INSERT INTO STUDENT(FULL_NAME, ID_GRADE) VALUES(@name, @idGrade)";
            MySqlDataReader reader;
            command = new MySqlCommand(query, connection.conn);
            command.Parameters.Add("@name", MySqlDbType.VarChar, 45).Value = student.name;
            command.Parameters.Add("@idGrade", MySqlDbType.Int32).Value = student.idGrade;

            reader = command.ExecuteReader();
            reader.Close();
            connection.close();
        }

        public static void changeTeacher(int idGrade, Teacher teacher)
        {
            DBConnection connection = new DBConnection();
            string query = "UPDATE GRADE SET ID_CLASS_TEACHER=@idTeacher WHERE id_grade=@idGrade";
            connection.open();
            MySqlCommand comand = new MySqlCommand(query, connection.conn);
            comand.Parameters.Add("@idTeacher", MySqlDbType.Int32).Value = teacher.id;
            comand.Parameters.Add("@idGrade", MySqlDbType.Int32).Value = idGrade;
            comand.ExecuteNonQuery();
            connection.close();
        }
    }
}

using MySql.Data.MySqlClient;
using System.Data;
using WebAPI.DB_connection;
using WebAPI.Models;

namespace WebAPI.Queries
{

    public class GradeQuery
    {
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
        public static void addSubjectTeacher(GradeSubjectTeacher gst) {
            addSubject(gst.idGrade, gst.idSubject);
            int idGS = getGradeSubject(gst.idGrade, gst.idSubject);
            addSubjectTeacher(idGS, gst.idTeacher);
        }

        private static void addSubject(int idGrade, int idSubject) {
            DBConnection connection = new DBConnection();
            MySqlCommand command;
            connection.open();
            string query = "INSERT INTO GRADE_SUBJECT(ID_GRADE, ID_SUBJECT) VALUES(@grade, @subject)";
            MySqlDataReader reader;
            command = new MySqlCommand(query, connection.conn);
            command.Parameters.Add("@grade", MySqlDbType.Int32).Value = idGrade;
            command.Parameters.Add("@subject", MySqlDbType.Int32).Value = idSubject;

            reader = command.ExecuteReader();
            reader.Close();
            connection.close();
        }

        private static int getGradeSubject(int idGrade, int idSubject) {
            DBConnection connection = new DBConnection();
            MySqlCommand command;
            connection.open();
            int idGS = -50;
            string query = "SELECT ID_GRADE_SUBJECT FROM GRADE_SUBJECT WHERE ID_GRADE=@grade AND ID_SUBJECT=@subject";
            MySqlDataReader reader;
            command = new MySqlCommand(query, connection.conn);
            command.Parameters.Add("@grade", MySqlDbType.Int32).Value = idGrade;
            command.Parameters.Add("@subject", MySqlDbType.Int32).Value = idSubject;

            reader = command.ExecuteReader();
            if (reader.Read()) {
                idGS = reader.GetInt32("ID_GRADE_SUBJECT");
            }
            reader.Close();
            connection.close();
            return idGS;
        }

        private static void addSubjectTeacher(int idGS, int idTeacher) {
            DBConnection connection = new DBConnection();
            MySqlCommand command;
            connection.open();
            string query = "INSERT INTO GRADE_SUBJECT_TEACHER(ID_TEACHER, ID_GRADE_SUBJECT) VALUES(@teacher, @gs)";
            MySqlDataReader reader;
            command = new MySqlCommand(query, connection.conn);
            command.Parameters.Add("@teacher", MySqlDbType.Int32).Value = idTeacher;
            command.Parameters.Add("@gs", MySqlDbType.Int32).Value = idGS;

            reader = command.ExecuteReader();
            reader.Close();
            connection.close();
        }
        public static GradeSubjectTeacherPair[] getSubjectTeachers(int idGrade) {
            DBConnection connection = new DBConnection();
            MySqlCommand command;
            connection.open();
            string query = "SELECT GRADE_SUBJECT.ID_GRADE_SUBJECT, GRADE_SUBJECT.ID_SUBJECT, TEACHER.ID_TEACHER, TEACHER.FULL_NAME, SUBJECT.SUBJECT FROM GRADE_SUBJECT JOIN GRADE_SUBJECT_TEACHER ON GRADE_SUBJECT_TEACHER.ID_GRADE_SUBJECT=GRADE_SUBJECT.ID_GRADE_SUBJECT JOIN SUBJECT ON SUBJECT.ID_SUBJECT=GRADE_SUBJECT.ID_SUBJECT JOIN TEACHER ON TEACHER.ID_TEACHER=GRADE_SUBJECT_TEACHER.ID_TEACHER WHERE GRADE_SUBJECT.ID_GRADE=@grade";
            MySqlDataReader reader;
            command = new MySqlCommand(query, connection.conn);
            command.Parameters.Add("@grade", MySqlDbType.Int32).Value = idGrade;

            reader = command.ExecuteReader();
            List<GradeSubjectTeacherPair> gstp = new List<GradeSubjectTeacherPair>();
            while (reader.Read()) {
                gstp.Add(new GradeSubjectTeacherPair(new GradeSubjectTeacher(idGrade, reader.GetInt32("ID_SUBJECT"), reader.GetInt32("ID_TEACHER")), reader.GetString("SUBJECT"), reader.GetString("FULL_NAME")));
            }
            reader.Close();
            connection.close();
            return gstp.ToArray();
        }

        public static void deleteSubjectTeacher(GradeSubjectTeacher gst) {
            DBConnection connection = new DBConnection();
            MySqlCommand command;
            connection.open();
            string query = "DELETE GRADE_SUBJECT_TEACHER, GRADE_SUBJECT FROM GRADE_SUBJECT_TEACHER JOIN GRADE_SUBJECT ON (GRADE_SUBJECT.ID_GRADE_SUBJECT=GRADE_SUBJECT_TEACHER.ID_GRADE_SUBJECT) WHERE GRADE_SUBJECT.ID_GRADE=@grade AND GRADE_SUBJECT_TEACHER.ID_TEACHER=@teacher AND GRADE_SUBJECT.ID_SUBJECT=@subject";
            MySqlDataReader reader;
            command = new MySqlCommand(query, connection.conn);
            command.Parameters.Add("@grade", MySqlDbType.Int32).Value = gst.idGrade;
            command.Parameters.Add("@teacher", MySqlDbType.Int32).Value = gst.idTeacher;
            command.Parameters.Add("@subject", MySqlDbType.Int32).Value = gst.idSubject;

            reader = command.ExecuteReader();
            List<GradeSubjectTeacherPair> gstp = new List<GradeSubjectTeacherPair>();
            
            reader.Close();
            connection.close();
        }

    }
}

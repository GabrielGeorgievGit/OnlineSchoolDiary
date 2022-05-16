using MySql.Data.MySqlClient;
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
    }
}

using MySql.Data.MySqlClient;
using WebAPI.DB_connection;
using WebAPI.Models;

namespace WebAPI.Queries
{
    public class TeacherQuery
    {
        public Teacher registerTeacher(Teacher teacher)
        {
            string query = "INSERT INTO Teacher(full_name, email, password, id_school) VALUES(@name, @email, @pas, @school);";
            DBConnection connection = new DBConnection();
            connection.open();

            MySqlCommand cmd = new MySqlCommand(query, connection.conn);
            cmd.Parameters.Add("@name", MySqlDbType.String).Value = teacher.fullName;
            cmd.Parameters.Add("@email", MySqlDbType.String).Value = teacher.email;
            cmd.Parameters.Add("@pas", MySqlDbType.String).Value = teacher.password;
            cmd.Parameters.Add("@school", MySqlDbType.Int32).Value = teacher.idSchool;

            MySqlDataReader reader = cmd.ExecuteReader();
            reader.Close();
            connection.close();

            return teacher;
        }
    }
}

using MySql.Data.MySqlClient;
using WebAPI.Models;
using MySql.Data.MySqlClient;
using WebAPI.DB_connection;
using WebAPI.Models;

namespace WebAPI.Queries {
    public class Finder {
        public static School school = null;
        public static Grade grade = null;
        

        public Finder() {
        }
        public School findSchool(int? userId) {
            if(userId == null) return null;
            DBConnection connection = new DBConnection();
            connection.open();
            School school = null;
            int? idSchool = null;

            string query = "SELECT * FROM SCHOOL_ADMINISTRATOR WHERE id_school_administrator=@id";
            MySqlCommand command = new MySqlCommand(query, connection.conn);
            command.Parameters.Add("@id", MySqlDbType.Int32).Value = userId;

            MySqlDataReader reader = command.ExecuteReader();
            if (reader.Read()) {
                idSchool = reader.GetInt32("id_school");
                reader.Close();
                connection.close();
                school = findSchoolById(idSchool);
                
                return school;
            }

            query = "SELECT * FROM TEACHER WHERE id_teacher=@id";
            command = new MySqlCommand(query, connection.conn);
            command.Parameters.Add("@id", MySqlDbType.Int32 ).Value = userId;
            reader = command.ExecuteReader();
            if(reader.Read()) {
                idSchool = reader.GetInt32("id_school");
                reader.Close();
                connection.close();
                school = findSchoolById(idSchool);

                return school;
            }
            return null;
        }

        public School findSchoolById(int? schoolId) {
            if (schoolId == null) return null;
            School school = null;

            DBConnection connection = new DBConnection();
            connection.open();

            string query = "SELECT * FROM SCHOOL WHERE id_school=@id";
            MySqlCommand command = new MySqlCommand(query, connection.conn);
            command.Parameters.Add("@id", MySqlDbType.Int32).Value = schoolId;
            MySqlDataReader reader = command.ExecuteReader();

            if (reader.Read()) {
                school = new School(reader.GetString("name"), reader.GetString("type"));
                reader.Close();
                connection.close();
            }
            return school;
        }

    }
}


using MySql.Data.MySqlClient;
using WebAPI.DB_connection;
using WebAPI.Models;

namespace WebAPI.Queries
{
    public class SchoolQuery
    {
        private DBConnection connection;
        public SchoolQuery() {
            this.connection = new DBConnection();
        }
        User user;
        public School readSchool()
        {

            string query = "SELECT * FROM school WHERE id_school=@ishoolId";
            connection.open();

            MySqlCommand command = new MySqlCommand(query, connection.conn);
            command.Parameters.Add("@shooId", MySqlDbType.Int32).Value = user.schoolId;

            MySqlDataReader reader = command.ExecuteReader();
            if (reader.Read())
            {
                School school = new School(reader.GetString("name"), reader.GetString("type"));
                connection.close();
                return school;
            }
            connection.close();
           
            Console.WriteLine("\n  school of user " + user.name + "is not found\n");
            return new School("N/A", "N/A");
        }

        public School registerSchool(School school) {
            string query = "INSERT INTO SCHOOL(name, type) VALUES(@name, @type);";
            this.connection.open();

            MySqlCommand cmd = new MySqlCommand(query, connection.conn);
            cmd.Parameters.Add("@name", MySqlDbType.String).Value = school.Name;
            cmd.Parameters.Add("@type", MySqlDbType.String).Value = school.Type;

            MySqlDataReader reader = cmd.ExecuteReader();
            connection.close();

            Finder.school = school;
            return school;
        }

    }
}

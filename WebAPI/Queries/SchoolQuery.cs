using MySql.Data.MySqlClient;
using WebAPI.DB_connection;
using WebAPI.Models;

namespace WebAPI.Queries
{
    public class SchoolQuery
    {
        User user;
        public School readSchool()
        {
            DBConnection connection = new DBConnection();

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
        public void schoolEdit(int schoolId,string name,string type)
        {
            DBConnection connection=new DBConnection();
            string query = "UPDATE school SET name=@name , type=@type WHERE id_shool=@ischoolId";
            connection.open();
            MySqlCommand comand = new MySqlCommand(query, connection.conn);
            comand.Parameters.Add("@name", MySqlDbType.VarChar,45).Value = name;
            comand.Parameters.Add("@name", MySqlDbType.VarChar, 45).Value = type;
            comand.Parameters.Add("@shooId", MySqlDbType.Int32).Value = user.schoolId;
            comand.ExecuteNonQuery();
            connection.close();
        }
    }
}

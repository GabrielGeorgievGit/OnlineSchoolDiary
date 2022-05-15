using MySql.Data.MySqlClient;
using WebAPI.DB_connection;
using WebAPI.Models;

namespace WebAPI.Queries
{
    public class Signer
    {
        public static User user = null;
        public bool isValid(string email,string password)
        {
            DBConnection connection = new DBConnection();

            string [] query ={ "SELECT * FROM school_administrator WHERE email=@email",
                                "SELECT * FROM teacher WHERE email=@email" };
            for(int i = 0; i < query.Length; i++)
            {
                connection.open();
                MySqlCommand command = new MySqlCommand(query[i], connection.conn);
                command.Parameters.Add("@email", MySqlDbType.VarChar, 45).Value = email;

                MySqlDataReader reader = command.ExecuteReader();
                if (reader.Read() && password == reader.GetString("password"))
                {
                    string name = reader.GetString("full_name");
                    int schoolId = reader.GetInt32("id_school");
                    if (i == 0) 
                    {
                        user = new User(reader.GetInt32("id_school_administrator"),name,email,"admin",schoolId);
                        return true;
                    }
                    user = new User(reader.GetInt32("id_teacher"), name, email, "teacher", schoolId);
                    return true;
                }
                connection.close();
            }
            return false;
        }

    }
}

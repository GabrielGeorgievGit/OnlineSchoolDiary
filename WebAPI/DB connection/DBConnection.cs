using MySql.Data.MySqlClient;

namespace WebAPI.DB_connection
{
    internal class DBConnection
    {
        string server = "localhost";
        string dataBase = "sdiarydb";
        string username = "root";
        string password = "Mysql@localhost:3306";
        string constring = "";

        public MySqlConnection conn;

        public DBConnection()
        {
            string constring = "SERVER=" + server +
                                ";DATABASE=" + dataBase +
                                ";UID=" + username +
                                ";PASSWORD=" + password;
            conn = new MySqlConnection(constring);
        }
        public void open()
        {
            conn.Open();
        }
        public void close()
        {
            conn.Close();
        }
    }
}


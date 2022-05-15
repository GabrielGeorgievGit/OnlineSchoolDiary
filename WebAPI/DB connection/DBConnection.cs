using MySql.Data.MySqlClient;

namespace WebAPI.DB_connection
{
    internal class DBConnection
    {
        string server = "127.0.0.1";
        string dataBase = "sdiarydb";
        string username = "root";
        string password = "ROOT";
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


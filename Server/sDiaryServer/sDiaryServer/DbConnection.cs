using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;



namespace sDiaryServer
{
    internal class DbConnection
    {
        string server = "127.0.0.1";
        string dataBase = "дневник";
        string username = "root";
        string password = "root";
        string constring = "";

        public MySqlConnection dBase;

       public DbConnection()
        {
            string constring =  "SERVER=" + server +
                                ";DATABASE=" + dataBase +
                                ";UID=" + username +
                                ";PASSWORD=" + password ;
            dBase = new MySqlConnection(constring);
        }
        public void open()
        {
            dBase.Open();
        }
        public void close()
        {
            dBase.Close();
        }
    }
}

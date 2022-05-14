using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace sDiaryServer
{
    internal class DataGater : Form1
    {
        DbConnection dbConnection;

        public DataGater(DbConnection dbConnection)
        {
            this.dbConnection = dbConnection;
        }
        public string getAcount(string email,string password,string table)
        {
            string id="ERROR Wromg username or password";
            try
            {
                dbConnection.open();
                string query = "SELECT ",tableId = "",pass = "";
                if (table.Length == 0)
                    id = "ERROR Empty table name";
                else if (table.Length == 1)
                    tableId = "id" + char.ToUpper(table[0]);
                else tableId = "id" + char.ToUpper(table[0]) + table.Substring(1);

                    query += tableId + "AND password FROM " + table + " WHERE email='" + email + "';";

                MySqlCommand command = new MySqlCommand(query, dbConnection.dBase);

                MySqlDataReader reader = command.ExecuteReader();
                if(reader.Read())
                {
                    id = reader.GetString(tableId) + "\t";
                    pass += reader.GetString("password") + "\n";
                }
                if(pass != password) id = "ERROR Wromg username or password";
            }
            catch (Exception e)
            {
                File.WriteAllText(@"/Log.txt", "\n"+e.ToString()+"\n");               
            }
            return id;
        }


    }
}

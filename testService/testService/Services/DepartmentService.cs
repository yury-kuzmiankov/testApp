using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using testService.Models;
using System.Data.SQLite;
using System.Web.Hosting;

namespace testService.Services
{
    public class DepartmentService
    {
        SQLiteConnection conn = null;

        public DepartmentService() 
        {
            string path = HostingEnvironment.ApplicationPhysicalPath;
            conn = new SQLiteConnection("Data Source=" + path + "base\\testBase;Version=3;Password=!0232Bqdhai;");
        }

        public List<Department> geDepartments()
        {
            List<Department> departments = new List<Department>();
            string query = "SELECT id, name FROM department";
            try
            {
                conn.Open();
                using (SQLiteCommand command = new SQLiteCommand(query, conn))
                {
                    SQLiteDataReader dataReader = command.ExecuteReader();
                    while (dataReader.Read())
                    {
                        departments.Add(new Department()
                        {
                            Id = dataReader.GetInt32(0),
                            Name = dataReader.GetString(1)
                        });
                    }
                }
            }
            catch (Exception e) { throw e; }
            finally
            {
                conn.Close();
            }

            return departments;
        }
    }
}
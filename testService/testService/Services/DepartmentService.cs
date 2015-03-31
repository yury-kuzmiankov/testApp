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

        public int insertDeparnment(Department department)
        {
            int inserted = 0 ;
            string query = "INSERT INTO department(name) VALUES (@name);";
            try {
                conn.Open();
                using (SQLiteCommand command = new SQLiteCommand(query, conn))
                {
                    command.Parameters.AddWithValue("@name", department.Name);
                    inserted = command.ExecuteNonQuery();
               
                }
            }
            catch (Exception e) { throw e; }
            finally
            {
                conn.Close();
            }

            return inserted;
        }

        public int updateDepartment(Department department)
        {
            int inserted = 0;
            string query = "UPDATE department SET name = @name  WHERE  (department.id = @id)";
            try
            {
                conn.Open();
                using (SQLiteCommand command = new SQLiteCommand(query, conn))
                {
                    command.Parameters.AddWithValue("@id", department.Id);
                    command.Parameters.AddWithValue("@name", department.Name);

                    inserted = command.ExecuteNonQuery();

                }
            }
            catch (Exception e) { throw e; }
            finally
            {
                conn.Close();
            }

            return inserted;
        }
    };

}
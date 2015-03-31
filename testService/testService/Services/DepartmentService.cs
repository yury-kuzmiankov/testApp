using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using testService.Models;
using System.Data.SQLite;
using System.Web.Hosting;
using System.Configuration;
using System.Data.SqlClient;

namespace testService.Services
{
    public class DepartmentService
    {
        string path = "";
        public DepartmentService() 
        {
            path = ConfigurationManager.ConnectionStrings[1].ToString();
        }

        public List<Department> geDepartments()
        {
            List<Department> departments = new List<Department>();
            SqlConnection conn = new SqlConnection(path);
            string query = "SELECT id, name FROM department";
            try
            {
                conn.Open();
                using (SqlCommand command = new SqlCommand(query, conn))
                {
                    SqlDataReader dataReader = command.ExecuteReader();
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
            SqlConnection conn = new SqlConnection(path);
            string query = "INSERT INTO department(name) VALUES (@name);";
            try {
                conn.Open();
                using (SqlCommand command = new SqlCommand(query, conn))
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
            SqlConnection conn = new SqlConnection(path);
            string query = "UPDATE department SET name = @name  WHERE  (department.id = @id)";
            try
            {
                conn.Open();
                using (SqlCommand command = new SqlCommand(query, conn))
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
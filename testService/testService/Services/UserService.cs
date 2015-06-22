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
    public class UserService
    {
        string path = "";

        public UserService() 
        {
            path = ConfigurationManager.ConnectionStrings["serverDb"].ToString();
        }

        public List<User> getUsers()
        {
            List<User> users = new List<User>();
            SqlConnection conn = new SqlConnection(path);
            string query = "SELECT users.id, users.name, users.firstName, users.lastName, role.id AS roleId, role.name AS roleName, department.id AS depId, department.name AS depName FROM users INNER JOIN role ON users.role = role.id INNER JOIN department ON department.id = users.department  ORDER BY users.lastName ASC";
            try
            {
                conn.Open();
                using (SqlCommand command = new SqlCommand(query, conn))
                {
                    SqlDataReader dataReader = command.ExecuteReader();
                    while (dataReader.Read())
                    {
                        users.Add(new User()
                        {
                            
                            Id = dataReader.GetInt32(0),
                            Name = dataReader.GetString(1),
                            FirstName = dataReader.GetString(2),
                            LastName = dataReader.GetString(3),
                            Role = new Role()
                            {
                                Id = dataReader.GetInt32(4),
                                Name = dataReader.GetString(5)
                            },
                            department = new Department()
                            {
                                Id = dataReader.GetInt32(6),
                                Name = dataReader.GetString(7)
                            }
                        });
                    }
                }
            }
            catch (Exception e) { throw e; }
            finally
            {
                conn.Close();
            }
            
            return users;
        }

        public List<User> getUsersByDepartment(int id)
        {
            List<User> users = new List<User>();
            SqlConnection conn = new SqlConnection(path);
            string query = "SELECT users.id, users.name, users.firstName, users.lastName, role.id AS roleId, role.name AS roleName, department.id AS depId, department.name AS depName FROM users INNER JOIN role ON users.role = role.id INNER JOIN department ON department.id = users.department  where (department.id = @id)  ORDER BY users.lastName ASC";
            try
            {
                conn.Open();
                using (SqlCommand command = new SqlCommand(query, conn))
                {
                    command.Parameters.AddWithValue("@id", id);
                    SqlDataReader dataReader = command.ExecuteReader();
                    while (dataReader.Read())
                    {
                        users.Add(new User()
                        {

                            Id = dataReader.GetInt32(0),
                            Name = dataReader.GetString(1),
                            FirstName = dataReader.GetString(2),
                            LastName = dataReader.GetString(3),
                            Role = new Role()
                            {
                                Id = dataReader.GetInt32(4),
                                Name = dataReader.GetString(5)
                            },
                            department = new Department()
                            {
                                Id = dataReader.GetInt32(6),
                                Name = dataReader.GetString(7)
                            }
                        });
                    }
                }
            }
            catch (Exception e) { throw e; }
            finally
            {
                conn.Close();
            }

            return users;
        }

        public List<User> getUserById(string id)
        {
            List<User> users = new List<User>();
            SqlConnection conn = new SqlConnection(path);
            string query = "SELECT users.id, users.name, users.firstName, users.lastName, role.id AS roleId, role.name AS roleName, department.id AS depId, department.name AS depName FROM users INNER JOIN role ON users.role = role.id INNER JOIN department ON department.id = users.department WHERE (users.id = @id)";
             try
            {
                conn.Open();
                using (SqlCommand command = new SqlCommand(query, conn))
                {
                    command.Parameters.AddWithValue("@id", id);
                    SqlDataReader dataReader = command.ExecuteReader();
                    while (dataReader.Read())
                    {
                        users.Add(new User()
                        {

                            Id = dataReader.GetInt32(0),
                            Name = dataReader.GetString(1),
                            FirstName = dataReader.GetString(2),
                            LastName = dataReader.GetString(3),
                            Role = new Role()
                            {
                                Id = dataReader.GetInt32(4),
                                Name = dataReader.GetString(5)
                            },
                            department = new Department()
                            {
                                Id = dataReader.GetInt32(6),
                                Name = dataReader.GetString(7)
                            }
                        });
                    }
                }
            }
            catch (Exception e) { throw e; }
            finally
            {
                conn.Close();
            }
            return users;
        }

        public User getUserByNamePassword(string name, String password)
        {
            User user = null;
            SqlConnection conn = new SqlConnection(path);
            string query = "SELECT users.id, users.name, users.firstName, users.lastName, role.id AS roleId, role.name AS roleName, department.id AS depId, department.name AS depName FROM users INNER JOIN role ON users.role = role.id INNER JOIN department ON department.id = users.department WHERE (users.name = @name) AND (users.password = @password)";
            try
            {
                conn.Open();
                using (SqlCommand command = new SqlCommand(query, conn))
                {
                    command.Parameters.AddWithValue("@name", name);
                    command.Parameters.AddWithValue("@password", password);
                    SqlDataReader dataReader = command.ExecuteReader();
                    if(dataReader.Read())
                    {
                        user = new User()
                        {

                            Id = dataReader.GetInt32(0),
                            Name = dataReader.GetString(1),
                            FirstName = dataReader.GetString(2),
                            LastName = dataReader.GetString(3),
                            Role = new Role()
                            {
                                Id = dataReader.GetInt32(4),
                                Name = dataReader.GetString(5)
                            },
                            department = new Department()
                            {
                                Id = dataReader.GetInt32(6),
                                Name = dataReader.GetString(7)
                            }
                        };
                    }
                }
            }
            catch (Exception e) { throw e; }
            finally
            {
                conn.Close();
            }

            return user;
        }

        public User userExists(string name)
        {
            User user = null;
            SqlConnection conn = new SqlConnection(path);
            string query = "SELECT users.id, users.name, users.firstName, users.lastName, role.id AS roleId, role.name AS roleName, department.id AS depId, department.name AS depName FROM users INNER JOIN role ON users.role = role.id INNER JOIN department ON department.id = users.department WHERE (users.name = @name)";
            try {
                conn.Open();
                using (SqlCommand command = new SqlCommand(query, conn))
                {
                    command.Parameters.AddWithValue("@name", name);
                    SqlDataReader dataReader = command.ExecuteReader();
                    if (dataReader.Read())
                    {
                        user = new User()
                        {

                            Id = dataReader.GetInt32(0),
                            Name = dataReader.GetString(1),
                            FirstName = dataReader.GetString(2),
                            LastName = dataReader.GetString(3),
                            Role = new Role()
                            {
                                Id = dataReader.GetInt32(4),
                                Name = dataReader.GetString(5)
                            },
                            department = new Department()
                            {
                                Id = dataReader.GetInt32(6),
                                Name = dataReader.GetString(7)
                            }
                        };
                    }
                }
            }
            catch (Exception e) { throw e; }
            finally
            {
                  conn.Close();
            }
            

            return user;
        }

        public int addUser(string name, string firstName, string lastName, string password, int department)
        {
            int inserted = 0 ;
            SqlConnection conn = new SqlConnection(path);
            string query = "INSERT INTO users(name, firstName, lastName, password, role, department) VALUES (@name, @firstname, @lastname, @password, 2, @department);";
            try {
                conn.Open();
                using (SqlCommand command = new SqlCommand(query, conn))
                {
                    command.Parameters.AddWithValue("@name", name);
                    command.Parameters.AddWithValue("@firstname", firstName);
                    command.Parameters.AddWithValue("@lastname", lastName);
                    command.Parameters.AddWithValue("@password", password);
                    command.Parameters.AddWithValue("@department", department);

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

        public int updateUser(User user)
        {
            int inserted = 0;
            SqlConnection conn = new SqlConnection(path);
            string query = "UPDATE users SET firstName = @firstName, lastName = @lastName, role = @roleid, department = @departmentid WHERE  (users.id = @id)";
            try
            {
                conn.Open();
                using (SqlCommand command = new SqlCommand(query, conn))
                {
                    command.Parameters.AddWithValue("@id", user.Id);
                    command.Parameters.AddWithValue("@firstname", user.FirstName);
                    command.Parameters.AddWithValue("@lastname", user.LastName);
                    command.Parameters.AddWithValue("@departmentid", user.department.Id);
                    command.Parameters.AddWithValue("@roleid", user.Role.Id);

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
    }
}
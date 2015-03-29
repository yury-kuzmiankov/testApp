using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using testService.Models;
using System.Data.SQLite;
using System.Web.Hosting;

namespace testService.Services
{
    public class UserService
    {
        SQLiteConnection conn = null;

        public UserService() 
        {
            string path = HostingEnvironment.ApplicationPhysicalPath;
            conn = new SQLiteConnection("Data Source=" + path + "base\\testBase;Version=3;Password=!0232Bqdhai;");
        }

        public List<User> getUsers()
        {
            List<User> users = new List<User>();
            string query = "SELECT id, name, firstName, lastName, role, department FROM users";
            try
            {
                conn.Open();
                using (SQLiteCommand command = new SQLiteCommand(query, conn))
                {
                    SQLiteDataReader dataReader = command.ExecuteReader();
                    while (dataReader.Read())
                    {
                        users.Add(new User()
                        {
                            Id = dataReader.GetInt32(0),
                            Name = dataReader.GetString(1),
                            FirstName = dataReader.GetString(2),
                            LastName = dataReader.GetString(3),
                            Role = dataReader.GetInt32(4),
                            Department = dataReader.GetInt32(5)
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
            string query = "SELECT id, name, firstName, lastName, role, department FROM users where users.id=@id";
             try
            {
                conn.Open();
                using (SQLiteCommand command = new SQLiteCommand(query, conn))
                {
                    command.Parameters.AddWithValue("@id", id);
                    SQLiteDataReader dataReader = command.ExecuteReader();
                    while (dataReader.Read())
                    {
                        users.Add(new User()
                        {
                            Id = dataReader.GetInt32(0),
                            Name = dataReader.GetString(1),
                            FirstName = dataReader.GetString(2),
                            LastName = dataReader.GetString(3),
                            Role = dataReader.GetInt32(4),
                            Department = dataReader.GetInt32(5)
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
            string query = "SELECT id, name, firstName, lastName, role, department FROM users where users.name=@name and users.password=@password";
            try
            {
                conn.Open();
                using (SQLiteCommand command = new SQLiteCommand(query, conn))
                {
                    command.Parameters.AddWithValue("@name", name);
                    command.Parameters.AddWithValue("@password", password);
                    SQLiteDataReader dataReader = command.ExecuteReader();
                    if(dataReader.Read())
                    {
                        user = new User()
                        {
                            Id = dataReader.GetInt32(0),
                            Name = dataReader.GetString(1),
                            FirstName = dataReader.GetString(2),
                            LastName = dataReader.GetString(3),
                            Role = dataReader.GetInt32(4),
                            Department = dataReader.GetInt32(5)
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
            string query = "SELECT id, name, firstName, lastName, role, department FROM users where users.name=@name";
            try {
                conn.Open();
                using (SQLiteCommand command = new SQLiteCommand(query, conn))
                {
                    command.Parameters.AddWithValue("@name", name);
                    SQLiteDataReader dataReader = command.ExecuteReader();
                    if (dataReader.Read())
                    {
                        user = new User()
                        {
                            Id = dataReader.GetInt32(0),
                            Name = dataReader.GetString(1),
                            FirstName = dataReader.GetString(2),
                            LastName = dataReader.GetString(3),
                            Role = dataReader.GetInt32(4),
                            Department = dataReader.GetInt32(5)
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
            string query = "INSERT INTO users(name, firstName, lastName, password, role, department) VALUES (@name, @firstname, @lastname, @password, 2, @department);";
            try {
                conn.Open();
                using (SQLiteCommand command = new SQLiteCommand(query, conn))
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
    }
}
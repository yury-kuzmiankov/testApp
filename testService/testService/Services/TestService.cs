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
    public class TestService
    {
        string path = "";

        public TestService()
        {
            path = ConfigurationManager.ConnectionStrings[1].ToString();
        }

        public List<Test> getTestsByUser(int id)
        {
            List<Test> tests = new List<Test>();
            SqlConnection conn = new SqlConnection(path);
            string query = "SELECT TOP 10 id, testId FROM result WHERE(userID = @id) ORDER BY timestamp";
            try
            {
                conn.Open();
                using (SqlCommand command = new SqlCommand(query, conn))
                {
                    command.Parameters.AddWithValue("@id", id);
                    SqlDataReader dataReader = command.ExecuteReader();
                    while (dataReader.Read())
                    {
                        tests.Add(new Test()
                        {
                            Id = dataReader.GetInt32(0),
                            TestId = dataReader.GetInt32(1),
                        });
                    }
                }
            }
            catch (Exception e) { throw e; }
            finally
            {
                conn.Close();
            }
            return tests;
        }

        public List<Test> getTestsByDepartment(int id)
        {
            List<Test> tests = new List<Test>();
            SqlConnection conn = new SqlConnection(path);
            string query = "SELECT result.fail, result.testId, result.neutral, result.correct, result.[timestamp], result.isDone, result.result, result.timeSpent, result.try, users.id AS userId, users.lastName, department.id, department.name  FROM result INNER JOIN users ON result.userID = users.id INNER JOIN department ON users.department = department.id WHERE (department.id = @id) ORDER BY result.[timestamp] DESC";
            try
            {
                conn.Open();
                using (SqlCommand command = new SqlCommand(query, conn))
                {
                    command.Parameters.AddWithValue("@id", id);
                    SqlDataReader dataReader = command.ExecuteReader();
                    while (dataReader.Read())
                    {
                        tests.Add(new Test()
                        {

                            Fail = dataReader.GetInt32(0),
                            TestId = dataReader.GetInt32(1),
                            Neutral = dataReader.GetInt32(2),
                            Correct = dataReader.GetInt32(3),
                            Timestamp = dataReader.GetDateTime(4),
                            Result = dataReader.GetString(6),
                            TimeSpend = dataReader.GetInt32(7),
                            Try = dataReader.GetInt32(8),
                            user = new User()
                            {
                                Id = dataReader.GetInt32(9),
                                LastName = dataReader.GetString(10),
                                department = new Department()
                                {
                                    Id = dataReader.GetInt32(11),
                                    Name = dataReader.GetString(12),

                                }
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
            return tests;
        }

        public List<Test> getTests()
        {
            List<Test> tests = new List<Test>();
            SqlConnection conn = new SqlConnection(path);
            string query = "SELECT result.fail, result.testId, result.neutral, result.correct, result.[timestamp],  result.isDone, result.result, result.timeSpent, result.try, users.id AS userId, users.lastName, department.id, department.name  FROM result INNER JOIN users ON result.userID = users.id INNER JOIN department ON users.department = department.id ORDER BY result.[timestamp] DESC";
            try
            {
                conn.Open();
                using (SqlCommand command = new SqlCommand(query, conn))
                {
                    SqlDataReader dataReader = command.ExecuteReader();
                    while (dataReader.Read())
                    {
                        tests.Add(new Test()
                        {
                            
                            Fail = dataReader.GetInt32(0),
                            TestId = dataReader.GetInt32(1),
                            Neutral = dataReader.GetInt32(2),
                            Correct = dataReader.GetInt32(3),
                            Timestamp = dataReader.GetDateTime(4),
                            Result = dataReader.GetString(6),
                            TimeSpend = dataReader.GetInt32(7),
                            Try = dataReader.GetInt32(8),
                            user = new User()
                            {
                                Id = dataReader.GetInt32(9),
                                LastName = dataReader.GetString(10),
                                department = new Department()
                                {
                                    Id = dataReader.GetInt32(11),
                                    Name = dataReader.GetString(12),

                                }
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
            return tests;
        }

        public int insert(Test test)
        {
            int inserted = 0;
            SqlConnection conn = new SqlConnection(path);
            string query = "INSERT INTO result (userID, testId, fail, try, timeSpent, result, isDone, [timestamp], correct, neutral) VALUES (@userId, @testId, @fail, @try,@timeSpend,@result,@isDone,@timestamp,@correct,@neutral);";
            try
            {
                conn.Open();
                using (SqlCommand command = new SqlCommand(query, conn))
                {
                    command.Parameters.AddWithValue("@userId", test.user.Id);
                    command.Parameters.AddWithValue("@testId", test.TestId);
                    command.Parameters.AddWithValue("@fail", test.Fail);
                    command.Parameters.AddWithValue("@try", test.Try);
                    command.Parameters.AddWithValue("@timeSpend", test.TimeSpend);
                    command.Parameters.AddWithValue("@result", test.Result);
                    command.Parameters.AddWithValue("@isDone", test.IsDone);
                    command.Parameters.AddWithValue("@timestamp", test.Timestamp);
                    command.Parameters.AddWithValue("@correct", test.Correct);
                    command.Parameters.AddWithValue("@neutral", test.Neutral);

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
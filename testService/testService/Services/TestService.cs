using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using testService.Models;
using System.Data.SQLite;
using System.Web.Hosting;

namespace testService.Services
{
    public class TestService
    {
        SQLiteConnection conn = null;

        public TestService()
        {
            string path = HostingEnvironment.ApplicationPhysicalPath;
            conn = new SQLiteConnection("Data Source=" + path + "base\\testBase;Version=3;Password=!0232Bqdhai;");
        }

        public List<Test> getTestsByUser(int id)
        {
            List<Test> tests = new List<Test>();
            string query = "SELECT id, testId FROM result WHERE(userID = @id) ORDER BY timestamp DESC LIMIT 12";
            try
            {
                conn.Open();
                using (SQLiteCommand command = new SQLiteCommand(query, conn))
                {
                    command.Parameters.AddWithValue("@id", id);
                    SQLiteDataReader dataReader = command.ExecuteReader();
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
            string query = "SELECT result.fail, result.testId, result.neutral, result.correct, result.[timestamp], result.isDone, result.result, result.timeSpent, result.try, users.id AS userId, users.lastName, department.id, department.name  FROM result INNER JOIN users ON result.userID = users.id INNER JOIN department ON users.department = department.id WHERE (department.id = @id) ORDER BY result.[timestamp] DESC";
            try
            {
                conn.Open();
                using (SQLiteCommand command = new SQLiteCommand(query, conn))
                {
                    command.Parameters.AddWithValue("@id", id);
                    SQLiteDataReader dataReader = command.ExecuteReader();
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
            string query = "SELECT result.fail, result.testId, result.neutral, result.correct, result.[timestamp], result.isDone, result.result, result.timeSpent, result.try, users.id AS userId, users.lastName, department.id, department.name  FROM result INNER JOIN users ON result.userID = users.id INNER JOIN department ON users.department = department.id ORDER BY result.[timestamp] DESC";
            try
            {
                conn.Open();
                using (SQLiteCommand command = new SQLiteCommand(query, conn))
                {
                    SQLiteDataReader dataReader = command.ExecuteReader();
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
            string query = "INSERT INTO result (userID, testId, fail, try, timeSpent, result, isDone, [timestamp], correct, neutral) VALUES (@userId, @testId, @fail, @try,@timeSpend,@result,@isDone,@timestamp,@correct,@neutral);";
            try
            {
                conn.Open();
                using (SQLiteCommand command = new SQLiteCommand(query, conn))
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
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

        public int insert(Test test)
        {
            int inserted = 0;
            string query = "INSERT INTO result (userID, testId, fail, try, timeSpent, result, isDone, [timestamp], correct, neutral) VALUES (@userId, @testId, @fail, @try,@timeSpend,@result,@isDone,@timestamp,@correct,@neutral);";
            try
            {
                conn.Open();
                using (SQLiteCommand command = new SQLiteCommand(query, conn))
                {
                    command.Parameters.AddWithValue("@userId", test.UserId);
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
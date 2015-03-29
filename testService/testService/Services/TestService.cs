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
            string query = "SELECT id, testId FROM result WHERE(userID = @id) ORDER BY timeSpent DESC LIMIT 12";
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
    }
}
using System.Text;
using SimpleHttp;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;

namespace Submit_task2
{
    class Program
    {
        static void Main(string[] args)
        {
            Route.Add("/submit", (req, res, props) =>
            {
                using (StreamReader reader = new StreamReader(req.InputStream))
                {
                    string requestBody = reader.ReadToEnd();
                    dynamic requestData = JsonConvert.DeserializeObject(requestBody);
                    dynamic data = JObject.Parse(requestData.ToString());
                    Console.WriteLine(data.code);

                    // Getting code in base64
                    string code2 = data.code;

                    byte[] data2 = Convert.FromBase64String(code2);

                    // Decoding from base64
                    string decodedString = Encoding.UTF8.GetString(data2);
                    Console.WriteLine(decodedString);

                    // Create temp file
                    string tempFilePath = Path.GetTempFileName();

                    // Save encoded code to temporary file
                    string tempCode = decodedString;
                    File.WriteAllText(tempFilePath, tempCode);

                    // Display the full path to the temporary file
                    Console.WriteLine("Temporary file path: " + tempFilePath);

                    // Read and print the content of the temporary file
                    string fileContent = File.ReadAllText(tempFilePath);
                    Console.WriteLine("Code in the temporary file:");
                    Console.WriteLine(fileContent);

                    // Execute the tests and store the results
                    List<Tuple<string, bool>> testResults = ExecuteTests(tempFilePath);
                    
                    // Calculate the number of passed and failed tests
                    int passedCount = testResults.Count(result => result.Item2);
                    int failedCount = testResults.Count(result => !result.Item2);

                    // Prepare the response content
                    string responseContent = $"Passed: {passedCount}, Failed: {failedCount}";

                    // Delete the temporary file
                    File.Delete(tempFilePath);
                    
                    Console.WriteLine(JsonConvert.SerializeObject(testResults));

                    // Send the test results as a response
                    res.AsText(JsonConvert.SerializeObject(responseContent));

                    Console.ReadLine();
                }
            }, "POST");


            HttpServer.ListenAsync(
                    1337,
                    CancellationToken.None,
                    Route.OnHttpRequestAsync
                    )
                    .Wait();
        }

        static List<Tuple<string, bool>> ExecuteTests(string tempFilePath)
        {
            ReverseWordTests reverseWordTests = new ReverseWordTests(tempFilePath);
            reverseWordTests.RunTests();
            return reverseWordTests.GetResults();
        }
    }
}

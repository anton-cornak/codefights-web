using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.Emit;
using System.Reflection;

[TestFixture]
public class ReverseWordTests
{
    private string tempFilePath;
    private List<Tuple<string, bool>> testResults = new List<Tuple<string, bool>>();

    public ReverseWordTests(string tempFilePath)
    {
        this.tempFilePath = tempFilePath;
    }

    private string GetMethodFromTempFile()
    {
        string methodContent = File.ReadAllText(tempFilePath);
        return methodContent;
    }

    public void RunTests()
    {
        ReverseWord_WithValidInput_ReturnsReversedWord();
        ReverseWord_WithEmptyInput_ReturnsEmptyString();
        
    }

    public List<Tuple<string, bool>> GetResults()
    {
        return testResults;
    }

    [Test]
    public void ReverseWord_WithValidInput_ReturnsReversedWord()
    {
        // Arrange
        string word = "Hello";
        string expected = "olleH";

        // Read the method content from the temporary file
        string methodContent = GetMethodFromTempFile();

        // Create a dynamic assembly
        Assembly assembly = BuildAssembly(methodContent);

        // Get the ReverseWord method from the assembly
        MethodInfo method = assembly.GetType("TempNamespace.TempClass").GetMethod("ReverseWord");

        // Act
        string result = (string)method.Invoke(null, new object[] { word });

        // Assert
        bool passed = result == expected;
        string testName = "ReverseWord_WithValidInput_ReturnsReversedWord";
        Tuple<string, bool> testResult = Tuple.Create(testName, passed);
        testResults.Add(testResult);
    }
    [Test]
    public void ReverseWord_WithEmptyInput_ReturnsEmptyString()
    {
        // Arrange
        string word = string.Empty;
        string expected = string.Empty;

        // Read the method content from the temporary file
        string methodContent = GetMethodFromTempFile();

        // Create a dynamic assembly
        Assembly assembly = BuildAssembly(methodContent);

        // Get the ReverseWord method from the assembly
        MethodInfo method = assembly.GetType("TempNamespace.TempClass").GetMethod("ReverseWord");

        // Act
        string result = (string)method.Invoke(null, new object[] { word });

        // Assert
        bool passed = result == expected;
        string testName = "ReverseWord_WithEmptyInput_ReturnsEmptyString";
        Tuple<string, bool> testResult = Tuple.Create(testName, passed);
        testResults.Add(testResult);
    }
    
    private Assembly BuildAssembly(string methodContent)
    {
        // Define the class and method
        string className = "TempNamespace.TempClass";
        string code = $@"
        using System;
        namespace TempNamespace
        {{
            public static class TempClass
            {{
                {methodContent}
            }}
        }}";

        // Create syntax tree from code
        SyntaxTree syntaxTree = CSharpSyntaxTree.ParseText(code);

        // Define compilation options
        CSharpCompilationOptions compilationOptions = new CSharpCompilationOptions(OutputKind.DynamicallyLinkedLibrary);

        // Create compilation
        CSharpCompilation compilation = CSharpCompilation.Create("TempAssembly")
            .WithOptions(compilationOptions)
            .AddReferences(MetadataReference.CreateFromFile(typeof(object).Assembly.Location))
            .AddSyntaxTrees(syntaxTree);

        using (MemoryStream ms = new MemoryStream())
        {
            // Emit the assembly to a memory stream
            EmitResult emitResult = compilation.Emit(ms);

            if (!emitResult.Success)
            {
                // Handle compilation errors
                IEnumerable<Diagnostic> failures = emitResult.Diagnostics.Where(diagnostic =>
                    diagnostic.IsWarningAsError || diagnostic.Severity == DiagnosticSeverity.Error);

                string errorMessage = string.Join(Environment.NewLine, failures.Select(diagnostic => diagnostic.ToString()));
                Console.Error.WriteLine(errorMessage);

                throw new Exception("Failed to compile the code.");
            }

            // Load the assembly from the memory stream
            ms.Seek(0, SeekOrigin.Begin);
            Assembly assembly = Assembly.Load(ms.ToArray());

            return assembly;
        }
    }
}
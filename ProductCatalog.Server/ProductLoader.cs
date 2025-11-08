using ProductCatalog.Server;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks.Dataflow;

namespace ProductCatalog;

/**********************************************************/
// PRODUCT CLASS
/**********************************************************/
public class Product
{
    /**********************************************************/
    // VARIABLES
    /**********************************************************/
    private string _sku = string.Empty;
    private string _category = string.Empty;
    private string _price = string.Empty;
    private int _length;
    private int _width;
    private string _description = string.Empty;

    /**********************************************************/
    // GETTERS & SETTERS
    /**********************************************************/
    public string sku { get => _sku; set => _sku = value; }
    public string category { get => _category; set => _category = value; }
    public string price { get => _price; set => _price = value; }
    public int width { get => _width; set => _width = value; }
    public int length { get => _length; set => _length = value; }
    public string description { get => _description; set => _description = value; }
}

/**********************************************************/
// PRODUCT LIST CLASS
// Loading the actual products from JSONL file
/**********************************************************/
public class ProductList : List<Product>
{
    private static string _filePath = @"C:\Users\romancampbell\source\repos\csharp_projects\StrExamples\data\output.jsonl";

    public static void LoadFromJsonl()
    {
        var productList = new ProductList();
        if (!File.Exists(_filePath))
        {
            Console.WriteLine($"File not found: {_filePath}");
            //return productList;
        }

        // Set up JSON serializer options
        var options = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        };

        List<Product> productObjects = new List<Product>();
        var dbManager = new DatabaseManager();

        try
        {
            // Read lines from output.jsonl and deserialize and prep for writing to database
            foreach (string line in File.ReadLines(_filePath))
            {
                if (!string.IsNullOrWhiteSpace(line))
                {
                    try
                    {
                        Product? obj = JsonSerializer.Deserialize<Product>(line, options);
                        if (obj != null)
                        {
                            productObjects.Add(obj);
                            dbManager.InsertAllProducts(productObjects);
                        }
                        else
                        {
                            Console.WriteLine($"Deserialized object is null for line: {line}");
                        }
                    }

                    catch (JsonException ex)
                    {
                        Console.WriteLine($"Error deserializing JSON line: {line} - {ex.Message}");
                    }
                }
            }
        }
        catch (IOException ex)
        {
            Console.WriteLine($"Error reading file: {ex.Message}");
        }
        
    }
}
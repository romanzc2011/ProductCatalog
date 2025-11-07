using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Text.Json;

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
    private string _price;
    private int _length;
    private int _width;
    private string _description = string.Empty;

    /**********************************************************/
    // GETTERS & SETTERS
    /**********************************************************/
    public string Sku { get => _sku; set => _sku = value; }
    public string Category { get => _category; set => _category = value; }
    public string Price { get => _price; set => _price = value; }
    public int Width { get => _width; set => _width = value; }
    public int Length { get => _length; set => _length = value; }
    public string Description { get => _description; set => _description = value; }
}

/**********************************************************/
// PRODUCT LIST CLASS
// Loading the actual products from JSONL file
/**********************************************************/
public class ProductList : List<Product>
{
    private static string _filePath = @"C:\Users\romancampbell\source\repos\ProductCatalog\data\output.jsonl";

    public static void LoadFromJsonl()
    {
        var productList = new ProductList();
        if (!File.Exists(_filePath))
        {
            Console.WriteLine($"File not found: {_filePath}");
            //return productList;
        }

        List<Product> productObjects = new List<Product>();

        try
        {
            foreach (string line in File.ReadLines(_filePath))
            {
                if (!string.IsNullOrWhiteSpace(line))
                {
                    try
                    {
                        Product? obj = JsonSerializer.Deserialize<Product>(line);
                        productObjects.Add(obj);
                    }
                    catch (JsonException ex)
                    {
                        Console.WriteLine($"Error deserializing JSON line: {line} - {ex.Message}");
                    }
                }
            }

            // Test writelines
            foreach (var product in productObjects)
            {
                Console.WriteLine(product.Sku);
                Console.WriteLine(product.Category);
                Console.WriteLine(product.Price);
                Console.WriteLine(product.Length);
            }
        }
        catch (IOException ex)
        {
            Console.WriteLine($"Error reading file: {ex.Message}");
        }
        
    }
}

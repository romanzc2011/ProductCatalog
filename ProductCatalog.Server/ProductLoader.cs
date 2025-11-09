using ProductCatalog.Server;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks.Dataflow;

namespace ProductCatalog;
/**********************************************************/
// PRODUCT LIST CLASS
// Loading the actual products from JSONL file
//  var dbPath = Path.Combine(AppContext.BaseDirectory, "product_catalog.db");
/**********************************************************/
public class ProductLoader : List<Product>
{
    // Load from a provided file path and use the provided DatabaseManager (single source of truth)
    public static List<Product> LoadFromJsonl(string filePath, DatabaseManager dbManager)
    {
        var productList = new ProductLoader();

        if (string.IsNullOrWhiteSpace(filePath) || !File.Exists(filePath))
        {
            Console.WriteLine($"File not found: {filePath}");
            return productList;
        }

        // Set up JSON serializer options
        var options = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        };

        List<Product> productObjects = new List<Product>();

        try
        {
            // Read lines from output.jsonl and deserialize and prep for writing to database
            foreach (string line in File.ReadLines(filePath))
            {
                if (string.IsNullOrWhiteSpace(line))
                    continue;

                try
                {
                    Product? obj = JsonSerializer.Deserialize<Product>(line, options);
                    if (obj != null)
                    {
                        productObjects.Add(obj);
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

            if (productObjects.Count > 0)
            {
                dbManager.InsertAllProducts(productObjects);
            }
        }
        catch (IOException ex)
        {
            Console.WriteLine($"Error reading file: {ex.Message}");
        }
        return productObjects;
    }
}
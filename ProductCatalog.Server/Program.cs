using ProductCatalog;
using ProductCatalog.Server;

var builder = WebApplication.CreateBuilder(args);
string? connectionString = builder.Configuration.GetConnectionString("ProductCatalog");

// Read config file path from env
string? cfgFilePath = builder.Configuration["DataFiles:ProductsJsonl"];
if (string.IsNullOrEmpty(cfgFilePath))
{
    cfgFilePath = @"../data/output.jsonl";
}

// Resolve absolute path
string resolvedCfgFilePath = Path.IsPathRooted(cfgFilePath)
    ? cfgFilePath
    : Path.GetFullPath(Path.Combine(builder.Environment.ContentRootPath, cfgFilePath));

Console.WriteLine($"Using product JSONL file path: {resolvedCfgFilePath}");

if (string.IsNullOrEmpty(connectionString))
{
    throw new InvalidOperationException("Connection string 'ProductCatalog' not found.");
}

// Initialize DatabaseManager
DatabaseManager dbManager = new DatabaseManager(connectionString);

var app = builder.Build();

// Check database tables and insert
dbManager.CheckAndCreateTables();
bool isEmpty = dbManager.IsProductsTableEmpty();

if (isEmpty)
{
    if (File.Exists(cfgFilePath))
    {
        // Load products from JSONL file and insert into database
        List<Product> products = ProductLoader.LoadFromJsonl(cfgFilePath);
        dbManager.InsertAllProducts(products);
    }
    else
    {
        Console.WriteLine($"Product JSONL file not found at path: {cfgFilePath}");
    }
}

app.UseRouting();

app.MapGet("/api/GetAllProducts", () =>
{
    var products = dbManager.GetAllProducts();
    return Results.Ok(products);
});

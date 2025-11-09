using ProductCatalog;
using ProductCatalog.Server;

var builder = WebApplication.CreateBuilder(args);
string? connectionString = builder.Configuration.GetConnectionString("ProductCatalog");
string cfgPath = builder.Configuration["DataFiles:ProductsJsonl"] ?? "data/output.jsonl";
string cfgFilePath = Path.IsPathRooted(cfgPath)
    ? cfgPath
    : Path.Combine(AppContext.BaseDirectory, cfgPath);

if (string.IsNullOrEmpty(connectionString))
{
    throw new InvalidOperationException("Connection string 'ProductCatalog' not found.");
}

// Initialize DatabaseManager
DatabaseManager dbManager = new DatabaseManager(connectionString);

// Config output path


var app = builder.Build();

// Check database tables and insert
dbManager.CheckAndCreateTables();
bool isEmpty = dbManager.IsProductsTableEmpty();

if (isEmpty)
{
    // Load products from JSONL file and insert into database
    List<Product> products = ProductLoader.LoadFromJsonl(configuredFilePath);
}

app.UseRouting();

app.MapGet("/api/GetAllProducts", () =>
{
    var products = dbManager.GetAllProducts();
    return Results.Ok(products);
});

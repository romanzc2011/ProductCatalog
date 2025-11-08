using ProductCatalog;
using ProductCatalog.Server;

var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration.GetConnectionString("ProductCatalog");
DatabaseManager dbManager = new DatabaseManager(connectionString);

// Config output path
builder.Services.AddSingleton(sp =>
{
    var cfg = sp.GetRequiredService<IConfiguration>();
    var configured = cfg["DataFiles:ProductsJsonl"] ?? "data/output.jsonl";
    var path = Path.IsPathRooted(configured)
        ? configured
        : Path.Combine(AppContext.BaseDirectory, configured);
    return new Product(path);
});

var app = builder.Build();

// Check database tables and insert
dbManager.CheckAndCreateTables();
bool isEmpty = dbManager.IsProductsTableEmpty();

if (isEmpty)
{
    // Load products from JSONL file and insert into database
    var products = ProductList.LoadFromJsonl();
}

app.UseRouting();

app.MapGet("/api/GetAllProducts", () =>
{
    var products = dbManager.GetAllProducts();
    return Results.Ok(products);
});)

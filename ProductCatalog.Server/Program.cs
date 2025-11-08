using ProductCatalog.Server;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.UseRouting();

app.MapGet("/api/GetAllProducts", () =>
{
    var dbManager = new DatabaseManager();
    var products = dbManager.GetAllProducts();
    return Results.Ok(products);
});)

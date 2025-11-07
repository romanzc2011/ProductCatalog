using ProductCatalog;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

app.UseDefaultFiles();
app.MapStaticAssets();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

//var products = ProductList.LoadFromJsonl();
//Console.WriteLine($"Loaded {products.Count} products.");
//foreach (var p in products)
//{
//       Console.WriteLine($"SKU: {p.Sku}, Category: {p.Category}, Price: {p.Price}, Length: {p.Length}, Description: {p.Description}");
//}

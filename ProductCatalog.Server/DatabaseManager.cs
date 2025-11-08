using Microsoft.Data.Sqlite;
using System;
using System.Runtime.CompilerServices;

namespace ProductCatalog.Server
{
    public class DatabaseManager
    {
        private readonly string _connectionString;

        /**********************************************************/
        // CONSTRUCTOR
        /**********************************************************/
        public DatabaseManager()
        {
            var dbPath = Path.Combine(AppContext.BaseDirectory, "product_catalog.db");
            _connectionString = $"Data Source={dbPath}";
        }

        private SqliteConnection GetConnection()
        {
            return new SqliteConnection(_connectionString);
        }

        /**********************************************************/
        // INSERT ALL PRODUCTS
        /**********************************************************/
        public void InsertAllProducts(List<Product> products)
        {
            using (var connection = this.GetConnection())
            {
                connection.Open();
                using (var transaction = connection.BeginTransaction())
                {
                    try
                    {
                        var insertCommand = connection.CreateCommand();
                        insertCommand.CommandText = @"
                            INSERT INTO Products (Sku, Category, Price, Width, Length, Description)
                            VALUES ($sku, $category, $price, $width, $length, $description)";
                        foreach (var product in products)
                        {
                            insertCommand.Parameters.Clear();
                            insertCommand.Parameters.AddWithValue("$sku",           product.sku);
                            insertCommand.Parameters.AddWithValue("$category",      product.category);
                            insertCommand.Parameters.AddWithValue("$price",         product.price);
                            insertCommand.Parameters.AddWithValue("$width",         product.width);
                            insertCommand.Parameters.AddWithValue("$length",        product.length);
                            insertCommand.Parameters.AddWithValue("$description",   product.description);
                            insertCommand.ExecuteNonQuery();
                        }
                        transaction.Commit();
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine($"Error inserting products: {ex.Message}");
                        transaction.Rollback();
                    }
                }
            }
        }

        /**********************************************************/
        // GET ALL PRODUCTS
        /**********************************************************/
        protected List<Product> GetAllProducts()
        {
            var products = new List<Product>();
            
            try
            {
                using (var connection = this.GetConnection())
                {
                    connection.Open();

                    using var selectCommand = connection.CreateCommand();
                    selectCommand.CommandText = "SELECT * FROM products";

                    using var reader = selectCommand.ExecuteReader();
                    while (reader.Read())
                    {
                        var product = new Product
                        {
                            sku = reader.GetString(reader.GetOrdinal("SKU")),
                        }
                    }
                }
            }
        }
    }
}

using Microsoft.Data.Sqlite;
using System;
using System.Runtime.CompilerServices;

namespace ProductCatalog.Server
{
    public class DatabaseManager
    {
        private readonly string _connectionString;
        public string connectionString { get => _connectionString; }

        /**********************************************************/
        // CONSTRUCTOR
        /**********************************************************/
        public DatabaseManager(string connectionString)
        {
            _connectionString = connectionString;
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
                            INSERT INTO products (Sku, Category, Price, Width, Length, Description)
                            VALUES ($sku, $category, $price, $width, $length, $description)";
                        foreach (var product in products)
                        {
                            insertCommand.Parameters.Clear();
                            insertCommand.Parameters.AddWithValue("$sku", product.sku);
                            insertCommand.Parameters.AddWithValue("$category", product.category);
                            insertCommand.Parameters.AddWithValue("$price", product.price);
                            insertCommand.Parameters.AddWithValue("$width", product.width);
                            insertCommand.Parameters.AddWithValue("$length", product.length);
                            insertCommand.Parameters.AddWithValue("$description", product.description);
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
        // Returns a list of all products in database when called from frontend
        /**********************************************************/
        public List<Product> GetAllProducts()
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
                            category = reader.GetString(reader.GetOrdinal("CATEGORY")),
                            price = reader.GetString(reader.GetOrdinal("PRICE")),
                            width = reader.GetInt32(reader.GetOrdinal("WIDTH")),
                            length = reader.GetInt32(reader.GetOrdinal("LENGTH")),
                            description = reader.GetString(reader.GetOrdinal("DESCRIPTION"))
                        };
                        products.Add(product);
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error retrieving products: {ex.Message}");
            }
            return products;
        }

        /**********************************************************/
        // IS PRODUCTS TABLE EMPTY
        /**********************************************************/
        public bool IsProductsTableEmpty()
        {
            try
            {
                using (var connection = this.GetConnection())
                {
                    connection.Open();

                    using var cmd = connection.CreateCommand();
                    cmd.CommandText = "SELECT COUNT(*) FROM products";

                    var count = Convert.ToInt32(cmd.ExecuteScalar());
                    return (count == 0);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error checking products table: {ex.Message}");
                return true; // Assume empty on error
            }
        }

        /**********************************************************/
        // CREATE TABLE IF NOT EXISTS
        /**********************************************************/
        public void CheckAndCreateTables()
        {
            try
            {
                using (var connection = this.GetConnection())
                {
                    connection.Open();
                    using var cmd = connection.CreateCommand();
                    cmd.CommandText = @"
                        CREATE TABLE IF NOT EXISTS Products (
                            SKU TEXT PRIMARY KEY NOT NULL,
                            CATEGORY TEXT NOT NULL,
                            PRICE TEXT NOT NULL,
                            WIDTH INTEGER NOT NULL,
                            LENGTH INTEGER NOT NULL,
                            DESCRIPTION TEXT NOT NULL
                        )";
                    cmd.ExecuteNonQuery();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error creating products table: {ex.Message}");
            }
        }
    }
}

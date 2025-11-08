using Microsoft.Data.Sqlite;
using System;

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
        public void InsertAllProducts()
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
                        insertCommand.Parameters.Add("$sku",         SqliteType.Text);
                        insertCommand.Parameters.Add("$category",    SqliteType.Text);
                        insertCommand.Parameters.Add("$price",       SqliteType.Real);
                        insertCommand.Parameters.Add("$width",       SqliteType.Real);
                        insertCommand.Parameters.Add("$length",      SqliteType.Real);
                        insertCommand.Parameters.Add("$description", SqliteType.Text);

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
    }
}

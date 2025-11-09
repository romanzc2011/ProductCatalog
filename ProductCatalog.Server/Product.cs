namespace ProductCatalog.Server
{
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
        private string _price = string.Empty;
        private int _length;
        private int _width;
        private string _description = string.Empty;

        // Parameterless ctor for deserialization
        public Product() { }

        // Keep constructor used by Program.cs to avoid breaking registration
        public Product(string filePath) { }

        /**********************************************************/
        // GETTERS & SETTERS
        /**********************************************************/
        public string sku { get => _sku; set => _sku = value; }
        public string category { get => _category; set => _category = value; }
        public string price { get => _price; set => _price = value; }
        public int width { get => _width; set => _width = value; }
        public int length { get => _length; set => _length = value; }
        public string description { get => _description; set => _description = value; }
    }
}

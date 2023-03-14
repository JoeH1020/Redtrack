using System;
namespace RedTechAPI
{
    public class Order
    {
        public Guid OrderId { get; set; }
        public string OrderType { get; set; } = string.Empty;
        public string CustomerName { get; set; } = string.Empty;
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
        public string CreatedByUsername { get; set; } = string.Empty;
    }

}



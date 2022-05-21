using System;
namespace backend.Models
{
    public class DatabaseSettings : IDatabaseSettings
    {
        public string ProjectCollectionName { get; set; } = string.Empty;
        public string EntrepreneurCollectionName { get; set; } = string.Empty;
        public string DonationCollectionName { get; set; } = string.Empty;
        public string ContributorCollectionName { get; set; } = string.Empty;
        public string ChatCollectionName { get; set; } = string.Empty;
        public string MessageCollectionName { get; set; } = string.Empty;
        public string ConnectionString { get; set; } = string.Empty;
        public string DatabaseName { get; set; } = string.Empty;
    }
}

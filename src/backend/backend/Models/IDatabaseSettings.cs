using System;
namespace backend.Models
{
    public interface IDatabaseSettings
    {
        string ProjectCollectionName { get; set; }
        string EntrepreneurCollectionName { get; set; }
        string DonationCollectionName { get; set; }
        string ContributorCollectionName { get; set; }
        string ChatCollectionName { get; set; }
        string MessageCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}

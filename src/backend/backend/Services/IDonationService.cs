using System.Collections.Generic;
using backend.Models;

namespace backend.Services
{
    public interface IDonationService
    {
        List<Donation> Get();
        Donation Get(string id);
        Donation Create(Donation donation);
        List<Donation> LitsContributorDonations(string contributorId);
        List<Donation> LitsProjectFunds(string projectId);
        void Update(string id, Donation donation);
        void Remove(string id);
    }
}

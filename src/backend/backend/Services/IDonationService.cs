using System.Collections.Generic;
using backend.Models;

namespace backend.Services
{
    public interface IDonationService
    {
        List<Donation> Get();
        Donation Get(string id);
        Donation Create(Donation donation);
        void Update(string id, Donation donation);
        void Remove(string id);
    }
}

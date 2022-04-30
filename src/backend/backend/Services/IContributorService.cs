using System.Collections.Generic;
using backend.Models;

namespace backend.Services
{
    public interface IContributorService
    {
        List<Contributor> Get();
        Contributor Get(string id);
        Contributor Create(Contributor contributor);
        void AddProjectToInterest(string contributorId, string projectId);
        float Recharge(string id, float rechargeAmount);
        void Update(string id, Contributor contributor);
        void Remove(string id);
    }
}

using System.Collections.Generic;
using backend.Models;

namespace backend.Services
{
    public interface IEntrepreneurService
    {
        List<Entrepreneur> Get();
        Entrepreneur Get(string id);
        Entrepreneur Create(Entrepreneur entrepreneur);
        void Update(string id, Entrepreneur entrepreneur);
        void Remove(string id);
    }
}

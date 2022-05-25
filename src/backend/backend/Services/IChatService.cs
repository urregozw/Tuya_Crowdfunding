using System.Collections.Generic;
using backend.Models;

namespace backend.Services
{
	public interface IChatService
	{
        List<Chat> Get();
        Chat Get(string id);
        Chat Create(Chat chat);
        Chat Find(string contributorId, string entrepreneurId);
        List<Chat> FindByUser(string user);
        List<Message> GetMessages(string id);
        void Update(string id, Chat chat);
        void Remove(string id);
    }
}


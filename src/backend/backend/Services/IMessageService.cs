using System.Collections.Generic;
using backend.Models;

namespace backend.Services
{
	public interface IMessageService
	{
        List<Message> Get();
        Message Get(string id);
        Message Create(Message message);
        void Update(string id, Message message);
        void Remove(string id);
    }
}


using System;
using System.Collections.Generic;
using MongoDB.Driver;
using backend.Models;

namespace backend.Services
{
    public class MessageService : IMessageService
    {
        private readonly IMongoCollection<Message> _messages;
        private readonly IMongoCollection<Chat> _chats;


        public MessageService(IDatabaseSettings settings, IMongoClient mongoClient)
        {
            var database = mongoClient.GetDatabase(settings.DatabaseName);
            _messages = database.GetCollection<Message>(settings.MessageCollectionName);
            _chats = database.GetCollection<Chat>(settings.ChatCollectionName);

        }

        public Message Create(Message message)
        {
            _messages.InsertOne(message);
            Chat currentChat = _chats.Find(chat => chat.Id == message.Chat).FirstOrDefault();
            if (currentChat.Messages == null)
            {
                currentChat.Messages = new string[] { message.Id };
            }
            else
            {
                currentChat.Messages.Add(message.Id);
            }
            _chats.ReplaceOne(entrepreneur => entrepreneur.Id == currentChat.Id, currentChat);
            return message;
        }

        public List<Message> Get()
        {
            return _messages.Find(message => true).ToList();
        }

        public Message Get(string id)
        {
            return _messages.Find(message => message.Id == id).FirstOrDefault();
        }

        public void Remove(string id)
        {
            _messages.DeleteOne(message => message.Id == id);
        }

        public void Update(string id, Message message)
        {
            _messages.ReplaceOne(message => message.Id == id, message);
        }
    }
}
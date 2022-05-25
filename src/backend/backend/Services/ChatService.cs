using System;
using System.Collections.Generic;
using MongoDB.Driver;
using backend.Models;

namespace backend.Services
{
    public class ChatService : IChatService
    {
        private readonly IMongoCollection<Chat> _chats;
        private readonly IMongoCollection<Message> _messages;
        private readonly IMongoCollection<Entrepreneur> _entrepreneurs;
        private readonly IMongoCollection<Contributor> _contributors;

        public ChatService(IDatabaseSettings settings, IMongoClient mongoClient)
        {
            var database = mongoClient.GetDatabase(settings.DatabaseName);
            _chats = database.GetCollection<Chat>(settings.ChatCollectionName);
            _messages = database.GetCollection<Message>(settings.MessageCollectionName);
            _entrepreneurs = database.GetCollection<Entrepreneur>(settings.EntrepreneurCollectionName);
            _contributors = database.GetCollection<Contributor>(settings.ContributorCollectionName);
        }

        public Chat Create(Chat chat)
        {
            _chats.InsertOne(chat);
            Entrepreneur currentEntrepreneur = _entrepreneurs.Find(entrepreneur => entrepreneur.Id == chat.Entrepreneur).FirstOrDefault();
            if (currentEntrepreneur.Chats == null)
            {
                currentEntrepreneur.Chats = new string[] { chat.Id };
            }
            else
            {
                currentEntrepreneur.Chats.Add(chat.Id);
            }
            _entrepreneurs.ReplaceOne(entrepreneur => entrepreneur.Id == currentEntrepreneur.Id, currentEntrepreneur);
            Contributor currentContributor = _contributors.Find(contributor => contributor.Id == chat.Contributor).FirstOrDefault();
            if (currentContributor.Chats == null)
            {
                currentContributor.Chats = new string[] { chat.Id };
            }
            else
            {
                currentContributor.Chats.Add(chat.Id);
            }
            _contributors.ReplaceOne(contributor => contributor.Id == currentContributor.Id, currentContributor);
            return chat;
        }

        public List<Chat> Get()
        {
            return _chats.Find(chat => true).ToList();
        }

        public Chat Get(string id)
        {
            return _chats.Find(chat => chat.Id == id).FirstOrDefault();
        }

        public List<Message> GetMessages(string id)
        {
            return _messages.Find(message => message.Chat == id).ToList();
        }

        public Chat Find(string contributorId, string entrepreneurId)
        {
            return _chats.Find(chat => (chat.Contributor == contributorId && chat.Entrepreneur == entrepreneurId)).FirstOrDefault();
        }

        public List<Chat> FindByUser(string user)
        {
            return _chats.Find(chat => (chat.Contributor == user || chat.Entrepreneur == user)).ToList();
        }
        public void Remove(string id)
        {
            _chats.DeleteOne(chat => chat.Id == id);
        }

        public void Update(string id, Chat chat)
        {
            _chats.ReplaceOne(chat => chat.Id == id, chat);
        }
    }
}
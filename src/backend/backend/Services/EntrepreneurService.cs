using System;
using System.Collections.Generic;
using MongoDB.Driver;
using backend.Models;

namespace backend.Services
{
    public class EntrepreneurService : IEntrepreneurService
    {
        private readonly IMongoCollection<Entrepreneur> _entrepreneurs;

        public EntrepreneurService(IDatabaseSettings settings, IMongoClient mongoClient)
        {
            var database = mongoClient.GetDatabase(settings.DatabaseName);
            _entrepreneurs = database.GetCollection<Entrepreneur>(settings.EntrepreneurCollectionName);
        }

        public Entrepreneur Create(Entrepreneur entrepreneur)
        {
            _entrepreneurs.InsertOne(entrepreneur);
            return entrepreneur;
        }

        public List<Entrepreneur> Get()
        {
            return _entrepreneurs.Find(entrepreneur => true).ToList();
        }

        public Entrepreneur Get(string id)
        {
            return _entrepreneurs.Find(entrepreneur => entrepreneur.Id == id).FirstOrDefault();
        }

        public void Remove(string id)
        {
            _entrepreneurs.DeleteOne(entrepreneur => entrepreneur.Id == id);
        }

        public void Update(string id, Entrepreneur entrepreneur)
        {
            _entrepreneurs.ReplaceOne(entrepreneur => entrepreneur.Id == id, entrepreneur);
        }
    }
}

using System;
using System.Collections.Generic;
using MongoDB.Driver;
using backend.Models;

namespace backend.Services
{
    public class ContributorService : IContributorService
    {
        private readonly IMongoCollection<Contributor> _contributor;

        public ContributorService(IDatabaseSettings settings, IMongoClient mongoClient)
        {
            var database = mongoClient.GetDatabase(settings.DatabaseName);
            _contributor = database.GetCollection<Contributor>(settings.ContributorCollectionName);
        }

        public Contributor Create(Contributor contributor)
        {
            _contributor.InsertOne(contributor);
            return contributor;
        }

        public List<Contributor> Get()
        {
            return _contributor.Find(contributor => true).ToList();
        }

        public Contributor Get(string id)
        {
            return _contributor.Find(contributor => contributor.Id == id).FirstOrDefault();
        }

        public void AddProjectToInterest(string contributorId, string projectId)
        {
            Contributor contributor = _contributor.Find(contributor => contributor.Id == contributorId).FirstOrDefault();
            if(contributor.ProjectOfInterest.Contains(projectId)) {
                throw new Exception("Project already added");
            }
            contributor.ProjectOfInterest.Add(projectId);
            _contributor.ReplaceOne(contributor => contributor.Id == contributorId, contributor);

        }

        public void RemoveProjectOfInterest(string contributorId, string projectId)
        {
            Contributor contributor = _contributor.Find(contributor => contributor.Id == contributorId).FirstOrDefault();
            if (contributor.ProjectOfInterest.Contains(projectId))
            {
                contributor.ProjectOfInterest.Remove(projectId);
                _contributor.ReplaceOne(contributor => contributor.Id == contributorId, contributor);
                return;
            }
            throw new Exception("Project is not in interest");
        }

        public void Remove(string id)
        {
            _contributor.DeleteOne(contributor => contributor.Id == id);
        }

        public void Update(string id, Contributor contributor)
        {
            _contributor.ReplaceOne(contributor => contributor.Id == id, contributor);
        }

        public float Recharge(string id, float rechargeAmount)
        {
            Contributor contributor = _contributor.Find(contributor => contributor.Id == id).FirstOrDefault();
            contributor.Money += rechargeAmount;
            float totalMoney = contributor.Money;
            _contributor.ReplaceOne(contributor => contributor.Id == id, contributor);
            return totalMoney;
        }
    }
}
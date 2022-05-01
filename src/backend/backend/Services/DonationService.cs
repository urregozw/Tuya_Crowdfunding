using System;
using System.Collections.Generic;
using MongoDB.Driver;
using backend.Models;

namespace backend.Services
{
    public class DonationService : IDonationService
    {
        private readonly IMongoCollection<Donation> _donation;
        private readonly IMongoCollection<Project> _projects;
        private readonly IMongoCollection<Contributor> _contributors;


        public DonationService(IDatabaseSettings settings, IMongoClient mongoClient)
        {
            var database = mongoClient.GetDatabase(settings.DatabaseName);
            _donation = database.GetCollection<Donation>(settings.DonationCollectionName);
            _projects = database.GetCollection<Project>(settings.ProjectCollectionName);
            _contributors = database.GetCollection<Contributor>(settings.ContributorCollectionName);
        }

        public Donation Create(Donation donation)
        {
            _donation.InsertOne(donation);
            Project currentProject = _projects.Find(project => project.Id == donation.Project).FirstOrDefault();
            currentProject.Donations.Add(donation.Id);
            currentProject.FundsCollected += donation.DonatedFunds;
            currentProject.Backers += 1;
            _projects.ReplaceOne(project => project.Id == currentProject.Id, currentProject);
            Contributor currentContributor = _contributors.Find(contributor => contributor.Id == donation.Contributor).FirstOrDefault();
            currentContributor.Donations.Add(donation.Id);
            currentContributor.Money -= donation.DonatedFunds;
            _contributors.ReplaceOne(contributor => contributor.Id == currentContributor.Id, currentContributor);
            return donation;
        }

        public List<Donation> Get()
        {
            return _donation.Find(donation => true).ToList();
        }

        public Donation Get(string id)
        {
            return _donation.Find(donation => donation.Id == id).FirstOrDefault();
        }

        public void Remove(string id)
        {
            Donation donation = _donation.Find(donation => donation.Id == id).FirstOrDefault();
            Project currentProject = _projects.Find(project => project.Id == donation.Project).FirstOrDefault();
            currentProject.Donations.Remove(donation.Id);
            currentProject.FundsCollected -= donation.DonatedFunds;
            currentProject.Backers -= 1;
            _projects.ReplaceOne(project => project.Id == currentProject.Id, currentProject);
            Contributor currentContributor = _contributors.Find(contributor => contributor.Id == donation.Contributor).FirstOrDefault();
            currentContributor.Donations.Remove(donation.Id);
            currentContributor.Money += donation.DonatedFunds;
            _contributors.ReplaceOne(contributor => contributor.Id == currentContributor.Id, currentContributor);
            _donation.DeleteOne(donation => donation.Id == id);
        }

        public void Update(string id, Donation donation)
        {
            Donation oldDonation = _donation.Find(donation => donation.Id == id).FirstOrDefault();
            Project currentProject = _projects.Find(project => project.Id == oldDonation.Project).FirstOrDefault();
            currentProject.FundsCollected = currentProject.FundsCollected - oldDonation.DonatedFunds + donation.DonatedFunds;
            _projects.ReplaceOne(project => project.Id == currentProject.Id, currentProject);
            Contributor currentContributor = _contributors.Find(contributor => contributor.Id == donation.Contributor).FirstOrDefault();
            currentContributor.Money = currentContributor.Money + oldDonation.DonatedFunds - donation.DonatedFunds;
            _contributors.ReplaceOne(contributor => contributor.Id == currentContributor.Id, currentContributor);
            _donation.ReplaceOne(donation => donation.Id == id, donation);
        }

        public List<Donation> LitsContributorDonations(string contributorId)
        {
            return _donation.Find(donation => donation.Contributor == contributorId).ToList();
        }

        public List<Donation> LitsProjectFunds(string projectId)
        {
            return _donation.Find(donation => donation.Project == projectId).ToList();
        }

    }
}

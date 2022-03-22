using System;
using System.Collections.Generic;
using MongoDB.Driver;
using backend.Models;

namespace backend.Services
{
    public class ProjectService : IProjectService
    {
        private readonly IMongoCollection<Project> _projects;

        public ProjectService(IDatabaseSettings settings, IMongoClient mongoClient)
        {
            var database = mongoClient.GetDatabase(settings.DatabaseName);
            _projects = database.GetCollection<Project>(settings.ProjectCollectionName);
        }

        public Project Create(Project project)
        {
            _projects.InsertOne(project);
            return project;
        }

        public List<Project> Get()
        {
            return _projects.Find(project => true).ToList();
        }

        public Project Get(string id)
        {
            return _projects.Find(project => project.Id == id).FirstOrDefault();
        }

        public void Remove(string id)
        {
            _projects.DeleteOne(project => project.Id == id);
        }

        public void Update(string id, Project project)
        {
            _projects.ReplaceOne(project => project.Id == id, project);
        }
    }
}

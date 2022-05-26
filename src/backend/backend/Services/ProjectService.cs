using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using MongoDB.Driver;
using backend.Models;

namespace backend.Services
{
    public class ProjectService : IProjectService
    {
        private readonly IMongoCollection<Project> _projects;
        private readonly IMongoCollection<Entrepreneur> _entrepreneurs;

        public ProjectService(IDatabaseSettings settings, IMongoClient mongoClient)
        {
            var database = mongoClient.GetDatabase(settings.DatabaseName);
            _projects = database.GetCollection<Project>(settings.ProjectCollectionName);
            _entrepreneurs = database.GetCollection<Entrepreneur>(settings.EntrepreneurCollectionName);
        }
        public Project Create(Project project)
        {
            _projects.InsertOne(project);
            Entrepreneur currentEntrepreneur = _entrepreneurs.Find(entrepreneur => entrepreneur.Id == project.Entrepreneur).FirstOrDefault();
            currentEntrepreneur.Projects.Add(project.Id);
            _entrepreneurs.ReplaceOne(entrepreneur => entrepreneur.Id == currentEntrepreneur.Id, currentEntrepreneur);
            return project;
        }

        public List<Project> Get()
        {
            var allProjects = _projects.Find(project => true).ToList();
            return allProjects.FindAll(project => (project.CreationDate > DateTime.Now.AddDays(-Convert.ToDouble(project.Duration))) && (project.Status == 1));
        }

        public List<Project> GetAll()
        {
            return _projects.Find(project => true).ToList();
        }

        public List<Project> Search(string filter)
        {
            Regex regex = new Regex(filter);
            var allProjects = _projects.Find(project => true).ToList();
            return allProjects.FindAll(project => regex.Match(project.Title).Success);
        }

        public Project Get(string id)
        {
            return _projects.Find(project => project.Id == id).FirstOrDefault();
        }

        public List<Project> GetByUserId(string id)
        {
            return _projects.Find(project => project.Entrepreneur == id).ToList();
        }

        public void Remove(string id)
        {
            _projects.DeleteOne(project => project.Id == id);
        }

        public void Update(string id, Project project)
        {
            if (project.Backers > 0)
            {
                throw new Exception("Can't edit Project");
            }
            _projects.ReplaceOne(project => project.Id == id, project);
        }

        public Project ApproveProject(string userId, string projectId)
        {
            Entrepreneur entrepreneur = _entrepreneurs.Find(entrepreneur => entrepreneur.Id == userId).FirstOrDefault();
            if (entrepreneur.IsStaff)
            {
                Project project = _projects.Find(project => project.Id == projectId).FirstOrDefault();
                if(project != null)
                {
                    project.Status = 1;
                    _projects.ReplaceOne(project => project.Id == projectId, project);
                    return project;
                }
                throw new Exception("Project not found");
            }
            throw new Exception("User doesn't have access");
        }

        public List<Project> GetUnapproved()
        {
            return _projects.Find(project => project.Status == 0).ToList();
        }
    }
} 
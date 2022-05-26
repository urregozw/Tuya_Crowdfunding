using System.Collections.Generic;
using backend.Models;

namespace backend.Services
{
    public interface IProjectService
    {
        List<Project> Get();
        List<Project> GetAll();
        Project Get(string id);
        List<Project> Search(string filter);
        List<Project> GetByUserId(string GetByUserId);
        Project Create(Project project);
        void Update(string id, Project project);
        void Remove(string id);
        Project ApproveProject(string userId, string projectId);
        List<Project> GetUnapproved();
    }
}

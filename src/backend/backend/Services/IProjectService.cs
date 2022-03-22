﻿using System.Collections.Generic;
using backend.Models;

namespace backend.Services
{
    public interface IProjectService
    {
        List<Project> Get();
        Project Get(string id);
        Project Create(Project project);
        void Update(string id, Project project);
        void Remove(string id);
    }
}
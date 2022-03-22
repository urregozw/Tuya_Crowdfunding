using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.Services;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly IProjectService projectService;

        public ProjectController(IProjectService projectService)
        {
            this.projectService = projectService;
        }

        // GET: api/Project
        [HttpGet]
        public ActionResult<List<Project>> Get()
        {
            return projectService.Get();
        }

        // GET: api/Project/5
        [HttpGet("{id}")]
        public ActionResult<Project> Get(string id)
        {
            var project = projectService.Get(id);

            if (project == null)
            {
                return NotFound($"Project with id = {id} not found");
            }

            return project;
        }

        // POST: api/Project
        [HttpPost]
        public ActionResult<Project> Post([FromBody] Project project)
        {
            projectService.Create(project);

            return CreatedAtAction(nameof(Get), new { id = project.Id }, project);
        }

        // PUT: api/Project/5
        [HttpPut("{id}")]
        public ActionResult Put(string id, [FromBody] Project project)
        {
            var existingProject = projectService.Get(id);

            if (existingProject == null)
            {
                return NotFound($"Project with id = {id} not found");
            }

            projectService.Update(id, project);

            return NoContent();
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public ActionResult Delete(string id)
        {
            var project = projectService.Get(id);

            if (project == null)
            {
                return NotFound($"Project with id = {id} not found");
            }

            projectService.Remove(project.Id);

            return Ok($"Project with id = {id} deleted");
        }
    }
}

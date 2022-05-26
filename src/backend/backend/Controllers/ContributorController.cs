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
    public class ContributorController : ControllerBase
    {
        private readonly IContributorService contributorService;

        public ContributorController(IContributorService contributorService)
        {
            this.contributorService = contributorService;
        }

        // GET: api/Contributor
        [HttpGet]
        public ActionResult<List<Contributor>> Get()
        {
            return contributorService.Get();
        }

        // GET: api/Contributor/5
        [HttpGet("{id}")]
        public ActionResult<Contributor> Get(string id)
        {
            var contributor = contributorService.Get(id);

            if (contributor == null)
            {
                return NotFound($"Contributor with id = {id} not found");
            }

            return contributor;
        }

        // POST: api/Contributor
        [HttpPost]
        public ActionResult<Contributor> Post([FromBody] Contributor contributor)
        {
            contributorService.Create(contributor);

            return CreatedAtAction(nameof(Get), new { id = contributor.Id }, contributor);
        }

        // PUT: api/Contributor/5
        [HttpPut("{id}")]
        public ActionResult Put(string id, [FromBody] Contributor contributor)
        {
            var existingContributor = contributorService.Get(id);

            if (existingContributor == null)
            {
                return NotFound($"Contributor with id = {id} not found");
            }

            contributorService.Update(id, contributor);

            return NoContent();
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public ActionResult Delete(string id)
        {
            var contributor = contributorService.Get(id);

            if (contributor == null)
            {
                return NotFound($"Contributor with id = {id} not found");
            }

            contributorService.Remove(contributor.Id);

            return Ok($"Contributor with id = {id} deleted");
        }

        // POST: api/Contributor
        [HttpPost("project/add")]
        public ActionResult AddProject([FromBody] FavoriteProject favoriteProject)
        {
            try
            {
                contributorService.AddProjectToInterest(favoriteProject.ContributorId, favoriteProject.ProjectId);

                return Ok($"Project with id = {favoriteProject.ProjectId} added to interest");
            }
            catch(Exception e)
            {
                return NotFound(e);
            }
        }

        // POST: api/Contributor
        [HttpPost("project/remove")]
        public ActionResult RemoveProject([FromBody] FavoriteProject favoriteProject)
        {
            try
            {
                contributorService.RemoveProjectOfInterest(favoriteProject.ContributorId, favoriteProject.ProjectId);

                return Ok($"Project with id = {favoriteProject.ProjectId} remove of interest");
            }
            catch (Exception e)
            {
                return NotFound(e);
            }
        }

        // POST: api/Contributor/recharge
        [HttpPost("recharge")]
        public ActionResult Recharge([FromBody] Recharge recharge)
        {

            float totalMoney = contributorService.Recharge(recharge.ContributorId, recharge.RechargeAmount);

            return Ok($"Recharged {recharge.RechargeAmount} amount into account. Total is {totalMoney}");
        }
    }
}

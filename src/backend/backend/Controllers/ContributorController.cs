using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
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
        public ActionResult AddProject([FromBody] JObject data)
        {
            string contributorId = data["contributorId"].ToObject<string>();
            string projectId = data["projectId"].ToObject<string>();

            contributorService.AddProjectToInterest(contributorId, projectId);

            return Ok($"Project with id = {projectId} added to interest");
        }

        // POST: api/Contributor/recharge
        [HttpPost("recharge")]
        public ActionResult Recharge([FromBody] JObject data)
        {
            string contributorId = data["contributorId"].ToObject<string>();
            float rechargeAmount = data["rechargeAmount"].ToObject<float>();

            float totalMoney = contributorService.Recharge(contributorId, rechargeAmount);

            return Ok($"Recharged {rechargeAmount} amount into account. Total is {totalMoney}");
        }
    }
}

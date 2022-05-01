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
    public class DonationController : ControllerBase
    {
        private readonly IDonationService donationService;

        public DonationController(IDonationService donationService)
        {
            this.donationService = donationService;
        }

        // GET: api/Donation
        [HttpGet]
        public ActionResult<List<Donation>> Get()
        {
            return donationService.Get();
        }

        // GET: api/Donation/5
        [HttpGet("{id}")]
        public ActionResult<Donation> Get(string id)
        {
            var donation = donationService.Get(id);

            if (donation == null)
            {
                return NotFound($"Donation with id = {id} not found");
            }

            return donation;
        }

        // POST: api/Donation
        [HttpPost]
        public ActionResult<Donation> Post([FromBody] JObject data)
        {
            Donation donation = data["donation"].ToObject<Donation>();

            Contributor contributor = data["contributor"].ToObject<Contributor>();

            if (contributor.Money < donation.DonatedFunds)
            {
                return BadRequest($"Specify a correct amount of money");
            }

            donationService.Create(donation);

            return CreatedAtAction(nameof(Get), new { id = donation.Id }, donation);
        }

        // PUT: api/Donation/5
        [HttpPut("{id}")]
        public ActionResult Put(string id, [FromBody] Donation donation)
        {
            var existingDonation = donationService.Get(id);

            if (existingDonation == null)
            {
                return NotFound($"Donation with id = {id} not found");
            }

            donationService.Update(id, donation);

            return NoContent();
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public ActionResult Delete(string id)
        {
            var donation = donationService.Get(id);

            if (donation == null)
            {
                return NotFound($"Donation with id = {id} not found");
            }

            donationService.Remove(donation.Id);

            return Ok($"Donation with id = {id} deleted");
        }

        // GET: api/Project
        [HttpGet("list/contributor/{contributorId}")]
        public ActionResult<List<Donation>> LitsContributorDonations(string contributorId)
        {
            var donations = donationService.LitsContributorDonations(contributorId);

            if (donations == null)
            {
                return NotFound($"Project with id = {contributorId} not found");
            }

            return donations;
        }

        // GET: api/Project
        [HttpGet("list/project/{projectId}")]
        public ActionResult<List<Donation>> LitsProjectFunds(string projectId)
        {
            var donations = donationService.LitsProjectFunds(projectId);

            if (donations == null)
            {
                return NotFound($"Project with id = {projectId} not found");
            }

            return donations;
        }

    }
}

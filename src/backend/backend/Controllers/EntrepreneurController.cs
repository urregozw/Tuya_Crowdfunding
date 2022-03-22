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
    public class EntrepreneurController : ControllerBase
    {
        private readonly IEntrepreneurService entrepreneurService;

        public EntrepreneurController(IEntrepreneurService entrepreneurService)
        {
            this.entrepreneurService = entrepreneurService;
        }

        // GET: api/Entrepreneur
        [HttpGet]
        public ActionResult<List<Entrepreneur>> Get()
        {
            return entrepreneurService.Get();
        }

        // GET: api/Entrepreneur/5
        [HttpGet("{id}")]
        public ActionResult<Entrepreneur> Get(string id)
        {
            var entrepreneur = entrepreneurService.Get(id);

            if (entrepreneur == null)
            {
                return NotFound($"Entrepreneur with id = {id} not found");
            }

            return entrepreneur;
        }

        // POST: api/Entrepreneur
        [HttpPost]
        public ActionResult<Entrepreneur> Post([FromBody] Entrepreneur entrepreneur)
        {
            entrepreneurService.Create(entrepreneur);

            return CreatedAtAction(nameof(Get), new { id = entrepreneur.Id }, entrepreneur);
        }

        // PUT: api/Entrepreneur/5
        [HttpPut("{id}")]
        public ActionResult Put(string id, [FromBody] Entrepreneur entrepreneur)
        {
            var existingEntrepreneur = entrepreneurService.Get(id);

            if (existingEntrepreneur == null)
            {
                return NotFound($"Entrepreneur with id = {id} not found");
            }

            entrepreneurService.Update(id, entrepreneur);

            return NoContent();
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public ActionResult Delete(string id)
        {
            var entrepreneur = entrepreneurService.Get(id);

            if (entrepreneur == null)
            {
                return NotFound($"Entrepreneur with id = {id} not found");
            }

            entrepreneurService.Remove(entrepreneur.Id);

            return Ok($"Entrepreneur with id = {id} deleted");
        }
    }
}

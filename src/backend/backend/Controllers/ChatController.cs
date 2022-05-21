using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.Services;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        private readonly IChatService chatService;

        public ChatController(IChatService chatService)
        {
            this.chatService = chatService;
        }

        // GET: api/Chat
        [HttpGet]
        public ActionResult<List<Chat>> Get()
        {
            return chatService.Get();
        }

        // GET: api/Chat/5
        [HttpGet("{id}")]
        public ActionResult<Chat> Get(string id)
        {
            var chat = chatService.Get(id);

            if (chat == null)
            {
                return NotFound($"Chat with id = {id} not found");
            }

            return chat;
        }

        // POST: api/Chat
        [HttpPost]
        public ActionResult<Chat> Post([FromBody] Chat chat)
        {
            chatService.Create(chat);

            return CreatedAtAction(nameof(Get), new { id = chat.Id }, chat);
        }

        // PUT: api/Chat/5
        [HttpPut("{id}")]
        public ActionResult Put(string id, [FromBody] Chat chat)
        {
            var existingChat = chatService.Get(id);

            if (existingChat == null)
            {
                return NotFound($"Chat with id = {id} not found");
            }

            chatService.Update(id, chat);

            return NoContent();
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public ActionResult Delete(string id)
        {
            var chat = chatService.Get(id);

            if (chat == null)
            {
                return NotFound($"Chat with id = {id} not found");
            }

            chatService.Remove(chat.Id);

            return Ok($"Chat with id = {id} deleted");
        }

        // Post: api/Chat/find/
        [HttpPost("find")]
        public ActionResult<Chat> Find(string contributorId, string entrepreneurId)
        {
            var existingChat = chatService.Find(contributorId, entrepreneurId);

            if (existingChat == null)
            {
                Chat chat = new Chat
                {
                    Contributor = contributorId,
                    Entrepreneur = entrepreneurId,
                    CreationDate = System.DateTime.Now
                };
                chatService.Create(chat);
                return chat;
            }

            return existingChat;
        }

        // GET: api/Chat/5
        [HttpGet("messages/{id}")]
        public ActionResult<List<Message>> GetMessages(string id)
        {
            var messages = chatService.GetMessages(id);

            if (messages == null)
            {
                return NotFound($"Chat with id = {id} doesnt have messages");
            }

            return messages;
        }
    }
}

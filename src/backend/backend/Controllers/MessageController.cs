using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.SignalR;
namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessageController : ControllerBase
    {
        private readonly IMessageService messageService;
        private readonly IHubContext<ChatHub> chatHub;
        private readonly IChatService chatService;
        public MessageController(IMessageService messageService, IHubContext<ChatHub> chatHub,IChatService chatService)
        {
            this.messageService = messageService;
            this.chatHub = chatHub;
            this.chatService = chatService;
        }

        // GET: api/Message
        [HttpGet]
        public ActionResult<List<Message>> Get()
        {
            return messageService.Get();
        }

        // GET: api/Message/5
        [HttpGet("{id}")]
        public ActionResult<Message> Get(string id)
        {
            var message = messageService.Get(id);

            if (message == null)
            {
                return NotFound($"Message with id = {id} not found");
            }

            return message;
        }

        // POST: api/Message
        [HttpPost]
        public ActionResult<Message> Post([FromBody] Message message)
        {
            messageService.Create(message);
            var chat=chatService.Get(message.Chat);
            List<object> mensajes = new List<object>();
            foreach (string msj in chat.Messages)
            {
                var mensaje=Get(msj);
                mensajes.Add(mensaje.Value);
            }
            chatHub.Clients.All.SendAsync("messageReceived", chat, mensajes);
            return CreatedAtAction(nameof(Get), new { id = message.Id }, message);
        }

        // PUT: api/Message/5
        [HttpPut("{id}")]
        public ActionResult Put(string id, [FromBody] Message message)
        {
            var existingMessage = messageService.Get(id);

            if (existingMessage == null)
            {
                return NotFound($"Message with id = {id} not found");
            }

            messageService.Update(id, message);

            return NoContent();
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public ActionResult Delete(string id)
        {
            var message = messageService.Get(id);

            if (message == null)
            {
                return NotFound($"Message with id = {id} not found");
            }

            messageService.Remove(message.Id);

            return Ok($"Message with id = {id} deleted");
        }
    }
}

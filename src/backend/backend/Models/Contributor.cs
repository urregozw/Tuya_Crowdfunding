using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace backend.Models
{
    public class Contributor
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("name")]
        public string Name { get; set; }

        [BsonElement("username")]
        public string Username { get; set; }

        [BsonElement("email")]
        public string Email { get; set; }

        [BsonElement("password")]
        public string Password { get; set; }

        [BsonElement("address")]
        public string Address { get; set; }

        [BsonElement("money")]
        public float Money { get; set; }

        [BsonElement("donations")]
        public ICollection<string> Donations { get; set; }

        [BsonElement("projects_of_interest")]
        public ICollection<string> ProjectOfInterest { get; set; }

        [BsonElement("chats")]
        [BsonDefaultValue(new string[] { })]
        public ICollection<string> Chats { get; set; }
    }
}

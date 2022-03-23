using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace backend.Models
{
    public class Entrepreneur
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

        [BsonElement("is_staff")]
        public bool IsStaff { get; set; }

        [BsonElement("projects")]
        public ICollection<string> Projects { get; set; }
    }
}

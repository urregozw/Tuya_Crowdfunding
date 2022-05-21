using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace backend.Models
{
	public class Chat
	{
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("creation_date")]
        [BsonDateTimeOptions(Kind = DateTimeKind.Local)]
        public DateTime CreationDate { get; set; }

        [BsonElement("entrepreneur")]
        public string Entrepreneur { get; set; }

        [BsonElement("contributor")]
        public string Contributor { get; set; }

        [BsonElement("messages")]
        [BsonDefaultValue(new string[] { })]
        public ICollection<string> Messages { get; set; }
    }
}


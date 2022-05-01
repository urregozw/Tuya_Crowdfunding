using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace backend.Models
{
    public class Donation
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("donated_funds")]
        public float DonatedFunds { get; set; }

        [BsonElement("date")]
        [BsonDateTimeOptions(Kind = DateTimeKind.Local)]
        public DateTime Date { get; set; }

        [BsonElement("approved")]
        public bool Approved { get; set; }

        [BsonElement("contributor")]
        public string Contributor { get; set; }

        [BsonElement("project")]
        public string Project { get; set; }
    }
}

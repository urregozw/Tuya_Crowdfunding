using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;


namespace backend.Models
{
    public class Project
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("title")]
        public string Title { get; set; }

        [BsonElement("is_complete")]
        public bool IsComplete { get; set; }      

        [BsonElement("description")]
        public string Description { get; set; }

        [BsonElement("objective")]
        public string Objective { get; set; }

        [BsonElement("creation_date")]
        [BsonDateTimeOptions(Kind = DateTimeKind.Local)]
        public DateTime CreationDate { get; set; }

        [BsonElement("duration")]
        public int Duration { get; set; }

        [BsonElement("video")]
        public string Video { get; set; }

        [BsonElement("pdf")]
        public string Pdf { get; set; }

        [BsonElement("fund_goal")]
        public float FundGoal { get; set; }

        [BsonElement("category")]
        public string Category { get; set; }

        [BsonElement("sub_category")]
        public string SubCategory { get; set; }

        [BsonElement("status")]
        public int Status { get; set; }

        [BsonElement("backers")]
        public int Backers { get; set; }

        [BsonElement("funds_collected")]
        public float FundsCollected { get; set; }

        [BsonElement("entrepreneur")]
        public string Entrepreneur { get; set; }

        [BsonElement("donations")]
        public ICollection<string> Donations { get; set; }
    }
}

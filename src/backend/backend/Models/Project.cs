using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace backend.Models
{
    public class Project
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("name")]
        public string Name { get; set; }

        [BsonElement("is_complete")]
        public bool IsComplete { get; set; }

        [BsonElement("title")]
        public string Title { get; set; }

        [BsonElement("description")]
        public string Description { get; set; }

        [BsonElement("project_days")]
        public int ProjectDays { get; set; }

        [BsonElement("fund_goal")]
        public float FundGoal { get; set; }

        [BsonElement("backers")]
        public int Backers { get; set; }

        [BsonElement("funds_collected")]
        public float FundsCollected { get; set; }

        [BsonElement("entrepreneur")]
        public virtual Entrepreneur Entrepreneur { get; set; }
    }
}

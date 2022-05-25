using System;
using System.Collections.Generic;
using MongoDB.Driver;
using backend.Models;

namespace backend.Services
{
    public class AuthService : IAuthService
    {
        private readonly IMongoCollection<Entrepreneur> _entrepreneurs;
        private readonly IMongoCollection<Contributor> _contributors;

        public AuthService(IDatabaseSettings settings, IMongoClient mongoClient)
        {
            var database = mongoClient.GetDatabase(settings.DatabaseName);
            _entrepreneurs = database.GetCollection<Entrepreneur>(settings.EntrepreneurCollectionName);
            _contributors = database.GetCollection<Contributor>(settings.ContributorCollectionName);
        }

        public string LogIn(LogIn login)
        {

            try
            {
                if (login.IsEntrepreneur)
                {
                    return _entrepreneurs.Find(entrepreneur => (entrepreneur.Email == login.Email && entrepreneur.Password == login.Password)).FirstOrDefault().Id;
                }
                return _contributors.Find(contributor => (contributor.Email == login.Email && contributor.Password == login.Password)).FirstOrDefault().Id;
            }
            catch
            {
                return "El usuario no Existe";
            }
            
        }
    }
}
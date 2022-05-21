using System.Collections.Generic;
using backend.Models;

namespace backend.Services
{
    public interface IAuthService
    {
        string LogIn(LogIn login);
    }
}


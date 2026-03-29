using Vanguard.Application.Common.Models;

namespace Vanguard.Application.Common.Interfaces;

public interface IIdentityService
{
    Task<Result> RegisterUserAsync(string email, string password, string firstName, string lastName);
    Task<(Result Result, string? Token)> LoginAsync(string email, string password);
}

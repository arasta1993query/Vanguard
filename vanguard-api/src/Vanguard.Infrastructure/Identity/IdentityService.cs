using Vanguard.Application.Common.Interfaces;
using Vanguard.Application.Common.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Vanguard.Domain.Entities;

namespace Vanguard.Infrastructure.Identity;

public class IdentityService(
    UserManager<ApplicationUser> userManager,
    IConfiguration configuration,
    IApplicationDbContext context) : IIdentityService
{
    public async Task<Result> RegisterUserAsync(string email, string password, string firstName, string lastName)
    {
        var user = new ApplicationUser { UserName = email, Email = email };
        var result = await userManager.CreateAsync(user, password);

        if (!result.Succeeded)
        {
            return Result.Failure(result.Errors.Select(e => e.Description));
        }

        var appUser = new AppUser
        {
            IdentityId = user.Id,
            Email = email,
            FirstName = firstName,
            LastName = lastName
        };
        context.AppUsers.Add(appUser);
        await context.SaveChangesAsync(default);

        return Result.Success();
    }

    public async Task<(Result Result, string? Token)> LoginAsync(string email, string password)
    {
        var user = await userManager.FindByEmailAsync(email);
        if (user == null || !await userManager.CheckPasswordAsync(user, password))
        {
            return (Result.Failure(new[] { "Invalid email or password." }), null);
        }

        var token = GenerateJwtToken(user);
        return (Result.Success(), token);
    }

    private string GenerateJwtToken(ApplicationUser user)
    {
        var key = Encoding.UTF8.GetBytes(configuration["Jwt:Secret"] ?? "YOUR-VERY-SECURE-SECRET-KEY-WITH-AT-LEAST-256-BITS");
        var tokenHandler = new JwtSecurityTokenHandler();

        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id),
            new Claim(ClaimTypes.Email, user.Email!),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddHours(2),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }
}

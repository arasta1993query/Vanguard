using Vanguard.Application.Common.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Vanguard.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController(IIdentityService identityService) : ControllerBase
{
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request)
    {
        var result = await identityService.RegisterUserAsync(request.Email, request.Password, request.FirstName, request.LastName);
        
        if (!result.Succeeded) return BadRequest(new { errors = result.Errors });
        return Ok(new { message = "User registered successfully." });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        var (result, token) = await identityService.LoginAsync(request.Email, request.Password);
        
        if (!result.Succeeded || string.IsNullOrEmpty(token)) return Unauthorized(new { errors = result.Errors });

        Response.Cookies.Append("accessToken", token, new CookieOptions
        {
            HttpOnly = true,
            Secure = true, // We will secure it in all environments for safety/consistency (use HTTPS locally!)
            SameSite = SameSiteMode.None,
            Expires = DateTimeOffset.UtcNow.AddHours(2)
        });

        return Ok(new { message = "Logged in successfully." });
    }

    [HttpPost("logout")]
    public IActionResult Logout()
    {
        Response.Cookies.Delete("accessToken", new CookieOptions { Secure = true, SameSite = SameSiteMode.None });
        return Ok(new { message = "Logged out successfully." });
    }

    [HttpGet("me")]
    [Microsoft.AspNetCore.Authorization.Authorize]
    public IActionResult GetCurrentUser()
    {
        var email = User.FindFirstValue(System.Security.Claims.ClaimTypes.Email);
        var id = User.FindFirstValue(System.Security.Claims.ClaimTypes.NameIdentifier);
        return Ok(new { id, email });
    }
}

public record RegisterRequest(string Email, string Password, string FirstName, string LastName);
public record LoginRequest(string Email, string Password);

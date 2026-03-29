using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Vanguard.Api.Controllers;
using Vanguard.Application.Common.Interfaces;
using Vanguard.Application.Common.Models;
using Xunit;

namespace Vanguard.Api.Tests.Controllers;

public class AuthControllerTests
{
    private readonly Mock<IIdentityService> _identityServiceMock;
    private readonly AuthController _controller;

    public AuthControllerTests()
    {
        _identityServiceMock = new Mock<IIdentityService>();
        _controller = new AuthController(_identityServiceMock.Object);
        
        var httpContext = new DefaultHttpContext();
        _controller.ControllerContext = new ControllerContext
        {
            HttpContext = httpContext
        };
    }

    [Fact]
    public async Task Login_WithValidCredentials_ReturnsOkAndSetsCookie()
    {
        // Arrange
        var request = new LoginRequest("test@vanguard.local", "SecurePassword123!");
        _identityServiceMock
            .Setup(x => x.LoginAsync(request.Email, request.Password))
            .ReturnsAsync((Result.Success(), "mocked_jwt_token"));

        // Act
        var result = await _controller.Login(request);

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result);
        Assert.Equal(200, okResult.StatusCode);
        Assert.NotNull(okResult.Value);
        
        var setCookieHeader = _controller.HttpContext.Response.Headers.SetCookie.ToString();
        Assert.Contains("accessToken=mocked_jwt_token", setCookieHeader);
        Assert.Contains("httponly", setCookieHeader, StringComparison.OrdinalIgnoreCase);
        Assert.Contains("secure", setCookieHeader, StringComparison.OrdinalIgnoreCase);
    }

    [Fact]
    public async Task Login_WithInvalidCredentials_ReturnsUnauthorized()
    {
        // Arrange
        var request = new LoginRequest("test@vanguard.local", "WrongPass");
        _identityServiceMock
            .Setup(x => x.LoginAsync(request.Email, request.Password))
            .ReturnsAsync((Result.Failure(new[] { "Invalid credentials" }), null));

        // Act
        var result = await _controller.Login(request);

        // Assert
        var unauthorizedResult = Assert.IsType<UnauthorizedObjectResult>(result);
        Assert.Equal(401, unauthorizedResult.StatusCode);
        Assert.NotNull(unauthorizedResult.Value);
    }
}

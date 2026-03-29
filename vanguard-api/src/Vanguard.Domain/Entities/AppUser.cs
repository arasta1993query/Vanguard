using Vanguard.Domain.Common;

namespace Vanguard.Domain.Entities;

public class AppUser : BaseAuditableEntity
{
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string IdentityId { get; set; } = string.Empty; // Used to link with ASP.NET Core Identity ApplicationUser
}

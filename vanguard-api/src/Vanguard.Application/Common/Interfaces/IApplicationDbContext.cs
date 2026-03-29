using Vanguard.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Vanguard.Application.Common.Interfaces;

public interface IApplicationDbContext
{
    DbSet<AppUser> AppUsers { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}

using System.Reflection;
using FluentValidation;
using Mapster;
using Microsoft.Extensions.DependencyInjection;

namespace Vanguard.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        // FluentValidation setup
        services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());

        // Mapster setup
        TypeAdapterConfig.GlobalSettings.Scan(Assembly.GetExecutingAssembly());

        // Note: As you requested, we are NOT using MediatR.
        // Therefore, any Application Services you create later (e.g., IUserService, UserService)
        // should be registered here via services.AddScoped<...> 

        return services;
    }
}

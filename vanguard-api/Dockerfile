FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src
COPY ["src/Vanguard.Api/Vanguard.Api.csproj", "src/Vanguard.Api/"]
COPY ["src/Vanguard.Application/Vanguard.Application.csproj", "src/Vanguard.Application/"]
COPY ["src/Vanguard.Domain/Vanguard.Domain.csproj", "src/Vanguard.Domain/"]
COPY ["src/Vanguard.Infrastructure/Vanguard.Infrastructure.csproj", "src/Vanguard.Infrastructure/"]
RUN dotnet restore "src/Vanguard.Api/Vanguard.Api.csproj"

COPY . .
WORKDIR "/src/src/Vanguard.Api"
RUN dotnet build "Vanguard.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Vanguard.Api.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /app
EXPOSE 8080
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Vanguard.Api.dll"]

# 🛡️ Vanguard Smart Dashboard

**Vanguard** is an enterprise-grade, high-performance Smart Dashboard showcasing a beautifully decoupled architecture. It perfectly integrates a heavily guarded **.NET 9 Clean Architecture API** with a lightning-fast, glassmorphism-themed **Next.js 16 (App Router)** frontend.

![Dashboard Preview](https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop) 
*(Demo dashboard placeholder visual)*

## ✨ Highlights
- **Clean Architecture (.NET 9)**: Fully decoupled layers (Domain, Application, Infrastructure, Api) governed strictly by CQRS MediatR pipelines.
- **Next.js 16 & Edge Middleware**: Utilizing the newest App Router for server-rendered performance and edge validation for rigorous authentication security.
- **HttpOnly JWT Authentication**: Bulletproof secure login flows storing encrypted identity tokens natively in HttpOnly cookies to mitigate XSS payload attacks.
- **Glassmorphism Dark Theme**: A stunning, incredibly premium aesthetic built rapidly via synchronized CSS Variables and Tailwind.
- **Comprehensive Testing Suites**: Full multi-layer testing using **xUnit + Moq + FluentAssertions** (Backend) and **Vitest + React Testing Library** (Frontend).
- **Containerized Orchestration**: Instantly deployable via a seamless multi-stage `docker-compose` cluster encapsulating a SQL Server, the API, and the Web node.

---

## 🛠 Technology Stack

### Runtime Frontend (`/vanguard-web`)
* **Framework**: React 19 + Next.js 16 (App Router)
* **Styling**: Tailwind CSS, PostCSS, Framer Motion (Coming Soon!)
* **State Management**: Zustand (Global Auth State) + TanStack Query (Server State Cache)
* **Form Validation**: React Hook Form + Zod Schema Resolvers
* **Testing Matrix**: Vitest + jsdom + React Testing Library

### Runtime Backend (`/vanguard-api`)
* **Framework**: ASP.NET Core Web API (RC .NET 9.0)
* **Design Philosophy**: Primary Constructors, CQRS (MediatR), Repository Interfaces
* **Database**: Microsoft SQL Server (via Docker volume)
* **ORM Entity Engine**: Entity Framework Core 9.0 + Auto-migrations
* **Testing Matrix**: xUnit, Moq 

---

## 🚀 Instant Quickstart (Zero-Config)

The absolute fastest way to experience Vanguard is utilizing the built-in docker cluster orchestrator. 
Make sure [Docker Desktop / Engine](https://www.docker.com/) is running on your machine.

```bash
# 1. Clone the repository
git clone https://github.com/arasta1993query/Vanguard.git
cd Vanguard

# 2. Build and boot the entire Monorepo (Database, Server, App)
docker-compose up -d --build
```
- 🖥️ **Frontend App**: [http://localhost:3000](http://localhost:3000)
- 🔌 **Backend API**: [http://localhost:5001](http://localhost:5001)

### Manual Live-Reloading (Standard Development)
If you prefer running the code sequentially in IDE native mode for strict live-reloading:

**1. Spawn Database Isolation**
```bash
docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=Asd@12369874" -p 1433:1433 -d mcr.microsoft.com/mssql/server:2022-latest
```

**2. Boot the .NET API**
```bash
cd vanguard-api
dotnet run --project src/Vanguard.Api/Vanguard.Api.csproj
```

**3. Boot the Next.js Client**
```bash
cd vanguard-web
pnpm install
pnpm dev
```

---

## 🧪 Validating The Test Grid

This project enforces structural and logic guarantees using dual-testing frameworks.

**Execute C# XUnit Backend Target:**
```bash
cd vanguard-api
dotnet test Vanguard.Api.sln
```

**Execute Node Vitest Frontend App Target:**
```bash
cd vanguard-web
pnpm test
```

# 🎸 Forte Website

ASP.NET 6 MVC ile geliştirilmiş bir websitesi.

## 🛠️ Kurulum
**Gerekenler:**
- [.NET 6 SDK](https://dotnet.microsoft.com/download)
- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- PostgreSQL Client (DBeaver/pgAdmin)

## 🐳 PostgreSQL Docker'da Çalıştırma
```bash
docker run --name forte-db -e POSTGRES_PASSWORD=12345 -e POSTGRES_DB=postgres -p 5433:5432 -d postgres

Dependency'leri yükle:
cd ForteWebsite
dotnet restore

Database Migration'ları uygula:
dotnet ef database update

Uygulamayı çalıştır:
dotnet run

Tarayıcıda aç: http://localhost:7137

"dotnet ef" çalışmıyorsa:
dotnet tool install --global dotnet-ef
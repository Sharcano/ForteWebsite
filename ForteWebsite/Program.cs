using ForteWebsite.Data; // <-- AppDbContext namespace
using Microsoft.EntityFrameworkCore;
using ForteWebsite.Models; // <-- Employee namespace (gerekirse)
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.Cookies;

var builder = WebApplication.CreateBuilder(args);

// 1) Connection string al
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddHttpContextAccessor(); // HttpContext eri�imi i�in
builder.Services.AddSession(); // Session'� aktif et
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.Cookie.HttpOnly = true;
        options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
        options.ExpireTimeSpan = TimeSpan.FromMinutes(20); // Cookie �mr�
        options.SlidingExpiration = true; // Cookie s�resini yeniler
        options.LoginPath = "/Account/SignIn"; // Giri� sayfas�na y�nlendirme yolu
        options.AccessDeniedPath = "/Account/AccessDenied"; // Yetkisiz eri�im sayfas�
    });
// 2) EF Core + Postgres
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(connectionString));
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
// 3) MVC veya Controllers + Views
builder.Services.AddControllersWithViews();




// CORS'u etkinle�tirme
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
        policy.AllowAnyOrigin() // Herkese izin ver
              .AllowAnyMethod() // GET, POST, PUT gibi t�m HTTP metodlar�na izin ver
              .AllowAnyHeader() // Herhangi bir header'� kabul et
    );
});

// 4) Uygulamay� olu�tur
var app = builder.Build();

// 5) Pipeline
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

// CORS'u kullan
app.UseCors("AllowAll");

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();
app.UseSession(); // <-- Bu sat�r� ekleyin
app.UseCors("AllowAll");


// API'leri kullanmak i�in gerekli
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.MapControllers(); // API Controller'lar i�in gerekli

app.Run();



namespace ForteWebsite.Models
{
    public class Employee
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Title { get; set; }
        public string ImagePath { get; set; } = string.Empty;
    }
}

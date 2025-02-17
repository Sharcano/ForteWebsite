using ForteWebsite.Data; // <-- AppDbContext namespace
using Microsoft.EntityFrameworkCore;
using ForteWebsite.Models; // <-- Employee namespace (gerekirse)
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication.Cookies;

var builder = WebApplication.CreateBuilder(args);

// 1) Connection string al
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddHttpContextAccessor(); // HttpContext eriþimi için
builder.Services.AddSession(); // Session'ý aktif et
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.Cookie.HttpOnly = true;
        options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
        options.ExpireTimeSpan = TimeSpan.FromMinutes(20); // Cookie ömrü
        options.SlidingExpiration = true; // Cookie süresini yeniler
        options.LoginPath = "/Account/SignIn"; // Giriþ sayfasýna yönlendirme yolu
        options.AccessDeniedPath = "/Account/AccessDenied"; // Yetkisiz eriþim sayfasý
    });
// 2) EF Core + Postgres
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(connectionString));
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
// 3) MVC veya Controllers + Views
builder.Services.AddControllersWithViews();




// CORS'u etkinleþtirme
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
        policy.AllowAnyOrigin() // Herkese izin ver
              .AllowAnyMethod() // GET, POST, PUT gibi tüm HTTP metodlarýna izin ver
              .AllowAnyHeader() // Herhangi bir header'ý kabul et
    );
});

// 4) Uygulamayý oluþtur
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
app.UseSession(); // <-- Bu satýrý ekleyin
app.UseCors("AllowAll");


// API'leri kullanmak için gerekli
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.MapControllers(); // API Controller'lar için gerekli

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

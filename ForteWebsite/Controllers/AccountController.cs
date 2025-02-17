using Microsoft.AspNetCore.Mvc;
using ForteWebsite.Models;
using ForteWebsite.Data;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BCrypt.Net;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using System.Security.Claims;

namespace ForteWebsite.Controllers
{
    public class AccountController : Controller
    {
        private readonly AppDbContext _context;

        public AccountController(AppDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public IActionResult SignIn()
        {
            return View();
        }
       
        [HttpPost]
        public async Task<IActionResult> SignIn(string username, string password)
        {
            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
            {
                ModelState.AddModelError("", "Kullanıcı adı ve şifre boş olamaz.");
                return View();
            }

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == username);

            if (user == null) // user null ise de hata mesajı veriyoruz
            {
                ModelState.AddModelError("", "Geçersiz kullanıcı adı veya şifre.");
                return View();
            }

            if (password != user.Password) // Hashleme devre dışı (TEST AMAÇLI)
            {
                ModelState.AddModelError("", "Geçersiz kullanıcı adı veya şifre.");
                return View();
            }

            // Giriş başarılı
            var claims = new List<Claim>
    {
        new Claim(ClaimTypes.Name, user.Username),
        new Claim(ClaimTypes.Role, user.Role), // Rolü veritabanından al
        new Claim("IsLoggedIn", "true") // Özel claim
    };

            var claimsIdentity = new ClaimsIdentity(
                claims, CookieAuthenticationDefaults.AuthenticationScheme);

            var authProperties = new AuthenticationProperties
            {
                IsPersistent = false,
                ExpiresUtc = DateTimeOffset.UtcNow.AddMinutes(20),
                  AllowRefresh = true
            };

            await HttpContext.SignInAsync(
                CookieAuthenticationDefaults.AuthenticationScheme,
                new ClaimsPrincipal(claimsIdentity),
                authProperties);

            HttpContext.Session.SetString("IsLoggedIn", "true");
            HttpContext.Session.SetString("UserRole", user.Role);


            return RedirectToAction("Index", "Home"); // Başarılı girişte yönlendirme
        }
        [HttpPost]
        public async Task<IActionResult> Logout()
        {
            // Çerezleri ve oturumu temizle
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            HttpContext.Session.Clear();
            return RedirectToAction("Index", "Home");
        }

    }

}
    
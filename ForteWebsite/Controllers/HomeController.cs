using Microsoft.AspNetCore.Mvc;
using ForteWebsite.Models;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using ForteWebsite.Data;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using System.Net.Mail;
using System.Net;

namespace ForteWebsite.Controllers
{
    public class HomeController : Controller
    {
        private readonly Data.AppDbContext _context;
        private readonly ILogger<HomeController> _logger;

        public HomeController(Data.AppDbContext context, ILogger<HomeController> logger)
        {
            _context = context;
            _logger = logger;
        }


        public IActionResult Index()
        {
            // PageName'i "Home" olan elementleri çek
            var homeElements = _context.SiteElements
                .Where(e => e.PageName == "Home")
                .ToList();

            // ElementKey'e göre kolay erişim için Dictionary'e çevir
            ViewBag.HomeElements = homeElements.ToDictionary(e => e.ElementKey);
            ViewBag.IsLoggedIn = User?.Identity?.IsAuthenticated;

            return View();
        }

        public IActionResult About()
        {
            // PageName'i "About" olan elementleri çek
            var aboutElements = _context.SiteElements
                .Where(e => e.PageName == "About")
                .ToList();

            // Sözlük olarak ViewBag'e at
            ViewBag.AboutElements = aboutElements.ToDictionary(e => e.ElementKey);
            ViewBag.IsLoggedIn = User?.Identity?.IsAuthenticated;

            return View();
        }

        public IActionResult Services()
        {
            var servicesElements = _context.SiteElements
                .Where(e => e.PageName == "Services")
                .ToList();
            ViewBag.ServicesElements = servicesElements
               .ToDictionary(e => e.ElementKey);
            ViewBag.IsLoggedIn = User?.Identity?.IsAuthenticated;

            return View();
        }
        public IActionResult Products()
        {
            var productsElements = _context.SiteElements
                .Where(e => e.PageName == "Products")
                .ToList();
            ViewBag.ProductsElements = productsElements
               .ToDictionary(e => e.ElementKey);
            ViewBag.IsLoggedIn = User?.Identity?.IsAuthenticated;
            return View();
        }

        public IActionResult References()
        {
            // 1) Veritabanından PageName = "References" olan satırları çekin
            var referencesElements = _context.SiteElements
                .Where(e => e.PageName == "References")
                .ToList();

            // 2) Key => SiteElement.ElementKey
            //    Value => SiteElement nesnesi (Id, DefaultValue vs.)
            ViewBag.ReferencesElements = referencesElements
                .ToDictionary(e => e.ElementKey);
            ViewBag.IsLoggedIn = User?.Identity?.IsAuthenticated;
            // 3) View’a gönderin
            return View();
        }

        [HttpGet]

        public IActionResult Employees()
        {
            try
            {
                // 1) "PageName = Employees" olan SiteElements kayıtlarını çek
                var employeesElements = _context.SiteElements
                    .Where(e => e.PageName == "Employees")
                    .ToList();

                // 2) ElementKey -> SiteElement dönüşümünü Dictionary'e çevirip ViewBag'e at
                ViewBag.EmployeesElements = employeesElements.ToDictionary(e => e.ElementKey);

                // 3) Çalışanlar tablosundan veriyi çek
                var employeesList = _context.Employees.ToList();

                // 4) ID -> Employee nesnesi şeklinde Dictionary'e çevirip ViewBag'e at
                var employeesDict = employeesList.ToDictionary(e => e.Id, e => e);
                ViewBag.EmployeesDict = employeesDict;

                // 5) Kullanıcı girişi var mı? (İsteğe bağlı)
                ViewBag.IsLoggedIn = User?.Identity?.IsAuthenticated;

                return View();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Çalışanlar listesi alınırken hata oluştu.");
                ViewBag.Message = "Çalışanlar listesi alınırken bir hata oluştu.";
                return View();
            }
        }
        public IActionResult Iletisim()
        {
            return View();
        }
        public IActionResult BizeYazin()
        {
            return View();
        }

        [HttpGet] // Sign In için Get metodu
        public IActionResult SignIn()
        {
            return View(); // Sadece View döndürüyoruz, veritabanı yok
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        [HttpPost]
        [Authorize] // eğer sadece login olmuş kişiler değiştirsin diyorsan aç 
        public IActionResult LogChange([FromBody] ElementChangeDto dto)
        {
            // 1) Hangi element değiştirildiğini DB’den bulmak istersen:
            var element = _context.SiteElements
                .FirstOrDefault(e => e.Id == dto.ElementId && e.PageName == dto.PageName);
            if (element == null)
            {
                return BadRequest("Element bulunamadı!");
            }

            // 2) Kaydetmek istediğin log kaydı:
            var change = new ElementChange
            {
                ElementId = dto.ElementId,
                OldValue = dto.OldValue,
                NewValue = dto.NewValue,
                PageName = dto.PageName,
                ChangedAt = DateTime.UtcNow,
                // Kullanıcı kimliğini loglamak istersen:
                ChangedByUserId = User?.Identity?.Name ?? "Anonymous"
            };

            _context.ElementChanges.Add(change);

            // => 2b) Kullanıcı Admin ise asıl tabloyu da (SiteElements) güncelle (kalıcı)
            if (User?.IsInRole("Admin") == true)
            {
                // Admin ise
                element.DefaultValue = dto.NewValue;
            }
            else
            {
                // Admin değilse
                // Sadece log
            }

            // 3) Değişiklikleri kaydet
            _context.SaveChanges();

            return Ok(new { success = true });
        }

        [HttpPost]
        public async Task<IActionResult> BizeYazin(ContactForm model)
        {
            if (!ModelState.IsValid)
            {
                ViewData["ErrorMessage"] = "Lütfen tüm zorunlu alanları doldurun.";
                return View(model);
            }

            try
            {
                _context.ContactForms.Add(model);
                await _context.SaveChangesAsync();
                // 2) MAIL Gönderimi (Gönderen = mailtestgonderme201@gmail.com, Alıcı = sahinozsoy46@gmail.com)
                var fromAddress = new MailAddress("mailtestgonderme201@gmail.com", "Form Bilgilendirme");
                var toAddress = new MailAddress("sahinozsoy46@gmail.com", "Şahin Özsoy");

                string subject = "Yeni Form Mesajı Var!";
                string body = $@"
Merhaba,

Yeni bir form dolduruldu:

Ad: {model.Name}
E-mail: {model.Email}
Mesaj: {model.Message}
Tarih: {DateTime.Now}
";

                using (var smtp = new SmtpClient("smtp.gmail.com", 587))
                {
                    smtp.EnableSsl = true;
                    smtp.UseDefaultCredentials = false;
                    smtp.Credentials = new NetworkCredential(
                        "mailtestgonderme201@gmail.com", // Gönderen hesap
                        "btykdprcvlypsjvp"                   // Parola veya AppPassword
                    );

                    using (var message = new MailMessage(fromAddress, toAddress)
                    {
                        Subject = subject,
                        Body = body,
                        IsBodyHtml = false
                    })
                    {
                        // Asenkron mail gönder
                        await smtp.SendMailAsync(message);
                    }
                }

                // Mail başarılıysa buraya gelir
                ViewData["SuccessMessage"] = "Mesajınız gönderildi. Teşekkür ederiz.";
                ModelState.Clear();
                return View(new ContactForm());
            }
            catch (Exception ex)
            {
                // Eğer mail gönderirken hata olursa bu bloğa düşeceksiniz
                _logger.LogError(ex, "Mail veya DB kaydı sırasında hata oluştu.");

                // Şu satırla hatayı kullanıcıya da gösterebilirsiniz (geçici olarak):
                ModelState.AddModelError("", $"Mail gönderimi hatası: {ex.Message}");

                return View(model);
            }
        }

    }
}

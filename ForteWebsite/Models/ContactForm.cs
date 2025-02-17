using System;
using System.ComponentModel.DataAnnotations;

namespace ForteWebsite.Models
{
    public class ContactForm
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Ad alanı zorunludur.")]
        public string Name { get; set; } = string.Empty;

        [Required(ErrorMessage = "Soyad alanı zorunludur.")]
        public string Surname { get; set; } = string.Empty;

        public string? Company { get; set; }

        [Required(ErrorMessage = "Ünvan alanı zorunludur.")]
        public string Title { get; set; } = string.Empty;

        [Required(ErrorMessage = "Ülke alanı zorunludur.")]
        public string Country { get; set; } = string.Empty;

        [Required(ErrorMessage = "Email alanı zorunludur.")]
        [EmailAddress(ErrorMessage = "Geçerli bir e-posta adresi giriniz.")]
        public string Email { get; set; } = string.Empty;

        public string? Phone { get; set; }

        [Required(ErrorMessage = "Mesaj alanı zorunludur.")]
        public string Message { get; set; } = string.Empty;

        [Range(typeof(bool), "true", "true", ErrorMessage = "Gizlilik sözleşmesini kabul etmelisiniz.")]
        public bool PrivacyAccepted { get; set; }

        [Range(typeof(bool), "true", "true", ErrorMessage = "Aydınlatma metnini kabul etmelisiniz.")]
        public bool ConsentAccepted { get; set; }

        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
    }
}

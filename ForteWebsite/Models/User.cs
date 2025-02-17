using System.ComponentModel.DataAnnotations;

namespace ForteWebsite.Models // PROJENİZİN DOĞRU NAMESPACE'İNİ KULLANDIĞINIZDAN EMİN OLUN!
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Kullanıcı adı gereklidir.")]
        public string Username { get; set; } = null!;

        [Required(ErrorMessage = "Şifre gereklidir.")]
        public string Password { get; set; } = null!;
        public string Role { get; set; } = null!;
    }
}
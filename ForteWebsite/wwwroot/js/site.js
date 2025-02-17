window.addEventListener("DOMContentLoaded", function () {
    // "FORTE sayılar" bölümünü bul
    const forteSection = document.getElementById("forteStatsSection");
    if (forteSection) {
        // Sadece bu bölümde fare hareketini dinle
        forteSection.addEventListener("mousemove", function (e) {
            // offsetX / offsetY => mouse'un .forte-stats içindeki konumu
            const x = e.offsetX;
            const y = e.offsetY;

            // Yeni bir "kristal partikül" oluştur
            const particle = document.createElement("span");
            particle.className = "crystal-particle";
            particle.style.left = x + "px";
            particle.style.top = y + "px";

            // Partikülü #forte-particle-container içine ekle
            const container = document.getElementById("forte-particle-container");
            container.appendChild(particle);

            // 1.2s animasyon süresi + 0.3s ekleyerek 1.5s sonra DOM'dan silelim
            setTimeout(() => {
                particle.remove();
            }, 1500);
        });
    }
});

    document.addEventListener("DOMContentLoaded", function() {
    const timelineItems = document.querySelector(".timeline-items");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");

    // Kart genişliği + gap varsayımına göre kaydırma miktarı:
    const scrollAmount = 320; 

    prevBtn.addEventListener("click", () => {
        timelineItems.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });

    nextBtn.addEventListener("click", () => {
        timelineItems.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
  });



document.addEventListener('DOMContentLoaded', function () {
    console.log('JavaScript dosyası yüklendi!');

    const button = document.getElementById('employee-btn');
    const table = document.getElementById('employee-table');
    const tableBody = table.querySelector('tbody');

    if (!button || !table || !tableBody) {
        console.error('HTML elemanları bulunamadı.');
        return;
    }

    // Butona tıklama olayını ekle
    button.addEventListener('click', function () {
        fetch('http://localhost:5217/api/employee') // Endpoint URL'si
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`API isteği başarısız oldu! Durum kodu: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                // Tabloyu temizle ve görünür yap
                tableBody.innerHTML = '';
                table.style.display = 'table';

                // Verileri tabloya ekle
                data.forEach((employee) => {
                    const row = document.createElement('tr');
                    const nameCell = document.createElement('td');
                    const titleCell = document.createElement('td');

                    nameCell.textContent = employee.name;
                    titleCell.textContent = employee.title;

                    row.appendChild(nameCell);
                    row.appendChild(titleCell);
                    tableBody.appendChild(row);
                });

                console.log('Veriler tabloya başarıyla eklendi.');
            })
            .catch((error) => {
                console.error('Hata:', error);
                alert(`Veri yüklenirken bir hata oluştu: ${error.message}`);
            });
    });
});




document.addEventListener("DOMContentLoaded", () => {
    let hasAnimated = false; // Sayaçların bir kez tetiklenmesini istiyoruz

    // 1) .forte-stats bölümünü yakalayın
    const statsSection = document.querySelector(".forte-stats");

    // 2) Sayaç animasyon fonksiyonu
    function animateCount(elementId) {
        const el = document.getElementById(elementId);
        if (!el) return; // İlgili eleman yoksa çık

        const target = +el.getAttribute("data-target"); // string -> number
        const duration = 2000; // 2 saniye
        const frameRate = 30;  // saniyede 30 güncelleme
        const totalSteps = Math.round(duration / (1000 / frameRate));
        let currentStep = 0;

        const interval = setInterval(() => {
            currentStep++;
            const progress = currentStep / totalSteps;
            // Basit linear ilerleme: 0 → target
            const currentVal = Math.floor(target * progress);

            // Türkçe biçimde (binlik ayracı . ) göstermek isterseniz "tr-TR" kullanın
            el.textContent = currentVal.toLocaleString("tr-TR") + "+";

            // Animasyon bittiğinde temizle
            if (currentStep >= totalSteps) {
                clearInterval(interval);
                // Hedef değere tam atama
                el.textContent = target.toLocaleString("tr-TR") + "+";
            }
        }, 1000 / frameRate);
    }

    // 3) IntersectionObserver ile .forte-stats ekranda görünce animasyonu başlatıyoruz
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // Bölüm ekranda belirdi ve henüz animasyon yapmadıysak
                if (entry.isIntersecting && !hasAnimated) {
                    hasAnimated = true;

                    // 3 sayaç için fonksiyonu çağır
                    animateCount("count-projects");
                    animateCount("count-lines");
                    animateCount("count-docs");

                    // Gerekirse yeniden tetiklenmemesi için observe'dan çıkar
                    observer.unobserve(statsSection);
                }
            });
        }, { threshold: 0.4 }); // %40 görününce tetiklesin

        observer.observe(statsSection);
    }
});



// Hizmetler sayfası özel JS
document.addEventListener('DOMContentLoaded', function () {
    // Teknoloji item hover efekt
    const techItems = document.querySelectorAll('.tech-box li');
    techItems.forEach(item => {
        item.addEventListener('mouseover', () => {
            item.style.transform = 'translateY(-3px)';
            item.style.boxShadow = '0 6px 20px rgba(100, 255, 218, 0.15)';
        });
        item.addEventListener('mouseout', () => {
            item.style.transform = 'translateY(0)';
            item.style.boxShadow = 'none';
        });
    });

    // Content box enter/leave efekt
    const contentBox = document.querySelector('.content-box');
    if (contentBox) {
        contentBox.addEventListener('mousemove', (e) => {
            const rect = contentBox.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            contentBox.style.transform = `
        perspective(1000px)
        rotateX(${(y - rect.height / 2) / 20}deg)
        rotateY(${-(x - rect.width / 2) / 20}deg)
        translateY(-5px)
      `;
        });

        contentBox.addEventListener('mouseleave', () => {
            contentBox.style.transform = 'translateY(0)';
        });
    }
});


// Entegrasyon Kart Hover Etkisi
document.querySelectorAll('.integration-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// List Item Giriş Animasyonu
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px'
};

const integrationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.integration-left li').forEach(li => {
    li.style.opacity = '0';
    li.style.transform = 'translateX(-20px)';
    li.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    integrationObserver.observe(li);
});

// Resim Yükleme Optimizasyonu
document.querySelectorAll('.integration-card img').forEach(img => {
    img.style.transition = 'filter 0.4s ease, transform 0.4s ease';
});


// İş Akışı Adımlarına Scroll Animasyonu
document.addEventListener('DOMContentLoaded', function () {
    const steps = document.querySelectorAll('.workflow-step');

    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    steps.forEach(step => {
        step.style.opacity = '0';
        step.style.transform = 'translateY(30px)';
        step.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(step);
    });
});

// Ürünler Sayfası JavaScript Kodları
document.addEventListener('DOMContentLoaded', function () {
    // Tab Geçişleri
    const tabs = document.querySelectorAll('.navigation-tabs a');
    const sections = document.querySelectorAll('.content-section');

    function activateTab(targetId) {
        tabs.forEach(tab => {
            tab.classList.remove('active');
            if (tab.getAttribute('href') === `#${targetId}`) {
                tab.classList.add('active');
            }
        });

        sections.forEach(section => {
            section.classList.remove('active');
            if (section.id === targetId) {
                section.classList.add('active');
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            history.replaceState(null, null, `#${targetId}`);
            activateTab(targetId);
        });
    });

    // Sayfa Yüklendiğinde Hash Kontrolü
    const initialHash = window.location.hash.substring(1);
    if (initialHash) {
        activateTab(initialHash);
    } else {
        activateTab('forips-suite');
    }

    // Scroll Animasyonları
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Görsel Hover Efekti
    document.querySelectorAll('.image img').forEach(img => {
        img.addEventListener('mousemove', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            this.style.transform = `perspective(1000px) rotateX(${(y - rect.height / 2) / 10}deg) rotateY(${-(x - rect.width / 2) / 10}deg)`;
        });

        img.addEventListener('mouseleave', function () {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
});

























document.addEventListener('DOMContentLoaded', function () {
    // Smooth Scroll
    document.querySelectorAll('.navigation-tabs a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const section = document.querySelector(this.getAttribute('href'));
            section.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    // Aktif Sekme Güncelleme
    window.addEventListener('scroll', function () {
        const sections = document.querySelectorAll('.content-section');
        const navLinks = document.querySelectorAll('.navigation-tabs a');

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            // 200 px threshold
            if (rect.top <= 200 && rect.bottom >= 200) {
                const id = section.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // Lazy loading
    const images = document.querySelectorAll('.content-section img');
    images.forEach(img => {
        img.setAttribute('loading', 'lazy');
    });
});



























document.addEventListener('DOMContentLoaded', function () {
    // Herhangi bir giriş yapılmışsa (Admin veya User) => enableEditing
    if (localStorage.getItem('isLoggedIn') === 'true') {
        enableEditing();
        loadSavedChanges();
    }
});
function enableEditing() {
    // Tüm düzenlenebilir elementleri seç
    const editableElements = document.querySelectorAll('[data-editable="true"]');

    editableElements.forEach(element => {
        // Metin elementleri için
       
            element.contentEditable = true;
            element.style.border = "1px dashed #ccc";
            element.addEventListener('blur', saveChanges);
        

        // Görseller için
        if (element.tagName === 'IMG') {
            element.style.cursor = "pointer";
            element.addEventListener('click', updateImage);
        }
    });
}

function saveChanges(e) {
    const element = e.target;
    const elementId = element.id || generateUniqueId(element); // Unique ID üret
    localStorage.setItem(elementId, element.innerHTML);
}

// site.js (veya benzer bir JS dosyadaki eski updateImage fonksiyonunu bununla değiştir)
async function updateImage(e) {
    // Tıklanan <img> elementini al
    const element = e.target;

    // Mevcut resim yolunu (oldValue) sakla
    const oldSrc = element.src;

    // Prompt ile kullanıcıdan yeni URL al
    const newSrc = prompt("Yeni görsel URL'sini girin (örn: /images/test.jpg):");
    if (!newSrc) {
        return; // Kullanıcı iptal ettiyse hiçbir şey yapma
    }

    // Ön yüzde anında değişikliği gösterelim
    element.src = newSrc;

    // data-element-id ve data-page-name özniteliklerini çek
    const elementId = element.getAttribute('data-element-id');
    const pageName = element.getAttribute('data-page-name') || "Home";

    // Güvenlik amaçlı, ID veya PageName boş mu diye kontrol
    if (!elementId) {
        console.error("HATA: data-element-id bulunamadı!");
        // Kaydedemeyeceğimiz için resmi eski haline döndür
        element.src = oldSrc;
        return;
    }

    try {
        // Sunucuya AJAX (fetch) ile "LogChange" isteği atıyoruz
        const response = await fetch('/Home/LogChange', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                elementId: parseInt(elementId, 10),
                oldValue: oldSrc,
                newValue: newSrc,
                pageName: pageName
            })
        });

        // Eğer HTTP 200 dönmediyse hata fırlat
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP Hatası: ${response.status} - ${errorText}`);
        }

        console.log("Resim değişikliği DB'ye kaydedildi!");
    }
    catch (err) {
        console.error("Resim kaydedilemedi:", err);
        // Hata olması durumunda geri al
        element.src = oldSrc;
    }
}


function loadSavedChanges() {
    const editableElements = document.querySelectorAll('[data-editable="true"]');
    editableElements.forEach(element => {
        const elementId = element.id || generateUniqueId(element);
        const savedValue = localStorage.getItem(elementId);
        if (savedValue) {
            if (element.tagName === 'IMG') {
                element.src = savedValue;
            } else {
                element.innerHTML = savedValue;
            }
        }
    });
}
function generateUniqueId(element) {
    const randomString = Math.random().toString(36).slice(2, 11); // 2. indeksten başla, 9 karakter al
    const randomId = 'editable-' + randomString;
    element.setAttribute('id', randomId);
    return randomId;
}




document.querySelectorAll('.project').forEach(project => {
    project.addEventListener('mousemove', (e) => {
        const rect = project.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        project.style.setProperty('--mouse-x', `${x}px`);
        project.style.setProperty('--mouse-y', `${y}px`);
    });
});



document.addEventListener('DOMContentLoaded', function () {
    // Tüm düzenlenebilir elementleri seç
    document.querySelectorAll('[data-editable="true"]').forEach(element => {
        let originalValue = element.textContent.trim(); // Başlangıç değeri
        
        element.addEventListener('blur', async (e) => {
            const target = e.target;
            const elementId = target.getAttribute('data-element-id'); // Element ID
            const pageName = target.getAttribute('data-page-name'); // PageName
            const newValue = target.textContent.trim(); // Yeni değer

            // Hata kontrolü
            if (!elementId || !pageName) {
                console.error('HATA: data-element-id veya data-page-name eksik!');
                return;
            }

            // Değişiklik yoksa iptal et
            if (originalValue === newValue) {
                console.log('Değişiklik yok.');
                return;
            }

            try {
                // AJAX isteği
                const response = await fetch('/Home/LogChange', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        elementId: parseInt(elementId), // Sayıya çevir
                        oldValue: originalValue,
                        newValue: newValue,
                        pageName: pageName
                    })
                });

                // Hata durumu
                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`HTTP Hatası: ${response.status} - ${errorText}`);
                }

                // Başarılı kayıt
                console.log('Değişiklik kaydedildi!');
                originalValue = newValue; // Güncel değeri sakla

            } catch (error) {
                console.error('İşlem başarısız:', error);
                target.textContent = originalValue; // Eski değeri geri yükle
            }
        });
    });
});



// Smooth scroll for contact buttons
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Active button state
const currentPage = window.location.pathname;
document.querySelectorAll('.contact-button').forEach(button => {
    if(button.getAttribute('href') === currentPage) {
        button.classList.add('active');
    }
});

// Google Maps Marker Initialization (Ensure you have Google Maps API loaded)
//function initMap() {
//    // Merkez Ofis Marker
//    const merkezOfis = { lat: 39.9250, lng: 32.8533 };
//    new google.maps.Marker({
//        position: merkezOfis,
//        map: new google.maps.Map(document.getElementById("merkez-map"), {
//            zoom: 15,
//            center: merkezOfis,
//        }),
//        icon: {
//            url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
//            scaledSize: new google.maps.Size(40, 40)
//        }
//    });

//    // Teknokent Ofis Marker
//    const teknokentOfis = { lat: 39.9580, lng: 32.7323 };
//    new google.maps.Marker({
//        position: teknokentOfis,
//        map: new google.maps.Map(document.getElementById("teknokent-map"), {
//            zoom: 15,
//            center: teknokentOfis,
//        }),
//        icon: {
//            url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
//            scaledSize: new google.maps.Size(40, 40)
//        }
//    });
//}

document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".contact-button");

    // URL'ye göre aktif butonu belirle
    buttons.forEach(button => {
        if (button.href === window.location.href) {
            button.classList.add("active");
        }
    });
});



// Sayfa yüklendiğinde çalıştır
window.addEventListener('DOMContentLoaded', function () {
    // 1. Google Fonts'tan "Roboto" fontunu ekleyelim.
    var link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // 2. İlgili elementlere (çalışan bölümü, tablo, buton) font-family uygulayalım.
    var elements = document.querySelectorAll('.employee-section, .employee-table, .employee-btn');
    elements.forEach(function (el) {
        el.style.fontFamily = "'Roboto', sans-serif";
    });

    // 3. Butonlara fare ile üzerine gelindiğinde parlak efekt (glow) ekleyelim.
    var buttons = document.querySelectorAll('.employee-btn');
    buttons.forEach(function (btn) {
        btn.addEventListener('mouseenter', function () {
            btn.style.boxShadow = '0 0 12px 4px rgba(60, 126, 107, 0.7)';
        });
        btn.addEventListener('mouseleave', function () {
            btn.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        });
    });
});
document.addEventListener("DOMContentLoaded", function () {
    // Butonu yakalayalım
    const employeeBtn = document.getElementById("employee-btn");
    const employeeTable = document.getElementById("employee-table");
    const employeeTbody = employeeTable.querySelector("tbody");

    employeeBtn.addEventListener("click", function () {
        // Tabloyu görünür hale getir (ilk başta style="display: none" idi)
        employeeTable.style.display = "table"; // veya "block"/"flex"

        // API'den çalışanlar listesini çek
        fetch("/api/Employee")
            .then(response => response.json())
            .then(data => {
                // Önce eski satırları temizle
                employeeTbody.innerHTML = "";

              
                // Her bir çalışan için tabloya <tr> ekle
                data.forEach(emp => {
                    const tr = document.createElement("tr");
                    tr.innerHTML = `
                      <td><img src="${emp.imagePath}" alt="${emp.name}" style="width: 100px; height: 80px;" /></td>
                      <td>${emp.name}</td>
                      <td>${emp.title}</td>
                  `;
                    employeeTbody.appendChild(tr);
                });
            })
            .catch(err => {
                console.error("Çalışanları çekerken hata oluştu:", err);
            });
    });
});

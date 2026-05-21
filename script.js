/**
 * Naz Karaca - Portfolio Core JavaScript Integration
 * Designed for MSGSÜ Coding Course Final Project (June 2026)
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // =========================================================================
    // ÖZELLİK 1: İNTERAKTİF YETENEK & SERTİFİKA FİLTRESİ (about.html)
    // =========================================================================
    const filterButtons = document.querySelectorAll(".filter-btn");
    const filterItems = document.querySelectorAll(".item");

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener("click", () => {
                // Aktif buton stilini güncelle
                filterButtons.forEach(btn => btn.classList.remove("active"));
                button.classList.add("active");

                const filterValue = button.getAttribute("data-filter");

                // Elemanları yumuşak bir geçişle süz
                filterItems.forEach(item => {
                    if (filterValue === "all" || item.classList.contains(filterValue)) {
                        item.style.display = "block";
                        setTimeout(() => { item.style.opacity = "1"; }, 30);
                    } else {
                        item.style.opacity = "0";
                        setTimeout(() => { item.style.display = "none"; }, 200);
                    }
                });
            });
        });
    }

    // =========================================================================
    // ÖZELLİK 2: TASARIM STÜDYOSU JÜRİ GERİ SAYIM PANELİ (index.html)
    // =========================================================================
    const statusTag = document.getElementById("projectStatus");
    if (statusTag) {
        const juryDeadline = new Date("June 2, 2026 14:00:00").getTime();

        const updateJuryCountdown = () => {
            const currentTime = new Date().getTime();
            const distance = juryDeadline - currentTime;

            if (distance > 0) {
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                statusTag.innerHTML = `WIP — ${days}d ${hours}h TO FINAL JURY`;
            } else {
                statusTag.innerHTML = "PROJECT ARCHIVED / JURY COMPLETED";
                statusTag.style.backgroundColor = "#1b5e20";
            }
        };
        updateJuryCountdown();
        setInterval(updateJuryCountdown, 60000);
    }

    // =========================================================================
    // ÖZELLİK 3: RESPONSIVE MOBİL BURGER MENÜ (Tüm Sayfalar)
    // =========================================================================
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("mobile-active");
            menuToggle.innerHTML = navLinks.classList.contains("mobile-active") ? "✕" : "☰";
        });
    }

    // =========================================================================
    // ÖZELLİK 4: MINIMALIST DARK/LIGHT TEMA DEĞİŞTİRİCİ (Tüm Sayfalar)
    // =========================================================================
    const themeToggle = document.getElementById("themeToggle");
    
    if (localStorage.getItem("portfolio-theme") === "dark") {
        document.body.classList.add("dark-theme");
    }

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            document.body.classList.toggle("dark-theme");
            
            if (document.body.classList.contains("dark-theme")) {
                localStorage.setItem("portfolio-theme", "dark");
            } else {
                localStorage.setItem("portfolio-theme", "light");
            }
        });
    }

    // =========================================================================
    // ÖZELLİK 5: PAFTA DETAY LIGHTBOX İNCELEME MODÜLÜ (project-detail.html)
    // =========================================================================
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightboxImg");
    const lightboxCaption = document.getElementById("lightboxCaption");
    const galleryImages = document.querySelectorAll(".gallery-img");

    if (lightbox && galleryImages.length > 0) {
        galleryImages.forEach(img => {
            img.addEventListener("click", () => {
                lightbox.style.display = "flex";
                lightboxImg.src = img.src;
                lightboxCaption.innerHTML = img.alt;
            });
        });

        const closeBtn = document.querySelector(".close-lightbox");
        if (closeBtn) {
            closeBtn.addEventListener("click", () => {
                lightbox.style.display = "none";
            });
        }

        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) {
                lightbox.style.display = "none";
            }
        });
    }
});
document.addEventListener("DOMContentLoaded", () => {
    
    // --- SKILLS FILTERING (ABOUT PAGE) ---
    const filterButtons = document.querySelectorAll(".filter-btn");
    const filterItems = document.querySelectorAll(".item");

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener("click", () => {
                filterButtons.forEach(btn => btn.classList.remove("active"));
                button.classList.add("active");

                const filterValue = button.getAttribute("data-filter");

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

    // --- JURY COUNTDOWN (INDEX PAGE) ---
    const statusTag = document.getElementById("projectStatus");
    if (statusTag) {
        // Yeni Jüri Tarihi: 22 Haziran 2026, Saat: 09:00
        const juryDeadline = new Date("June 22, 2026 09:00:00").getTime();

        const updateJuryCountdown = () => {
            const currentTime = new Date().getTime();
            const distance = juryDeadline - currentTime;

            if (distance > 0) {
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                // Tasarıma uygun akıcı görünüm (Örn: WIP — 26d 14h 05m 23s TO FINAL JURY)
                statusTag.innerHTML = `WIP — ${days}d ${hours}h ${minutes}m ${seconds}s TO FINAL JURY`;
            } else {
                statusTag.innerHTML = "PROJECT ARCHIVED / JURY COMPLETED";
                statusTag.style.backgroundColor = "#1b5e20";
                statusTag.style.color = "#ffffff";
            }
        };
        
        // İlk yüklemede çalıştır ve her saniyede bir (1000ms) güncelle
        updateJuryCountdown();
        setInterval(updateJuryCountdown, 1000);
    }

    // --- MOBILE MENU TOGGLE ---
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("mobile-active");
            menuToggle.innerHTML = navLinks.classList.contains("mobile-active") ? "✕" : "☰";
        });
    }

    // --- DARK / LIGHT THEME TOGGLE ---
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

    // --- LIGHTBOX GALLERY (PROJECT DETAIL) ---
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
document.addEventListener("DOMContentLoaded", function () {

    console.log("JS conectado correctamente");

    /* ===== ACORDEONES (CASOS) ===== */
    const headers = document.querySelectorAll(".accordion-header");

    headers.forEach(header => {
        header.addEventListener("click", function () {

            const item = this.parentElement;

            document.querySelectorAll(".accordion-item").forEach(el => {
                if (el !== item) {
                    el.classList.remove("active");
                }
            });

            item.classList.toggle("active");
        });
    });

    /* ===== VIDEOS ===== */
    const videoBtns = document.querySelectorAll(".video-title");

    videoBtns.forEach(btn => {
        btn.addEventListener("click", function () {

            const item = this.parentElement;

            document.querySelectorAll(".video-item").forEach(v => {
                if (v !== item) v.classList.remove("active");
            });

            item.classList.toggle("active");
        });
    });

    /* ===== ARTES TABS ===== */
    const tabs = document.querySelectorAll(".artes-tab-btn");
    const contents = document.querySelectorAll(".artes-tab-content");

    tabs.forEach(tab => {
        tab.addEventListener("click", function () {

            tabs.forEach(t => t.classList.remove("active"));
            contents.forEach(c => c.classList.remove("active"));

            tab.classList.add("active");

            const target = document.getElementById(tab.dataset.tab);
            if (target) target.classList.add("active");
        });
    });

    /* ===== PROCESO ===== */
    const procesos = document.querySelectorAll(".proceso-item");

    procesos.forEach(item => {
        item.addEventListener("click", function () {

            procesos.forEach(el => {
                if (el !== item) el.classList.remove("active");
            });

            item.classList.toggle("active");
        });
    });

    /* ===== MENU MOBILE ===== */
    const toggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".navbar nav");

    if (toggle && nav) {
        toggle.addEventListener("click", () => {
            nav.classList.toggle("active");
        });
    }

    /* ===== CARRUSEL ===== */
    const track = document.querySelector(".tools-track");
    const prevBtn = document.querySelector(".tool-btn.prev");
    const nextBtn = document.querySelector(".tool-btn.next");

    if (track) {

        let scrollAmount = 0;
        const scrollStep = 200;

        track.innerHTML += track.innerHTML;

        function autoScroll() {
            scrollAmount += 0.5;
            track.style.transform = `translateX(-${scrollAmount}px)`;

            if (scrollAmount >= track.scrollWidth / 2) {
                scrollAmount = 0;
            }
        }

        let auto = setInterval(autoScroll, 16);

        if (nextBtn) {
            nextBtn.addEventListener("click", () => {
                scrollAmount += scrollStep;
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener("click", () => {
                scrollAmount -= scrollStep;
                if (scrollAmount < 0) scrollAmount = 0;
            });
        }

        track.addEventListener("mouseenter", () => {
            clearInterval(auto);
        });

        track.addEventListener("mouseleave", () => {
            auto = setInterval(autoScroll, 16);
        });
    }

});
/* ===== COUNTER ANIMATION ===== */
const counters = document.querySelectorAll(".counter");

const animateCounters = () => {
    counters.forEach(counter => {
        const target = +counter.getAttribute("data-target");
        const suffix = counter.getAttribute("data-suffix") || "";
        let count = 0;

        const increment = target / 100;

        const updateCount = () => {
            if (count < target) {
                count += increment;
                counter.innerText = "+" + Math.floor(count) + suffix;
                requestAnimationFrame(updateCount);
            } else {
                counter.innerText = "+" + target + suffix;
            }
        };

        updateCount();
    });
};

/* ===== ACTIVAR SOLO CUANDO SE VE ===== */
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            observer.disconnect(); // solo una vez
        }
    });
});

observer.observe(document.querySelector(".stats"));
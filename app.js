/* ============================================================
   LICHUVALNYI MASAZH — VANILLA JS
   1) Mobile menu toggle
   2) Sticky header shadow on scroll
   3) Scroll-reveal animation (IntersectionObserver)
   4) Contact form validation
   5) Auto-update footer year
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* ---------- 1. MOBILE MENU TOGGLE ---------- */
    const burger = document.getElementById('burger');
    const nav = document.getElementById('nav');

    if (burger && nav) {
        burger.addEventListener('click', () => {
            const isOpen = nav.classList.toggle('open');
            burger.classList.toggle('active');
            burger.setAttribute('aria-expanded', isOpen);
            burger.setAttribute('aria-label', isOpen ? 'Закрити меню' : 'Відкрити меню');
        });

        // Close menu when a nav link is clicked (mobile UX)
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('open');
                burger.classList.remove('active');
                burger.setAttribute('aria-expanded', 'false');
            });
        });
    }

    /* ---------- 2. STICKY HEADER SHADOW ON SCROLL ---------- */
    const header = document.getElementById('header');
    const onScroll = () => {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', onScroll);
    onScroll(); // run once on load

    /* ---------- 3. SCROLL-REVEAL (IntersectionObserver) ---------- */
    const revealEls = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    obs.unobserve(entry.target); // reveal once, then stop watching
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

        revealEls.forEach(el => observer.observe(el));
    } else {
        // Fallback for very old browsers: show everything
        revealEls.forEach(el => el.classList.add('visible'));
    }

    /* ---------- 4. CONTACT FORM VALIDATION ---------- */
    const form = document.getElementById('contactForm');
    const status = document.getElementById('formStatus');

    if (form) {
        form.addEventListener('submit', (e) => {
            // Якщо підключите Formspree (action+method) — видаліть наступний рядок,
            // щоб форма реально відправлялась на сервер.
            e.preventDefault();

            const name = form.querySelector('#name');
            const phone = form.querySelector('#phone');
            let valid = true;

            // Reset previous error states
            [name, phone].forEach(field => field.classList.remove('invalid'));
            status.textContent = '';
            status.className = 'form__status';

            // Name validation
            if (name.value.trim().length < 2) {
                name.classList.add('invalid');
                valid = false;
            }

            // Phone validation (digits, +, spaces, dashes, parentheses; min 9 digits)
            const phoneDigits = phone.value.replace(/\D/g, '');
            if (phoneDigits.length < 9) {
                phone.classList.add('invalid');
                valid = false;
            }

            if (!valid) {
                status.textContent = 'Будь ласка, заповніть ім\'я та коректний номер телефону.';
                status.classList.add('error');
                return;
            }

            // Success (demo). При інтеграції з бекендом — тут form.submit() або fetch().
            status.textContent = 'Дякуємо! Вашу заявку надіслано. Ми зв\'яжемося з вами найближчим часом.';
            status.classList.add('success');
            form.reset();
        });
    }

    /* ---------- 5. AUTO-UPDATE FOOTER YEAR ---------- */
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

});

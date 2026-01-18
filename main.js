document.body.classList.add('loading');

window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    const preloaderLogo = document.querySelector('.preloader-logo');
    const shineGradient = document.getElementById('shineGradient');
    
    if (shineGradient) {
        shineGradient.innerHTML = `
            <stop offset="0%" style="stop-color:#C5A059;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#C5A059;stop-opacity:1" />
        `;
    }
    
    setTimeout(() => {
        preloaderLogo.classList.add('active');
    }, 50);
    
    setTimeout(() => {
        if (shineGradient) {
            let position = -20;
            const shineInterval = setInterval(() => {
                position += 1; 
                if (position > 120) {
                    clearInterval(shineInterval);
                    shineGradient.innerHTML = `
                        <stop offset="0%" style="stop-color:#C5A059;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#C5A059;stop-opacity:1" />
                    `;
                } else {
                    shineGradient.innerHTML = `
                        <stop offset="0%" style="stop-color:#C5A059;stop-opacity:1" />
                        <stop offset="${Math.max(0, position - 15)}%" style="stop-color:#C5A059;stop-opacity:1" />
                        <stop offset="${position}%" style="stop-color:#fff;stop-opacity:1" />
                        <stop offset="${Math.min(100, position + 15)}%" style="stop-color:#C5A059;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#C5A059;stop-opacity:1" />
                    `;
                }
            }, 25); 
        }
    }, 300);
    
    setTimeout(() => {
        window.scrollTo(0, 0);
        preloader.classList.add('hidden');
        document.body.classList.remove('loading');
    }, 3000); 
});

setTimeout(() => {
    const preloader = document.querySelector('.preloader');
    const preloaderLogo = document.querySelector('.preloader-logo');
    if (preloaderLogo && !preloaderLogo.classList.contains('active')) {
        preloaderLogo.classList.add('active');
    }
    if (!preloader.classList.contains('hidden')) {
        setTimeout(() => {
            window.scrollTo(0, 0);
            preloader.classList.add('hidden');
            document.body.classList.remove('loading');
        }, 2500);
    }
}, 5000);

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-up, .fade-left, .fade-right, .scale-in').forEach(el => {
    observer.observe(el);
});

let lastScroll = 0;
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    const currentScroll = window.scrollY;
    
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
const navOverlay = document.querySelector('.nav-overlay');
const navLinks = document.querySelectorAll('nav a');

function toggleMenu() {
    menuToggle.classList.toggle('active');
    nav.classList.toggle('active');
    navOverlay.classList.toggle('active');
    document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
}

menuToggle.addEventListener('click', toggleMenu);
navOverlay.addEventListener('click', toggleMenu);

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (nav.classList.contains('active')) {
            toggleMenu();
        }
    });
});

const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        faqItems.forEach(faq => {
            faq.classList.remove('active');
        });
        
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});
function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
    document.body.style.overflow = '';
}

document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal-overlay')) {
        e.target.classList.remove('active');
        document.body.style.overflow = '';
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.active').forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = '';
    }
});
window.addEventListener('scroll', () => {
    const heroImage = document.querySelector('.hero-image');
    if (heroImage && window.innerWidth > 768) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;
        heroImage.style.transform = `scale(1.05) translateY(${rate}px)`;
    }
});

let currentLang = 'pl';

function switchLanguage(lang) {
    currentLang = lang;
    
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    document.querySelectorAll('[data-pl][data-en]').forEach(el => {
        const text = el.dataset[lang];
        if (text) {
            el.innerHTML = text;
        }
    });

    document.documentElement.lang = lang;

    localStorage.setItem('preferredLang', lang);
}

document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferredLang');
    if (savedLang && (savedLang === 'pl' || savedLang === 'en')) {
        switchLanguage(savedLang);
    }

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            switchLanguage(btn.dataset.lang);
        });
    });
});

    document.addEventListener("DOMContentLoaded", function() {
        var lat = 52.2338177100163;
        var lon = 21.018876046596603;
        var map = L.map('map', {
            center: [lat, lon],
            zoom: 17,
            zoomControl: true,    
            scrollWheelZoom: false,
            dragging: false,
            tap: false,
            touchZoom: false,
            doubleClickZoom: false,
            attributionControl: false 
        });

        map.on('click', function() {
            map.dragging.enable();
            map.touchZoom.enable();
            map.doubleClickZoom.enable();
            map.scrollWheelZoom.enable();
        });

        map.on('mouseout', function() {
            map.dragging.disable();
            map.touchZoom.disable();
            map.doubleClickZoom.disable();
            map.scrollWheelZoom.disable();
 
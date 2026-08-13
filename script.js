// ========================================
// Modern MEB Sınav Bilgilendirme Paneli
// Interactive Features & Animations
// ========================================

// === Smooth Scroll Enhancement ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// === Intersection Observer for Fade-in Animations ===
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// === Video Card Hover Effects ===
const videoCards = document.querySelectorAll('.video-card');

videoCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.setProperty('--hover-scale', '1.02');
    });

    card.addEventListener('mouseleave', function () {
        this.style.setProperty('--hover-scale', '1');
    });
});

// === In-page YouTube Modal ===
function initVideoModal() {
    const videoModal = document.getElementById('video-modal');
    const videoFrame = document.getElementById('video-frame');
    const videoCloseButton = document.querySelector('.video-modal-close');
    const videoBackdrop = document.querySelector('.video-modal-backdrop');
    const videoCardElements = document.querySelectorAll('.video-card[data-video]');

    if (!videoModal || !videoFrame) {
        console.warn('Video modal elements not found in DOM');
        return;
    }

    function openVideoModal(videoId) {
        const isWebOrigin = window.location.protocol === 'http:' || window.location.protocol === 'https:';
        const embedHost = isWebOrigin ? 'https://www.youtube-nocookie.com' : 'https://www.youtube.com';
        const params = new URLSearchParams({
            autoplay: '1',
            rel: '0',
            modestbranding: '1',
            fs: '1',
            controls: '1',
            playsinline: '1',
        });

        if (isWebOrigin) {
            params.set('origin', window.location.origin);
        }

        const embedUrl = `${embedHost}/embed/${videoId}?${params.toString()}`;
        try {
            videoFrame.src = embedUrl;
            videoModal.classList.add('is-open');
            videoModal.setAttribute('aria-hidden', 'false');
            document.body.classList.add('modal-open');
        } catch (error) {
            console.error('Video modal açılırken hata:', error);
        }
    }

    function closeVideoModal() {
        videoModal.classList.remove('is-open');
        videoModal.setAttribute('aria-hidden', 'true');
        videoFrame.src = '';
        document.body.classList.remove('modal-open');
    }

    // Close button
    if (videoCloseButton) {
        videoCloseButton.addEventListener('click', (event) => {
            event.stopPropagation();
            closeVideoModal();
        });
    }

    // Backdrop click
    if (videoBackdrop) {
        videoBackdrop.addEventListener('click', closeVideoModal);
    }

    // Escape key
    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && videoModal.classList.contains('is-open')) {
            closeVideoModal();
        }
    });
}

// === Alert Animations ===
const alerts = document.querySelectorAll('.alert');

alerts.forEach((alert, index) => {
    alert.style.animationDelay = `${index * 0.1}s`;
});

// === Button Ripple Effect ===
const buttons = document.querySelectorAll('.btn, .store-btn');

buttons.forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// === Countdown Timer (Optional - for exam day) ===
function updateCountdown() {
    const examDate = new Date();
    examDate.setHours(7, 15, 0, 0); // 07:15 imza saati

    const now = new Date();
    const diff = examDate - now;

    if (diff > 0 && diff < 86400000) { // Eğer bugün ve henüz geçmemişse
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        // Countdown göstermek için bir element varsa güncelle
        const countdownEl = document.getElementById('countdown');
        if (countdownEl) {
            countdownEl.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
    }
}

// Her saniye countdown'u güncelle
setInterval(updateCountdown, 1000);

// === Lazy Loading Images ===
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// === Scroll Progress Indicator ===
function updateScrollProgress() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;

    const progressBar = document.getElementById('scroll-progress');
    if (progressBar) {
        progressBar.style.width = scrolled + '%';
    }
}

window.addEventListener('scroll', updateScrollProgress);

// === External Link Warning (Optional) ===
const externalLinks = document.querySelectorAll('a[target="_blank"]');

externalLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        // Opsiyonel: Dış bağlantı uyarısı eklenebilir
        // Bu örnekte sadece rel="noopener noreferrer" kontrolü yapıyoruz
        if (!this.hasAttribute('rel')) {
            this.setAttribute('rel', 'noopener noreferrer');
        }
    });
});

// === Print Optimization ===
window.addEventListener('beforeprint', () => {
    document.body.classList.add('printing');
});

window.addEventListener('afterprint', () => {
    document.body.classList.remove('printing');
});

// === Performance Monitoring ===
if ('PerformanceObserver' in window) {
    const perfObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            if (entry.entryType === 'largest-contentful-paint') {
                console.log('LCP:', entry.startTime);
            }
        }
    });

    perfObserver.observe({ entryTypes: ['largest-contentful-paint'] });
}

// === Accessibility: Skip to Main Content ===
const skipLink = document.createElement('a');
skipLink.href = '#main-content';
skipLink.textContent = 'Ana içeriğe geç';
skipLink.className = 'skip-link';
skipLink.style.cssText = `
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--meb-primary);
  color: white;
  padding: 8px;
  text-decoration: none;
  z-index: 100;
`;

skipLink.addEventListener('focus', () => {
    skipLink.style.top = '0';
});

skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
});

document.body.insertBefore(skipLink, document.body.firstChild);

// === Console Welcome Message ===
console.log('%c🎓 HALİLİYE İLÇE MİLLÎ EĞİTİM MÜDÜRLÜĞÜ', 'color: #0066cc; font-size: 20px; font-weight: bold;');
console.log('%cDireksiyon Uygulama Sınavı Bilgilendirme Paneli', 'color: #00a8e8; font-size: 14px;');
console.log('%cİyi sınavlar dileriz! 🚗', 'color: #10b981; font-size: 12px;');

// === Initialize ===
document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ Sayfa yüklendi ve hazır!');
    initVideoModal();
    updateCountdown();
    updateScrollProgress();
});

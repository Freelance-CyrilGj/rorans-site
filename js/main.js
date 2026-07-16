Promise.all([
    fetch('/header.html').then(r => r.text()),
    fetch('/footer.html').then(r => r.text())
]).then(([header, footer]) => {
    const headerEl = document.getElementById('header');
    const footerEl = document.getElementById('footer');

    if (headerEl) headerEl.innerHTML = header;
    if (footerEl) footerEl.innerHTML = footer;

    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    initMenu();
    updateActiveNav();
});

function updateActiveNav() {
    const normalize = (path) => {
    path = path.replace(/\/index\.html$/i, '');
    if (path !== '/' && path.endsWith('/')) {
      path = path.slice(0, -1);
    }
    return path || '/';
  };

  const currentPath = normalize(window.location.pathname);

  document.querySelectorAll('#mainMenu a').forEach(link => {
    const href = link.getAttribute('href') || '';
    
    if (href.startsWith('#')) {
      link.classList.remove('active');
      return;
    }

    const linkPath = normalize(new URL(href, window.location.href).pathname);
    
    link.classList.toggle('active', linkPath === currentPath);
  });
}

function initMenu() {
    const burgerBtn = document.getElementById('burgerBtn');
    const mainMenu = document.getElementById('mainMenu');

    if (!burgerBtn || !mainMenu) return;

    burgerBtn.addEventListener('click', () => {
        mainMenu.classList.toggle('open');
        burgerBtn.setAttribute('aria-expanded', mainMenu.classList.contains('open'));
    });
}

// Ouvrir
document.addEventListener('DOMContentLoaded', function () {
    const lightbox    = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn    = document.querySelector('.lightbox .close');

    /* ---- Ouvrir ---- */
    document.querySelectorAll('img.zoomable').forEach(img => {
        img.addEventListener('click', function (e) {
            e.stopPropagation();
            lightboxImg.src = this.src;
            lightbox.classList.add('active');
        });
    });

    /* ---- Croix ---- */
    if (closeBtn) {
        closeBtn.addEventListener('click', function (e) {
            e.stopPropagation();   // empêche le clic de remonter au div
            closeLightbox();
        });
    }

    /* ---- Clic sur le fond noir ---- */
    lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) {  // uniquement si on clique SUR le fond
            closeLightbox();
        }
    });

    /* ---- Échap ---- */
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeLightbox();
    });
});

/* ---- Fonction ferme ---- */
function closeLightbox() {
    const lb = document.getElementById('lightbox');
    if (lb) lb.classList.remove('active');
}


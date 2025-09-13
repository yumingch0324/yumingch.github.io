// Mobile nav
const navBtn = document.querySelector('.nav-toggle');
const nav = document.getElementById('nav');
if (navBtn){
  navBtn.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('show');
    navBtn.setAttribute('aria-expanded', String(isOpen));
  });
}

// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Theme toggle (light/dark)
const toggle = document.querySelector('.theme-toggle');
if (toggle){
  toggle.addEventListener('click', () => {
    const current = document.documentElement.dataset.theme;
    const next = current === 'light' ? 'dark' : current === 'dark' ? '' : 'light';
    document.documentElement.dataset.theme = next;
  });
}

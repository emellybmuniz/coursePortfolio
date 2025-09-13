// --- Dark Mode Toggle ---
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;
const themeIcon = document.querySelector('.dark-mode-container ion-icon');

const setTheme = (isDark) => {
    if (isDark) {
        body.classList.add('dark-mode');
        darkModeToggle.checked = true;
        localStorage.setItem('theme', 'dark');
        if (themeIcon) themeIcon.setAttribute('name', 'sunny-outline');
    } else {
        body.classList.remove('dark-mode');
        darkModeToggle.checked = false;
        localStorage.setItem('theme', 'light');
        if (themeIcon) themeIcon.setAttribute('name', 'moon-outline');
    }
};

// Event listener para a mudança no toggle
darkModeToggle.addEventListener('change', () => {
    setTheme(darkModeToggle.checked);
});

// --- Tema Inicial ---

const savedTheme = localStorage.getItem('theme');

const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;


if (savedTheme === 'dark') {
    setTheme(true);
} else if (savedTheme === 'light') {
    setTheme(false);
} else {
    setTheme(prefersDark);
}

// --- Destaque do Menu Ativo ao Rolar a Página ---
const sections = document.querySelectorAll('main section[id]');
const menuLinks = document.querySelectorAll('.menu-link');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionTop = current.offsetTop - 150; 
        if (scrollY >= sectionTop && scrollY < sectionTop + current.offsetHeight) {
            menuLinks.forEach(link => link.classList.remove('active'));
            document.querySelector(`.menu-link[href*=${current.id}]`).classList.add('active');
        }
    });
});

// --- Validação e Redirecionamento do Formulário de Contato ---
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(event) {

        event.preventDefault();
        window.location.href = 'pages/thanks.html';
    });
}
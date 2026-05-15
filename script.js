// Loader
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
    }, 500);
});

// Menu Mobile
const mobileMenu = document.getElementById('mobileMenu');
const navLinks = document.getElementById('navLinks');

if (mobileMenu) {
    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const spans = mobileMenu.querySelectorAll('span');
        if (navLinks.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// Fechar menu ao clicar em link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const spans = mobileMenu.querySelectorAll('span');
        if (spans.length > 0) {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 2px 30px rgba(0, 102, 204, 0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 102, 204, 0.1)';
        }
    }
});

// Animação de scroll
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

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Formulário
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const telefone = document.getElementById('telefone').value;
        const condominio = document.getElementById('condominio').value;
        const mensagem = document.getElementById('mensagem').value;

        const texto = `Olá! Me chamo ${nome} e gostaria de solicitar um orçamento.%0A%0A*Condomínio:* ${condominio || 'Não informado'}%0A*E-mail:* ${email}%0A*Telefone:* ${telefone}%0A%0A*Mensagem:* ${mensagem}`;

        window.open(`https://wa.me/5521967658673?text=${texto}`, '_blank');
    });
}

// Máscara de telefone
const telefoneInput = document.getElementById('telefone');
if (telefoneInput) {
    telefoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length <= 11) {
            if (value.length > 2) value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
            if (value.length > 10) value = `${value.slice(0, 10)}-${value.slice(10)}`;
            e.target.value = value;
        }
    });
}

// Carregar imagens dinâmicas (se houver no localStorage)
function loadDynamicImages() {
    const portfolioGrid = document.getElementById('portfolioGrid');
    if (!portfolioGrid) return;

    let savedImages = JSON.parse(localStorage.getItem('ps_piscinas_images'));
    
    // Lista padrão caso o localStorage esteja vazio (primeiro acesso do usuário)
    const defaultImages = [
        { 
            url: "https://kimi-web-img.moonshot.cn/img/bluewaterpoolswi.com/248b50d622275296679e33cda90555fdaa1627ac.jpg", 
            title: "Condomínio Solar das Palmeiras", 
            category: "Manutenção semanal completa • Barra da Tijuca" 
        },
        { 
            url: "https://kimi-web-img.moonshot.cn/img/aquapremierpools.com/ed59c92f87a6ad0acac1b776470fd44163b0e563.jpeg", 
            title: "Residencial Parque Azul", 
            category: "Guarda-vidas diário • Recreio dos Bandeirantes" 
        },
        { 
            url: "https://kimi-web-img.moonshot.cn/img/bluewaterchemical.com/ea58a8ed7ae5c7835491a2b7dc73e411c4d7eec3.jpg", 
            title: "Condomínio Ville de France", 
            category: "Tratamento químico especializado • Jacarepaguá" 
        },
        { 
            url: "https://kimi-web-img.moonshot.cn/img/kimberleypoolcare.com.au/df1cac929e46b632b432059e08e0843622d73ece.jpg", 
            title: "Manutenção Profissional", 
            category: "Equipe técnica em ação • Limpeza profunda" 
        }
    ];

    if (!savedImages || savedImages.length === 0) {
        savedImages = defaultImages;
    }

    portfolioGrid.innerHTML = ''; // Limpa para evitar duplicatas

    savedImages.forEach(imgData => {
        const isVideo = imgData.url.includes('video/mp4') || imgData.url.endsWith('.mp4') || imgData.url.startsWith('data:video/mp4');
        const item = document.createElement('div');
        item.className = 'portfolio-item fade-in';
        item.innerHTML = `
            ${isVideo ? `<video src="${imgData.url}" muted loop onmouseover="this.play()" onmouseout="this.pause()"></video>` : `<img src="${imgData.url}" alt="${imgData.title}">`}
            <div class="portfolio-overlay">
                <h3>${imgData.title}</h3>
                <p>${imgData.category}</p>
            </div>
        `;
        portfolioGrid.appendChild(item);
        if (typeof observer !== 'undefined') observer.observe(item);
    });
}

document.addEventListener('DOMContentLoaded', loadDynamicImages);

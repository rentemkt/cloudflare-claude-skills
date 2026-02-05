// Espaço Consciência - JavaScript Otimizado para SEO

// Configuração global
const CONFIG = {
    siteName: 'Espaço Consciência',
    phone: '+351 935 522 267',
    email: 'info@espacoconsciencia.pt',
    addresses: {
        porto: 'Rua de Camões 218, 4º andar sala 3, 4000-138 Porto',
        barcelos: 'Avenida Alcaides Faria 333B Sala 3, 4750-106 Arcozelo, Barcelos'
    }
};

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
    setupAnalytics();
    setupSEOOptimizations();
    setupAccessibility();
});

// Função principal de inicialização
function initializeWebsite() {
    setupNavigation();
    setupContactForms();
    setupSmoothScrolling();
    setupLazyLoading();
    setupSchemaMarkup();
}

// Configuração da navegação
function setupNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Fechar menu ao clicar em link (mobile)
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });
    
    // Destacar link ativo baseado na URL
    highlightActiveNavLink();
}

// Destacar link de navegação ativo
function highlightActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPath = new URL(link.href).pathname;
        if (linkPath === currentPath) {
            link.classList.add('active');
        }
    });
}

// Configuração de formulários de contato
function setupContactForms() {
    const forms = document.querySelectorAll('.contact-form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this);
        });
    });
}

// Manipular envio de formulário
function handleFormSubmission(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Validação básica
    if (!validateForm(data)) {
        showMessage('Por favor, preencha todos os campos obrigatórios.', 'error');
        return;
    }
    
    // Simular envio (substituir por integração real)
    showMessage('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
    form.reset();
    
    // Tracking de conversão
    trackConversion('form_submission', {
        form_type: form.dataset.formType || 'contact',
        page: window.location.pathname
    });
}

// Validação de formulário
function validateForm(data) {
    const required = ['nome', 'email', 'telefone'];
    return required.every(field => data[field] && data[field].trim() !== '');
}

// Exibir mensagens
function showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${type}`;
    messageDiv.textContent = message;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// Configuração de scroll suave
function setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Configuração de lazy loading para imagens
function setupLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// Configuração de Schema Markup dinâmico
function setupSchemaMarkup() {
    // Schema para LocalBusiness
    const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": "MedicalBusiness",
        "name": "Espaço Consciência",
        "description": "Clínica de Psicoterapia especializada no Método Consciência, EMDR e Hipnose Clínica",
        "url": "https://espacoconsciencia.pt",
        "telephone": CONFIG.phone,
        "email": CONFIG.email,
        "priceRange": "€€",
        "paymentAccepted": "Cash, Credit Card",
        "currenciesAccepted": "EUR",
        "openingHours": "Mo-Fr 10:00-19:00",
        "address": [
            {
                "@type": "PostalAddress",
                "streetAddress": "Rua de Camões 218, 4º andar sala 3",
                "addressLocality": "Porto",
                "postalCode": "4000-138",
                "addressCountry": "PT"
            },
            {
                "@type": "PostalAddress",
                "streetAddress": "Avenida Alcaides Faria 333B Sala 3",
                "addressLocality": "Barcelos",
                "postalCode": "4750-106",
                "addressCountry": "PT"
            }
        ],
        "geo": [
            {
                "@type": "GeoCoordinates",
                "latitude": "41.1579",
                "longitude": "-8.6291"
            },
            {
                "@type": "GeoCoordinates",
                "latitude": "41.5388",
                "longitude": "-8.6151"
            }
        ],
        "sameAs": [
            "https://www.facebook.com/espacoconsciencia",
            "https://www.instagram.com/espacoconsciencia"
        ],
        "founder": {
            "@type": "Person",
            "name": "Dra. Mónica de Sá",
            "jobTitle": "Diretora Clínica e Fundadora",
            "description": "Psicóloga Clínica especializada em EMDR e Hipnose Clínica"
        },
        "medicalSpecialty": [
            "Clinical Psychology",
            "EMDR Therapy",
            "Clinical Hypnosis",
            "Mind-Body Therapy"
        ]
    };
    
    addSchemaMarkup(localBusinessSchema);
    
    // Schema específico da página
    addPageSpecificSchema();
}

// Adicionar schema markup ao head
function addSchemaMarkup(schema) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
}

// Schema específico por tipo de página
function addPageSpecificSchema() {
    const path = window.location.pathname;
    
    if (path.includes('/blog/') || path.includes('/artigo/')) {
        addArticleSchema();
    } else if (path.includes('/psicologo-') || path.includes('/emdr-') || path.includes('/hipnose-')) {
        addServiceSchema();
    }
}

// Schema para artigos
function addArticleSchema() {
    const title = document.querySelector('h1')?.textContent;
    const description = document.querySelector('meta[name="description"]')?.content;
    const publishDate = document.querySelector('meta[property="article:published_time"]')?.content;
    
    if (title) {
        const articleSchema = {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": title,
            "description": description,
            "author": {
                "@type": "Organization",
                "name": "Espaço Consciência"
            },
            "publisher": {
                "@type": "Organization",
                "name": "Espaço Consciência",
                "logo": {
                    "@type": "ImageObject",
                    "url": "https://espacoconsciencia.pt/assets/images/logo-Espaco-consciencia-logo.png"
                }
            },
            "datePublished": publishDate || new Date().toISOString(),
            "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": window.location.href
            }
        };
        
        addSchemaMarkup(articleSchema);
    }
}

// Schema para páginas de serviço
function addServiceSchema() {
    const title = document.querySelector('h1')?.textContent;
    const description = document.querySelector('meta[name="description"]')?.content;
    
    if (title) {
        const serviceSchema = {
            "@context": "https://schema.org",
            "@type": "MedicalProcedure",
            "name": title,
            "description": description,
            "provider": {
                "@type": "MedicalBusiness",
                "name": "Espaço Consciência"
            }
        };
        
        addSchemaMarkup(serviceSchema);
    }
}

// Configuração de analytics e tracking
function setupAnalytics() {
    // Google Analytics 4 (substituir por ID real)
    if (typeof gtag !== 'undefined') {
        gtag('config', 'GA_MEASUREMENT_ID', {
            page_title: document.title,
            page_location: window.location.href
        });
    }
    
    // Tracking de eventos importantes
    trackPageView();
    setupEventTracking();
}

// Tracking de visualização de página
function trackPageView() {
    trackEvent('page_view', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: window.location.pathname
    });
}

// Configuração de tracking de eventos
function setupEventTracking() {
    // Tracking de cliques em CTAs
    const ctaButtons = document.querySelectorAll('.cta-button, .form-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            trackEvent('cta_click', {
                button_text: this.textContent.trim(),
                page: window.location.pathname
            });
        });
    });
    
    // Tracking de cliques em telefone
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            trackEvent('phone_click', {
                phone_number: this.href.replace('tel:', ''),
                page: window.location.pathname
            });
        });
    });
    
    // Tracking de scroll depth
    setupScrollTracking();
}

// Tracking de profundidade de scroll
function setupScrollTracking() {
    let scrollDepths = [25, 50, 75, 90];
    let trackedDepths = [];
    
    window.addEventListener('scroll', function() {
        const scrollPercent = Math.round(
            (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
        );
        
        scrollDepths.forEach(depth => {
            if (scrollPercent >= depth && !trackedDepths.includes(depth)) {
                trackedDepths.push(depth);
                trackEvent('scroll_depth', {
                    depth: depth,
                    page: window.location.pathname
                });
            }
        });
    });
}

// Função genérica de tracking
function trackEvent(eventName, parameters) {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, parameters);
    }
    
    // Console log para debug
    console.log('Event tracked:', eventName, parameters);
}

// Tracking de conversões
function trackConversion(conversionType, data) {
    trackEvent('conversion', {
        conversion_type: conversionType,
        ...data
    });
}

// Otimizações de SEO
function setupSEOOptimizations() {
    // Adicionar breadcrumbs dinâmicos
    addBreadcrumbs();
    
    // Otimizar imagens
    optimizeImages();
    
    // Adicionar meta tags dinâmicas
    updateMetaTags();
}

// Adicionar breadcrumbs
function addBreadcrumbs() {
    const breadcrumbContainer = document.querySelector('.breadcrumbs');
    if (!breadcrumbContainer) return;
    
    const path = window.location.pathname;
    const segments = path.split('/').filter(segment => segment);
    
    let breadcrumbHTML = '<ol class="breadcrumb-list">';
    breadcrumbHTML += '<li class="breadcrumb-item"><a href="/">Início</a></li>';
    
    let currentPath = '';
    segments.forEach((segment, index) => {
        currentPath += '/' + segment;
        const isLast = index === segments.length - 1;
        const title = formatBreadcrumbTitle(segment);
        
        if (isLast) {
            breadcrumbHTML += `<li class="breadcrumb-separator">›</li>`;
            breadcrumbHTML += `<li class="breadcrumb-item">${title}</li>`;
        } else {
            breadcrumbHTML += `<li class="breadcrumb-separator">›</li>`;
            breadcrumbHTML += `<li class="breadcrumb-item"><a href="${currentPath}">${title}</a></li>`;
        }
    });
    
    breadcrumbHTML += '</ol>';
    breadcrumbContainer.innerHTML = breadcrumbHTML;
}

// Formatar título do breadcrumb
function formatBreadcrumbTitle(segment) {
    const titles = {
        'psicologo-porto': 'Psicólogo Porto',
        'psicologo-barcelos': 'Psicólogo Barcelos',
        'emdr-porto': 'EMDR Porto',
        'hipnose-clinica-porto': 'Hipnose Clínica Porto',
        'blog': 'Blog',
        'sobre': 'Sobre Nós',
        'contactos': 'Contactos'
    };
    
    return titles[segment] || segment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

// Otimizar imagens
function optimizeImages() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Adicionar loading lazy se não estiver definido
        if (!img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }
        
        // Adicionar alt text se estiver vazio
        if (!img.alt) {
            const src = img.src || img.dataset.src;
            if (src) {
                const filename = src.split('/').pop().split('.')[0];
                img.alt = formatAltText(filename);
            }
        }
    });
}

// Formatar alt text baseado no nome do arquivo
function formatAltText(filename) {
    const altTexts = {
        'logo-Espaco-consciencia-logo': 'Logo Espaço Consciência - Clínica de Psicoterapia',
        'EC-Monica': 'Dra. Mónica de Sá - Diretora Clínica Espaço Consciência',
        'DSC07131-1': 'Consultório Espaço Consciência - Ambiente acolhedor',
        'DSC07132-1': 'Sala de terapia Espaço Consciência - Espaço terapêutico',
        'Ilustracao-EC-1': 'Ilustração Espaço Consciência - Transformação emocional'
    };
    
    return altTexts[filename] || filename.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

// Atualizar meta tags dinâmicas
function updateMetaTags() {
    // Atualizar canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        document.head.appendChild(canonical);
    }
    canonical.href = window.location.href;
    
    // Atualizar Open Graph URL
    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
        ogUrl.content = window.location.href;
    }
}

// Configuração de acessibilidade
function setupAccessibility() {
    // Adicionar skip links
    addSkipLinks();
    
    // Melhorar navegação por teclado
    improveKeyboardNavigation();
    
    // Adicionar ARIA labels
    addAriaLabels();
}

// Adicionar skip links
function addSkipLinks() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Saltar para o conteúdo principal';
    skipLink.className = 'sr-only';
    skipLink.style.position = 'absolute';
    skipLink.style.top = '-40px';
    skipLink.style.left = '6px';
    skipLink.style.background = '#000';
    skipLink.style.color = '#fff';
    skipLink.style.padding = '8px';
    skipLink.style.textDecoration = 'none';
    skipLink.style.zIndex = '100000';
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
}

// Melhorar navegação por teclado
function improveKeyboardNavigation() {
    // Adicionar indicadores de foco visíveis
    const style = document.createElement('style');
    style.textContent = `
        *:focus {
            outline: 2px solid #8e44ad;
            outline-offset: 2px;
        }
        
        .sr-only:focus {
            position: static;
            width: auto;
            height: auto;
            padding: 8px;
            margin: 0;
            overflow: visible;
            clip: auto;
            white-space: normal;
        }
    `;
    document.head.appendChild(style);
}

// Adicionar ARIA labels
function addAriaLabels() {
    // Adicionar labels para navegação
    const nav = document.querySelector('nav');
    if (nav && !nav.hasAttribute('aria-label')) {
        nav.setAttribute('aria-label', 'Navegação principal');
    }
    
    // Adicionar labels para formulários
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        if (!form.hasAttribute('aria-label')) {
            form.setAttribute('aria-label', 'Formulário de contacto');
        }
    });
}

// Utilitários
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Exportar funções para uso global
window.EspacoConsciencia = {
    trackEvent,
    trackConversion,
    showMessage
};


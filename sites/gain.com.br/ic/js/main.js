// Espaço Consciência - Funcionalidades Principais

// Configuração global
window.EspacoConsciencia = {
    
    // Inicialização
    init: function() {
        this.initNavigation();
        this.initForms();
        this.initAnimations();
        console.log('Espaço Consciência - Site inicializado');
    },
    
    // Inicializa navegação
    initNavigation: function() {
        // Smooth scroll para âncoras
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
        
        // Destaque do menu ativo
        const currentPath = window.location.pathname;
        document.querySelectorAll('.nav-link').forEach(link => {
            if (link.getAttribute('href') === currentPath || 
                (currentPath.includes(link.getAttribute('href')) && link.getAttribute('href') !== './')) {
                link.classList.add('active');
            }
        });
    },
    
    // Inicializa formulários
    initForms: function() {
        const contactForm = document.getElementById('contactForm');
        if (!contactForm) return;
        
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit(contactForm);
        });
    },
    
    // Manipula envio do formulário
    handleFormSubmit: function(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        // Estado de carregamento
        submitButton.textContent = 'Enviando...';
        submitButton.disabled = true;
        
        // Simula envio (substituir por integração real)
        setTimeout(() => {
            // Sucesso
            this.showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
            form.reset();
            
            // Restaura botão
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    },
    
    // Mostra notificação
    showNotification: function(message, type = 'info') {
        // Cria elemento de notificação
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Estilos inline para garantir funcionamento
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : '#2196F3'};
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            z-index: 10000;
            font-family: Inter, sans-serif;
            font-size: 14px;
            max-width: 300px;
            word-wrap: break-word;
        `;
        
        document.body.appendChild(notification);
        
        // Remove após 5 segundos
        setTimeout(() => {
            notification.remove();
        }, 5000);
    },
    
    // Inicializa animações
    initAnimations: function() {
        // Animação das estatísticas
        const statsSection = document.querySelector('.stats-section');
        if (statsSection) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateStats();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(statsSection);
        }
        
        // Animação de fade-in para cards
        const cards = document.querySelectorAll('.service-card, .consulta-card, .blog-card');
        if (cards.length > 0) {
            const cardObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, { threshold: 0.1 });
            
            cards.forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                cardObserver.observe(card);
            });
        }
    },
    
    // Anima estatísticas
    animateStats: function() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const finalValue = stat.textContent;
            const numericValue = parseInt(finalValue.replace(/\D/g, ''));
            const suffix = finalValue.replace(/[\d,]/g, '');
            
            let currentValue = 0;
            const increment = numericValue / 50;
            
            const timer = setInterval(() => {
                currentValue += increment;
                if (currentValue >= numericValue) {
                    stat.textContent = finalValue;
                    clearInterval(timer);
                } else {
                    const displayValue = Math.floor(currentValue);
                    stat.textContent = displayValue.toLocaleString() + suffix;
                }
            }, 40);
        });
    }
};

// Inicialização quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    window.EspacoConsciencia.init();
});

// Fallback para garantir inicialização
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        window.EspacoConsciencia.init();
    });
} else {
    window.EspacoConsciencia.init();
}


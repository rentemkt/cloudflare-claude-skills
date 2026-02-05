// Sistema de Roteamento para URLs Amigáveis
// Espaço Consciência - SEO Friendly URLs

class Router {
    constructor() {
        this.routes = new Map();
        this.basePath = this.getBasePath();
        this.init();
    }
    
    getBasePath() {
        // Detecta automaticamente o caminho base da aplicação
        const path = window.location.pathname;
        const segments = path.split('/').filter(segment => segment);
        
        // Se estiver em subpasta (ex: site.com/v2/), detecta automaticamente
        if (segments.length > 0 && !this.isPageRoute(segments[segments.length - 1])) {
            return '/' + segments.join('/') + '/';
        }
        return '/';
    }
    
    isPageRoute(segment) {
        // Lista de possíveis rotas de páginas
        const pageRoutes = [
            'psicologia-porto', 'psychology-porto', 'psicologia-oporto',
            'psicologia-barcelos', 'psychology-barcelos',
            'terapia-online', 'online-therapy',
            'emdr-porto', 'emdr-oporto',
            'hipnose-clinica', 'clinical-hypnosis', 'hipnosis-clinica',
            'terapia-casal', 'couples-therapy', 'terapia-pareja',
            'saude-mental-empresas', 'corporate-mental-health', 'salud-mental-empresas',
            'metodo-consciencia', 'consciousness-method', 'metodo-consciencia',
            'burnout-executivos', 'executive-burnout',
            'ansiedade-pos-covid', 'post-covid-anxiety',
            'sindrome-impostor', 'impostor-syndrome'
        ];
        return pageRoutes.includes(segment);
    }
    
    init() {
        this.setupRoutes();
        this.handleInitialRoute();
        this.setupNavigation();
        
        // Escuta mudanças no histórico do navegador
        window.addEventListener('popstate', (e) => {
            this.handleRoute(window.location.pathname);
        });
    }
    
    setupRoutes() {
        // Mapeamento de URLs amigáveis para arquivos
        const routeMap = {
            // Português
            'psicologia-porto': 'psicologia/porto.html',
            'psicologia-barcelos': 'psicologia/barcelos.html',
            'terapia-online': 'online/index.html',
            'emdr-porto': 'emdr/porto.html',
            'hipnose-clinica': 'hipnose/index.html',
            'terapia-casal': 'casal/index.html',
            'saude-mental-empresas': 'empresas/index.html',
            
            // Inglês
            'psychology-porto': 'psicologia/porto.html',
            'psychology-barcelos': 'psicologia/barcelos.html',
            'online-therapy': 'online/index.html',
            'clinical-hypnosis': 'hipnose/index.html',
            'couples-therapy': 'casal/index.html',
            'corporate-mental-health': 'empresas/index.html',
            
            // Espanhol
            'psicologia-oporto': 'psicologia/porto.html',
            'terapia-pareja': 'casal/index.html',
            'hipnosis-clinica': 'hipnose/index.html',
            'salud-mental-empresas': 'empresas/index.html',
            
            // Artigos do blog
            'metodo-consciencia': 'artigos/metodo-consciencia.html',
            'consciousness-method': 'artigos/metodo-consciencia.html',
            'terapia-emdr-trauma': 'artigos/terapia-emdr-trauma.html',
            'emdr-trauma-therapy': 'artigos/terapia-emdr-trauma.html',
            'hipnose-clinica-poder-mente': 'artigos/hipnose-clinica-poder-mente.html',
            'clinical-hypnosis-mind-power': 'artigos/hipnose-clinica-poder-mente.html',
            'tratar-sintomas-vs-curar-origem': 'artigos/tratar-sintomas-vs-curar-origem.html',
            'treating-symptoms-vs-curing-origin': 'artigos/tratar-sintomas-vs-curar-origem.html',
            'neurobiologia-ansiedade': 'artigos/neurobiologia-ansiedade.html',
            'neurobiology-anxiety': 'artigos/neurobiologia-ansiedade.html',
            'burnout-executivos': 'artigos/burnout-executivos.html',
            'executive-burnout': 'artigos/burnout-executivos.html',
            'ansiedade-pos-covid': 'artigos/ansiedade-pos-covid.html',
            'post-covid-anxiety': 'artigos/ansiedade-pos-covid.html',
            'sindrome-impostor': 'artigos/sindrome-impostor.html',
            'impostor-syndrome': 'artigos/sindrome-impostor.html',
            'como-escolher-psicologo': 'artigos/como-escolher-psicologo.html',
            'how-to-choose-psychologist': 'artigos/como-escolher-psicologo.html'
        };
        
        // Registra todas as rotas
        Object.entries(routeMap).forEach(([route, file]) => {
            this.routes.set(route, file);
        });
    }
    
    handleInitialRoute() {
        const currentPath = window.location.pathname;
        this.handleRoute(currentPath);
    }
    
    handleRoute(path) {
        // Remove o basePath da URL para obter a rota limpa
        let route = path.replace(this.basePath, '');
        
        // Remove extensões .html se existirem
        route = route.replace('.html', '');
        
        // Se for a raiz, carrega a página principal
        if (!route || route === '/') {
            this.loadMainPage();
            return;
        }
        
        // Verifica se a rota existe no mapeamento
        if (this.routes.has(route)) {
            this.loadPage(this.routes.get(route), route);
        } else {
            // Se não encontrar a rota, tenta carregar como arquivo direto
            this.loadPage(route + '.html', route);
        }
    }
    
    loadMainPage() {
        // Carrega o conteúdo da página principal
        document.title = this.getPageTitle('home');
        this.updateBreadcrumbs(['home']);
        // O conteúdo principal já está no index.html
    }
    
    async loadPage(file, route) {
        try {
            // Simula carregamento de página (em uma implementação real, faria fetch do conteúdo)
            document.title = this.getPageTitle(route);
            this.updateBreadcrumbs(this.getBreadcrumbs(route));
            this.updateCanonicalUrl(route);
            
            // Atualiza a URL sem recarregar a página
            const newUrl = this.basePath + route;
            if (window.location.pathname !== newUrl) {
                window.history.pushState({ route }, '', newUrl);
            }
            
            // Dispara evento personalizado para atualização de conteúdo
            window.dispatchEvent(new CustomEvent('routeChanged', { 
                detail: { route, file } 
            }));
            
        } catch (error) {
            console.error('Erro ao carregar página:', error);
            this.handle404();
        }
    }
    
    getPageTitle(route) {
        const currentLang = window.languageManager?.currentLanguage || 'pt';
        
        const titles = {
            pt: {
                'home': 'Psicoterapia Porto e Barcelos - Método Consciência | Espaço Consciência',
                'psicologia-porto': 'Psicólogo no Porto - Método Consciência | Espaço Consciência',
                'psicologia-barcelos': 'Psicólogo em Barcelos - Método Consciência | Espaço Consciência',
                'terapia-online': 'Psicólogo Online Portugal - Consultas Multilíngues | Espaço Consciência',
                'emdr-porto': 'Terapia EMDR Porto - Tratamento de Trauma | Espaço Consciência',
                'hipnose-clinica': 'Hipnose Clínica Porto - Hipnoterapia | Espaço Consciência',
                'terapia-casal': 'Terapia de Casal Barcelos - Método Consciência | Espaço Consciência',
                'saude-mental-empresas': 'Saúde Mental Empresas Porto - Psicologia Corporativa | Espaço Consciência',
                'metodo-consciencia': 'O que é o Método Consciência? | Blog Espaço Consciência',
                'burnout-executivos': 'Burnout em Executivos: Causas e Tratamento | Blog Espaço Consciência'
            },
            en: {
                'home': 'Psychotherapy Porto and Barcelos - Consciousness Method | Espaço Consciência',
                'psychology-porto': 'Psychologist in Porto - Consciousness Method | Espaço Consciência',
                'psychology-barcelos': 'Psychologist in Barcelos - Consciousness Method | Espaço Consciência',
                'online-therapy': 'Online Psychologist Portugal - Multilingual Consultations | Espaço Consciência',
                'emdr-porto': 'EMDR Therapy Porto - Trauma Treatment | Espaço Consciência',
                'clinical-hypnosis': 'Clinical Hypnosis Porto - Hypnotherapy | Espaço Consciência',
                'couples-therapy': 'Couples Therapy Barcelos - Consciousness Method | Espaço Consciência',
                'corporate-mental-health': 'Corporate Mental Health Porto - Business Psychology | Espaço Consciência',
                'consciousness-method': 'What is the Consciousness Method? | Espaço Consciência Blog',
                'executive-burnout': 'Executive Burnout: Causes and Treatment | Espaço Consciência Blog'
            },
            es: {
                'home': 'Psicoterapia Oporto y Barcelos - Método Consciencia | Espaço Consciência',
                'psicologia-oporto': 'Psicólogo en Oporto - Método Consciencia | Espaço Consciência',
                'psicologia-barcelos': 'Psicólogo en Barcelos - Método Consciencia | Espaço Consciência',
                'terapia-online': 'Psicólogo Online Portugal - Consultas Multilingües | Espaço Consciência',
                'emdr-oporto': 'Terapia EMDR Oporto - Tratamiento de Trauma | Espaço Consciência',
                'hipnosis-clinica': 'Hipnosis Clínica Oporto - Hipnoterapia | Espaço Consciência',
                'terapia-pareja': 'Terapia de Pareja Barcelos - Método Consciencia | Espaço Consciência',
                'salud-mental-empresas': 'Salud Mental Empresas Oporto - Psicología Corporativa | Espaço Consciência'
            }
        };
        
        return titles[currentLang]?.[route] || titles.pt[route] || 'Espaço Consciência';
    }
    
    getBreadcrumbs(route) {
        const breadcrumbs = ['home'];
        
        if (route.includes('psicologia')) {
            breadcrumbs.push('services', route);
        } else if (route.includes('terapia') || route.includes('emdr') || route.includes('hipnose')) {
            breadcrumbs.push('specialties', route);
        } else if (route.includes('artigos') || this.isArticleRoute(route)) {
            breadcrumbs.push('blog', route);
        } else {
            breadcrumbs.push(route);
        }
        
        return breadcrumbs;
    }
    
    isArticleRoute(route) {
        const articleRoutes = [
            'metodo-consciencia', 'consciousness-method',
            'burnout-executivos', 'executive-burnout',
            'ansiedade-pos-covid', 'post-covid-anxiety',
            'sindrome-impostor', 'impostor-syndrome'
        ];
        return articleRoutes.includes(route);
    }
    
    updateBreadcrumbs(breadcrumbs) {
        const breadcrumbContainer = document.querySelector('.breadcrumbs');
        if (!breadcrumbContainer) return;
        
        const currentLang = window.languageManager?.currentLanguage || 'pt';
        const breadcrumbLabels = {
            pt: {
                'home': 'Início',
                'services': 'Serviços',
                'specialties': 'Especialidades',
                'blog': 'Blog'
            },
            en: {
                'home': 'Home',
                'services': 'Services',
                'specialties': 'Specialties',
                'blog': 'Blog'
            },
            es: {
                'home': 'Inicio',
                'services': 'Servicios',
                'specialties': 'Especialidades',
                'blog': 'Blog'
            }
        };
        
        const labels = breadcrumbLabels[currentLang] || breadcrumbLabels.pt;
        
        breadcrumbContainer.innerHTML = breadcrumbs.map((crumb, index) => {
            const label = labels[crumb] || crumb;
            const isLast = index === breadcrumbs.length - 1;
            
            if (isLast) {
                return `<span class="breadcrumb-current">${label}</span>`;
            } else {
                const url = crumb === 'home' ? this.basePath : `${this.basePath}${crumb}`;
                return `<a href="${url}" class="breadcrumb-link">${label}</a>`;
            }
        }).join(' <span class="breadcrumb-separator">›</span> ');
    }
    
    updateCanonicalUrl(route) {
        let canonical = document.querySelector('link[rel="canonical"]');
        if (!canonical) {
            canonical = document.createElement('link');
            canonical.rel = 'canonical';
            document.head.appendChild(canonical);
        }
        
        const baseUrl = window.location.origin;
        canonical.href = `${baseUrl}${this.basePath}${route}`;
    }
    
    setupNavigation() {
        // Intercepta cliques em links internos
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href]');
            if (!link) return;
            
            const href = link.getAttribute('href');
            
            // Verifica se é um link interno
            if (this.isInternalLink(href)) {
                e.preventDefault();
                this.navigate(href);
            }
        });
    }
    
    isInternalLink(href) {
        // Verifica se o link é interno (não começa com http, mailto, tel, etc.)
        return href && 
               !href.startsWith('http') && 
               !href.startsWith('mailto:') && 
               !href.startsWith('tel:') && 
               !href.startsWith('#') &&
               !href.startsWith('javascript:');
    }
    
    navigate(path) {
        // Remove o basePath se estiver presente
        const route = path.replace(this.basePath, '');
        this.handleRoute(path);
    }
    
    handle404() {
        document.title = 'Página Não Encontrada | Espaço Consciência';
        // Implementar página 404 personalizada
        console.log('Página não encontrada');
    }
    
    // Método público para navegação programática
    goTo(route) {
        const fullPath = this.basePath + route;
        this.navigate(fullPath);
    }
    
    // Método para obter a URL atual limpa
    getCurrentRoute() {
        return window.location.pathname.replace(this.basePath, '');
    }
    
    // Método para gerar URLs baseadas no idioma atual
    getLocalizedUrl(route) {
        if (window.languageManager) {
            return window.languageManager.getLocalizedUrl(route);
        }
        return this.basePath + route;
    }
}

// Inicializa o roteador quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    window.router = new Router();
});

// Exporta para uso global
window.Router = Router;


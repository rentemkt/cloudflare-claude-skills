
// === PATCH: Ajuste de caminhos para ambiente em subpasta ===
(function(){
    function computeBasePath() {
        try {
            var path = window.location.pathname;
            var idx = path.indexOf('/site-profissional/');
            if (idx !== -1) return path.substring(0, idx + '/site-profissional/'.length - 1);
            return '';
        } catch(e){ return ''; }
    }
    window.__EC_BASE = computeBasePath();
    window.__ecJoin = function(rel){
        if (!rel) return rel;
        if (rel.startsWith('/')) return window.__EC_BASE + rel;
        return rel;
    };
})();
// ================================
// SISTEMA DE BUSCA INTELIGENTE
// Espaço Consciência - Advanced Search
// ================================

class SistemaBuscaInteligente {
    constructor() {
        this.indiceCompleto = this.construirIndiceCompleto();
        this.configuracoes = {
            minCaracteres: 2,
            maxResultados: 8,
            debounceDelay: 300,
            priorizarLocalizacao: true,
            destacarTermos: true
        };
        
        this.estatisticas = {
            buscasRealizadas: 0,
            termosPopulares: new Map(),
            clicksResultados: new Map()
        };
        
        this.init();
    }

    // ================================
    // CONSTRUÇÃO DO ÍNDICE
    // ================================
    construirIndiceCompleto() {
        return {
            // PÁGINAS DE SERVIÇO - LOCALIZAÇÃO
            servicos: [
                {
                    id: 'psicologo-porto',
                    titulo: 'Psicólogo no Porto',
                    url: '/pages/psicologo-porto.html',
                    descricao: 'Consultas de psicologia no centro do Porto com especialização em EMDR e Hipnose Clínica',
                    categoria: 'serviço',
                    localizacao: 'porto',
                    especialidades: ['emdr', 'hipnose', 'ansiedade', 'trauma'],
                    tags: ['psicólogo porto', 'consulta psicologia porto', 'terapia porto'],
                    popularidade: 9,
                    prioridade: 'alta'
                },
                {
                    id: 'psicologo-barcelos',
                    titulo: 'Psicólogo em Barcelos',
                    url: '/pages/psicologo-barcelos.html',
                    descricao: 'A única clínica em Barcelos com Método Consciência exclusivo',
                    categoria: 'serviço',
                    localizacao: 'barcelos',
                    especialidades: ['metodo-consciencia', 'emdr', 'hipnose', 'casal'],
                    tags: ['psicólogo barcelos', 'consulta psicologia barcelos', 'terapia barcelos'],
                    popularidade: 8,
                    prioridade: 'alta'
                },
                {
                    id: 'psicologo-online',
                    titulo: 'Psicólogo Online Portugal',
                    url: '/pages/psicologo-online-portugal.html',
                    descricao: 'Terapia online para todo o país com a mesma qualidade das consultas presenciais',
                    categoria: 'serviço',
                    localizacao: 'online',
                    especialidades: ['online', 'emdr', 'hipnose', 'ansiedade'],
                    tags: ['psicólogo online', 'terapia online', 'consulta online'],
                    popularidade: 10,
                    prioridade: 'alta',
                    novidade: true
                }
            ],

            // ESPECIALIDADES TÉCNICAS
            especialidades: [
                {
                    id: 'emdr-porto',
                    titulo: 'Terapia EMDR no Porto',
                    url: '/pages/emdr-porto.html',
                    descricao: 'Especialistas em EMDR para tratamento de trauma e stress pós-traumático',
                    categoria: 'especialidade',
                    localizacao: 'porto',
                    problema: ['trauma', 'ptsd', 'ansiedade', 'fobias'],
                    tags: ['emdr porto', 'trauma porto', 'ptsd porto', 'terapia trauma'],
                    popularidade: 7,
                    prioridade: 'alta'
                },
                {
                    id: 'hipnose-clinica',
                    titulo: 'Hipnose Clínica Porto',
                    url: '/pages/hipnose-clinica-porto.html',
                    descricao: 'Hipnoterapia para ansiedade, fobias, vícios e desenvolvimento pessoal',
                    categoria: 'especialidade',
                    localizacao: 'porto',
                    problema: ['ansiedade', 'fobias', 'vícios', 'autoestima'],
                    tags: ['hipnose clínica porto', 'hipnoterapia', 'deixar fumar'],
                    popularidade: 6,
                    prioridade: 'média'
                },
                {
                    id: 'terapia-casal',
                    titulo: 'Terapia de Casal Barcelos',
                    url: '/pages/terapia-casal-barcelos.html',
                    descricao: 'Reconstrução de relacionamentos com foco na origem dos conflitos',
                    categoria: 'especialidade',
                    localizacao: 'barcelos',
                    problema: ['relacionamento', 'comunicação', 'conflitos', 'casal'],
                    tags: ['terapia casal barcelos', 'problemas relacionamento', 'terapia familiar'],
                    popularidade: 5,
                    prioridade: 'média'
                }
            ],

            // ARTIGOS DO BLOG
            artigos: [
                {
                    id: 'metodo-consciencia',
                    titulo: 'O que é o Método Consciência?',
                    url: '/blog/metodo-consciencia.html',
                    descricao: 'Abordagem exclusiva que trata a origem dos problemas, não apenas os sintomas',
                    categoria: 'artigo',
                    tipo: 'educativo',
                    problema: ['origem', 'método', 'abordagem', 'diferencial'],
                    tags: ['método consciência', 'tratar origem', 'psicoterapia integrativa'],
                    popularidade: 9,
                    prioridade: 'alta',
                    destaque: true
                },
                {
                    id: 'ansiedade-pos-covid',
                    titulo: 'Ansiedade Pós-COVID: Guia Prático',
                    url: '/blog/ansiedade-pos-covid.html',
                    descricao: 'Como lidar com os novos medos e ansiedades após a pandemia',
                    categoria: 'artigo',
                    tipo: 'guia',
                    problema: ['ansiedade', 'covid', 'pandemia', 'medo social'],
                    tags: ['ansiedade pós-covid', 'fobia social', 'medo multidões'],
                    popularidade: 8,
                    prioridade: 'alta',
                    atual: true
                },
                {
                    id: 'burnout-executivos',
                    titulo: 'Burnout em Executivos: 5 Sinais',
                    url: '/blog/burnout-executivos.html',
                    descricao: 'Identifique os sinais de esgotamento profissional e como recuperar',
                    categoria: 'artigo',
                    tipo: 'diagnóstico',
                    problema: ['burnout', 'stress', 'trabalho', 'executivos'],
                    tags: ['burnout executivos', 'stress profissional', 'esgotamento'],
                    popularidade: 7,
                    prioridade: 'alta'
                }
            ],

            // PROBLEMAS COMUNS (para redirecionamento inteligente)
            problemas: [
                {
                    problema: 'ansiedade',
                    redirecionamentos: [
                        { tipo: 'serviço', id: 'psicologo-porto', relevancia: 9 },
                        { tipo: 'especialidade', id: 'hipnose-clinica', relevancia: 8 },
                        { tipo: 'artigo', id: 'ansiedade-pos-covid', relevancia: 9 }
                    ]
                },
                {
                    problema: 'trauma',
                    redirecionamentos: [
                        { tipo: 'especialidade', id: 'emdr-porto', relevancia: 10 },
                        { tipo: 'serviço', id: 'psicologo-porto', relevancia: 8 },
                        { tipo: 'artigo', id: 'metodo-consciencia', relevancia: 7 }
                    ]
                },
                {
                    problema: 'relacionamento',
                    redirecionamentos: [
                        { tipo: 'especialidade', id: 'terapia-casal', relevancia: 10 },
                        { tipo: 'serviço', id: 'psicologo-barcelos', relevancia: 7 }
                    ]
                }
            ]
        };
    }

    // ================================
    // INICIALIZAÇÃO
    // ================================
    init() {
        this.criarInterfaceBusca();
        this.configurarEventos();
        this.carregarEstatisticasArmazenadas();
        console.log('🔍 Sistema de Busca Inteligente iniciado');
    }

    criarInterfaceBusca() {
        // Busca no header (desktop)
        const headerSearch = `
            <div class="busca-header" id="buscaHeader">
                <div class="busca-container">
                    <input type="search" 
                           id="buscaInput" 
                           class="busca-input"
                           placeholder="🔍 O que procura? (ex: ansiedade, EMDR, Porto...)"
                           autocomplete="off"
                           spellcheck="false">
                    <button class="busca-btn" type="button" aria-label="Pesquisar">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                        </svg>
                    </button>
                </div>
                <div class="busca-resultados" id="buscaResultados"></div>
                <div class="busca-sugestoes" id="buscaSugestoes"></div>
            </div>
        `;

        // Inserir busca no header
        const nav = document.querySelector('.nav-container');
        if (nav) {
            nav.insertAdjacentHTML('beforeend', headerSearch);
        }

        // Busca mobile (já implementada no menu mobile)
        this.configurarBuscaMobile();
    }

    configurarBuscaMobile() {
        const mobileSearch = document.querySelector('.mobile-search-input');
        if (mobileSearch) {
            mobileSearch.addEventListener('input', (e) => {
                this.processarBusca(e.target.value, 'mobile');
            });
        }
    }

    configurarEventos() {
        const input = document.getElementById('buscaInput');
        const btn = document.querySelector('.busca-btn');

        if (input) {
            // Busca em tempo real com debounce
            let timeout;
            input.addEventListener('input', (e) => {
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    this.processarBusca(e.target.value, 'desktop');
                }, this.configuracoes.debounceDelay);
            });

            // Navegação por teclado
            input.addEventListener('keydown', (e) => {
                this.handleKeyboardNavigation(e);
            });

            // Focus/blur
            input.addEventListener('focus', () => {
                this.mostrarSugestoes();
            });

            input.addEventListener('blur', () => {
                // Delay para permitir cliques nos resultados
                setTimeout(() => this.ocultarResultados(), 150);
            });
        }

        if (btn) {
            btn.addEventListener('click', () => {
                const termo = input.value.trim();
                if (termo) {
                    this.executarBuscaCompleta(termo);
                }
            });
        }

        // Fechar resultados ao clicar fora
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.busca-header')) {
                this.ocultarResultados();
            }
        });
    }

    // ================================
    // PROCESSAMENTO DE BUSCA
    // ================================
    processarBusca(termo, origem = 'desktop') {
        termo = termo.trim().toLowerCase();
        
        if (termo.length < this.configuracoes.minCaracteres) {
            this.ocultarResultados();
            return;
        }

        // Registrar busca para estatísticas
        this.registrarBusca(termo);

        // Realizar busca inteligente
        const resultados = this.executarBuscaInteligente(termo);
        
        // Exibir resultados
        this.exibirResultados(resultados, origem);
    }

    executarBuscaInteligente(termo) {
        const resultados = {
            exatos: [],
            parciais: [],
            sugestoes: [],
            redirecionamentos: []
        };

        // Normalizar termo de busca
        const termoNormalizado = this.normalizarTermo(termo);
        const palavras = termoNormalizado.split(' ').filter(p => p.length > 1);

        // Buscar em todas as categorias
        const todasEntradas = [
            ...this.indiceCompleto.servicos,
            ...this.indiceCompleto.especialidades,
            ...this.indiceCompleto.artigos
        ];

        todasEntradas.forEach(entrada => {
            const pontuacao = this.calcularRelevancia(entrada, termoNormalizado, palavras);
            
            if (pontuacao.exato > 0) {
                resultados.exatos.push({ ...entrada, pontuacao: pontuacao.exato });
            } else if (pontuacao.parcial > 0) {
                resultados.parciais.push({ ...entrada, pontuacao: pontuacao.parcial });
            }
        });

        // Buscar redirecionamentos inteligentes
        this.indiceCompleto.problemas.forEach(problema => {
            if (termoNormalizado.includes(problema.problema)) {
                problema.redirecionamentos.forEach(redirect => {
                    const entrada = this.encontrarPorId(redirect.id, redirect.tipo);
                    if (entrada) {
                        resultados.redirecionamentos.push({
                            ...entrada,
                            pontuacao: redirect.relevancia,
                            motivoRedirecionamento: `Relacionado a: ${problema.problema}`
                        });
                    }
                });
            }
        });

        // Ordenar por relevância e popularidade
        resultados.exatos.sort((a, b) => {
            if (b.pontuacao !== a.pontuacao) return b.pontuacao - a.pontuacao;
            return (b.popularidade || 0) - (a.popularidade || 0);
        });

        resultados.parciais.sort((a, b) => {
            if (b.pontuacao !== a.pontuacao) return b.pontuacao - a.pontuacao;
            return (b.popularidade || 0) - (a.popularidade || 0);
        });

        // Gerar sugestões inteligentes
        resultados.sugestoes = this.gerarSugestoes(termo, resultados);

        return resultados;
    }

    calcularRelevancia(entrada, termo, palavras) {
        let pontuacaoExata = 0;
        let pontuacaoParcial = 0;

        // Campos para buscar (com pesos diferentes)
        const campos = [
            { campo: 'titulo', peso: 10 },
            { campo: 'tags', peso: 8 },
            { campo: 'especialidades', peso: 7 },
            { campo: 'problema', peso: 6 },
            { campo: 'descricao', peso: 4 },
            { campo: 'localizacao', peso: 5 }
        ];

        campos.forEach(({ campo, peso }) => {
            const valor = entrada[campo];
            if (!valor) return;

            const textoNormalizado = Array.isArray(valor) 
                ? valor.join(' ').toLowerCase()
                : valor.toString().toLowerCase();

            // Busca exata
            if (textoNormalizado.includes(termo)) {
                pontuacaoExata += peso;
                
                // Bonus para match no início
                if (textoNormalizado.startsWith(termo)) {
                    pontuacaoExata += peso * 0.5;
                }
            }

            // Busca parcial por palavras
            palavras.forEach(palavra => {
                if (textoNormalizado.includes(palavra)) {
                    pontuacaoParcial += peso * 0.3;
                }
            });
        });

        // Bonus por prioridade e características especiais
        if (entrada.prioridade === 'alta') pontuacaoExata += 2;
        if (entrada.novidade) pontuacaoExata += 1;
        if (entrada.destaque) pontuacaoExata += 1;
        if (entrada.atual) pontuacaoExata += 1;

        return {
            exato: pontuacaoExata,
            parcial: pontuacaoParcial
        };
    }

    gerarSugestoes(termo, resultados) {
        const sugestoes = [];
        const termoLower = termo.toLowerCase();

        // Sugestões baseadas em correções ortográficas simples
        const correcoes = {
            'ansidede': 'ansiedade',
            'ansiedad': 'ansiedade',
            'traum': 'trauma',
            'stres': 'stress',
            'casamento': 'casal',
            'relacionamentos': 'relacionamento'
        };

        if (correcoes[termoLower]) {
            sugestoes.push({
                tipo: 'correcao',
                original: termo,
                sugerido: correcoes[termoLower],
                texto: `Você quis dizer: ${correcoes[termoLower]}?`
            });
        }

        // Sugestões baseadas em termos populares
        if (resultados.exatos.length === 0 && resultados.parciais.length === 0) {
            const termosPopulares = [
                'ansiedade', 'trauma', 'EMDR', 'hipnose', 'casal', 'burnout'
            ];

            termosPopulares.forEach(termoPopular => {
                if (this.calcularSimilaridade(termoLower, termoPopular) > 0.6) {
                    sugestoes.push({
                        tipo: 'similar',
                        termo: termoPopular,
                        texto: `Talvez você procure: ${termoPopular}`
                    });
                }
            });
        }

        // Sugestões de localização
        if (termoLower.includes('psicolog') && !termoLower.includes('porto') && !termoLower.includes('barcelos')) {
            sugestoes.push({
                tipo: 'localizacao',
                texto: 'Procura em que cidade?',
                opcoes: ['Porto', 'Barcelos', 'Online']
            });
        }

        return sugestoes.slice(0, 3); // Máximo 3 sugestões
    }

    // ================================
    // EXIBIÇÃO DE RESULTADOS
    // ================================
    exibirResultados(resultados, origem = 'desktop') {
        const container = origem === 'mobile' 
            ? document.querySelector('.mobile-search-results')
            : document.getElementById('buscaResultados');

        if (!container) return;

        const totalResultados = resultados.exatos.length + resultados.parciais.length + resultados.redirecionamentos.length;

        if (totalResultados === 0) {
            this.exibirSemResultados(container, resultados.sugestoes);
            return;
        }

        let html = '<div class="resultados-container">';
        
        // Resultados exatos
        if (resultados.exatos.length > 0) {
            html += '<div class="resultados-secao">';
            html += '<h4 class="resultados-titulo">📍 Resultados Principais</h4>';
            resultados.exatos.slice(0, 4).forEach(resultado => {
                html += this.gerarHtmlResultado(resultado, 'exato');
            });
            html += '</div>';
        }

        // Redirecionamentos inteligentes
        if (resultados.redirecionamentos.length > 0) {
            html += '<div class="resultados-secao">';
            html += '<h4 class="resultados-titulo">🎯 Recomendado para Você</h4>';
            resultados.redirecionamentos.slice(0, 2).forEach(resultado => {
                html += this.gerarHtmlResultado(resultado, 'redirecionamento');
            });
            html += '</div>';
        }

        // Resultados parciais
        if (resultados.parciais.length > 0 && resultados.exatos.length < 4) {
            html += '<div class="resultados-secao">';
            html += '<h4 class="resultados-titulo">📚 Outros Resultados</h4>';
            const limite = Math.min(3, this.configuracoes.maxResultados - resultados.exatos.length);
            resultados.parciais.slice(0, limite).forEach(resultado => {
                html += this.gerarHtmlResultado(resultado, 'parcial');
            });
            html += '</div>';
        }

        // Sugestões
        if (resultados.sugestoes.length > 0) {
            html += '<div class="resultados-secao sugestoes">';
            html += '<h4 class="resultados-titulo">💡 Sugestões</h4>';
            resultados.sugestoes.forEach(sugestao => {
                html += this.gerarHtmlSugestao(sugestao);
            });
            html += '</div>';
        }

        html += '</div>';

        container.innerHTML = html;
        container.classList.add('active');

        // Configurar eventos dos resultados
        this.configurarEventosResultados(container);
    }

    gerarHtmlResultado(resultado, tipo) {
        const icones = {
            'serviço': '🏥',
            'especialidade': '🧠',
            'artigo': '📖'
        };

        const badges = [];
        if (resultado.novidade) badges.push('<span class="badge nova">🆕 Novo</span>');
        if (resultado.destaque) badges.push('<span class="badge destaque">⭐ Destaque</span>');
        if (resultado.atual) badges.push('<span class="badge atual">🔥 Atual</span>');
        if (tipo === 'redirecionamento') badges.push('<span class="badge recomendado">🎯 Recomendado</span>');

        const localizacaoInfo = resultado.localizacao && resultado.localizacao !== 'online'
            ? `<span class="localizacao">📍 ${resultado.localizacao.charAt(0).toUpperCase() + resultado.localizacao.slice(1)}</span>`
            : resultado.localizacao === 'online'
            ? '<span class="localizacao online">💻 Online</span>'
            : '';

        return `
            <div class="resultado-item ${tipo}" data-url="${resultado.url}" data-id="${resultado.id}">
                <div class="resultado-icone">
                    ${icones[resultado.categoria] || '📄'}
                </div>
                <div class="resultado-conteudo">
                    <h5 class="resultado-titulo">${this.destacarTermos(resultado.titulo)}</h5>
                    <p class="resultado-descricao">${this.destacarTermos(resultado.descricao)}</p>
                    <div class="resultado-meta">
                        ${localizacaoInfo}
                        <div class="badges">${badges.join('')}</div>
                    </div>
                    ${resultado.motivoRedirecionamento ? `<div class="motivo-redirecionamento">${resultado.motivoRedirecionamento}</div>` : ''}
                </div>
                <div class="resultado-acao">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
                    </svg>
                </div>
            </div>
        `;
    }

    gerarHtmlSugestao(sugestao) {
        switch (sugestao.tipo) {
            case 'correcao':
                return `
                    <div class="sugestao-item correcao" data-termo="${sugestao.sugerido}">
                        <span class="sugestao-icone">🔤</span>
                        <span class="sugestao-texto">${sugestao.texto}</span>
                    </div>
                `;
            
            case 'similar':
                return `
                    <div class="sugestao-item similar" data-termo="${sugestao.termo}">
                        <span class="sugestao-icone">💭</span>
                        <span class="sugestao-texto">${sugestao.texto}</span>
                    </div>
                `;
            
            case 'localizacao':
                const opcoes = sugestao.opcoes.map(opcao => 
                    `<button class="localizacao-opcao" data-termo="psicólogo ${opcao.toLowerCase()}">${opcao}</button>`
                ).join('');
                return `
                    <div class="sugestao-item localizacao">
                        <span class="sugestao-icone">📍</span>
                        <span class="sugestao-texto">${sugestao.texto}</span>
                        <div class="localizacao-opcoes">${opcoes}</div>
                    </div>
                `;
            
            default:
                return '';
        }
    }

    exibirSemResultados(container, sugestoes) {
        let html = `
            <div class="sem-resultados">
                <div class="sem-resultados-icone">🔍</div>
                <h4>Nenhum resultado encontrado</h4>
                <p>Não encontramos nada para a sua busca, mas temos algumas sugestões:</p>
        `;

        if (sugestoes.length > 0) {
            html += '<div class="sugestoes-alternativas">';
            sugestoes.forEach(sugestao => {
                html += this.gerarHtmlSugestao(sugestao);
            });
            html += '</div>';
        }

        // Sugestões populares
        html += `
                <div class="busca-popular">
                    <h5>Buscas populares:</h5>
                    <div class="tags-populares">
                        <button class="tag-popular" data-termo="ansiedade">Ansiedade</button>
                        <button class="tag-popular" data-termo="EMDR">EMDR</button>
                        <button class="tag-popular" data-termo="hipnose">Hipnose</button>
                        <button class="tag-popular" data-termo="burnout">Burnout</button>
                        <button class="tag-popular" data-termo="casal">Terapia de Casal</button>
                    </div>
                </div>
            </div>
        `;

        container.innerHTML = html;
        container.classList.add('active');
        
        this.configurarEventosResultados(container);
    }

    configurarEventosResultados(container) {
        // Cliques nos resultados
        container.querySelectorAll('.resultado-item').forEach(item => {
            item.addEventListener('click', () => {
                const url = item.dataset.url;
                const id = item.dataset.id;
                this.registrarClickResultado(id);
                window.location.href = __ecJoin(url);
            });
        });

        // Cliques nas sugestões
        container.querySelectorAll('.sugestao-item[data-termo]').forEach(item => {
            item.addEventListener('click', () => {
                const termo = item.dataset.termo;
                this.executarNovaBusca(termo);
            });
        });

        // Opções de localização
        container.querySelectorAll('.localizacao-opcao').forEach(btn => {
            btn.addEventListener('click', () => {
                const termo = btn.dataset.termo;
                this.executarNovaBusca(termo);
            });
        });

        // Tags populares
        container.querySelectorAll('.tag-popular').forEach(tag => {
            tag.addEventListener('click', () => {
                const termo = tag.dataset.termo;
                this.executarNovaBusca(termo);
            });
        });
    }

    // ================================
    // FUNCIONALIDADES AUXILIARES
    // ================================
    destacarTermos(texto) {
        if (!this.configuracoes.destacarTermos || !this.ultimoTermo) {
            return texto;
        }

        const termo = this.ultimoTermo.toLowerCase();
        const regex = new RegExp(`(${termo})`, 'gi');
        return texto.replace(regex, '<mark>$1</mark>');
    }

    normalizarTermo(termo) {
        return termo
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '') // Remove acentos
            .replace(/[^\w\s]/g, '') // Remove pontuação
            .replace(/\s+/g, ' ')
            .trim();
    }

    calcularSimilaridade(str1, str2) {
        const track = Array(str2.length + 1).fill(null).map(() =>
            Array(str1.length + 1).fill(null));
        
        for (let i = 0; i <= str1.length; i++) track[0][i] = i;
        for (let j = 0; j <= str2.length; j++) track[j][0] = j;
        
        for (let j = 1; j <= str2.length; j++) {
            for (let i = 1; i <= str1.length; i++) {
                const match = str1[i - 1] === str2[j - 1] ? 0 : 1;
                track[j][i] = Math.min(
                    track[j][i - 1] + 1,
                    track[j - 1][i] + 1,
                    track[j - 1][i - 1] + match
                );
            }
        }
        
        const maxLen = Math.max(str1.length, str2.length);
        return maxLen === 0 ? 1 : (maxLen - track[str2.length][str1.length]) / maxLen;
    }

    encontrarPorId(id, tipo) {
        const secoes = {
            'servico': this.indiceCompleto.servicos,
            'especialidade': this.indiceCompleto.especialidades,
            'artigo': this.indiceCompleto.artigos
        };
        
        return secoes[tipo]?.find(item => item.id === id);
    }

    executarNovaBusca(termo) {
        const input = document.getElementById('buscaInput');
        if (input) {
            input.value = termo;
            this.processarBusca(termo);
        }

        const inputMobile = document.querySelector('.mobile-search-input');
        if (inputMobile) {
            inputMobile.value = termo;
            this.processarBusca(termo, 'mobile');
        }
    }

    // ================================
    // ESTATÍSTICAS E ANALYTICS
    // ================================
    registrarBusca(termo) {
        this.estatisticas.buscasRealizadas++;
        this.ultimoTermo = termo;
        
        const contadorAtual = this.estatisticas.termosPopulares.get(termo) || 0;
        this.estatisticas.termosPopulares.set(termo, contadorAtual + 1);
        
        // Salvar estatísticas (usando localStorage como exemplo)
        try {
            localStorage.setItem('espacoConsciencia_buscaStats', JSON.stringify({
                buscasRealizadas: this.estatisticas.buscasRealizadas,
                termosPopulares: Array.from(this.estatisticas.termosPopulares.entries())
            }));
        } catch (e) {
            console.warn('Não foi possível salvar estatísticas de busca');
        }

        // Analytics tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', 'search', {
                'search_term': termo,
                'content_type': 'site_search'
            });
        }
    }

    registrarClickResultado(id) {
        const contadorAtual = this.estatisticas.clicksResultados.get(id) || 0;
        this.estatisticas.clicksResultados.set(id, contadorAtual + 1);

        // Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'select_content', {
                'content_type': 'search_result',
                'item_id': id
            });
        }
    }

    carregarEstatisticasArmazenadas() {
        try {
            const dados = localStorage.getItem('espacoConsciencia_buscaStats');
            if (dados) {
                const stats = JSON.parse(dados);
                this.estatisticas.buscasRealizadas = stats.buscasRealizadas || 0;
                if (stats.termosPopulares) {
                    this.estatisticas.termosPopulares = new Map(stats.termosPopulares);
                }
            }
        } catch (e) {
            console.warn('Erro ao carregar estatísticas de busca');
        }
    }

    // ================================
    // UTILITÁRIOS DE INTERFACE
    // ================================
    mostrarSugestoes() {
        const sugestoes = document.getElementById('buscaSugestoes');
        if (sugestoes) {
            const termosPopulares = Array.from(this.estatisticas.termosPopulares.entries())
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5)
                .map(([termo]) => termo);

            if (termosPopulares.length > 0) {
                const html = `
                    <div class="sugestoes-rapidas">
                        <h5>Buscas recentes:</h5>
                        ${termosPopulares.map(termo => 
                            `<button class="sugestao-rapida" data-termo="${termo}">${termo}</button>`
                        ).join('')}
                    </div>
                `;
                sugestoes.innerHTML = html;
                sugestoes.classList.add('active');

                // Eventos para sugestões rápidas
                sugestoes.querySelectorAll('.sugestao-rapida').forEach(btn => {
                    btn.addEventListener('click', () => {
                        this.executarNovaBusca(btn.dataset.termo);
                    });
                });
            }
        }
    }

    ocultarResultados() {
        const resultados = document.getElementById('buscaResultados');
        const sugestoes = document.getElementById('buscaSugestoes');
        const resultadosMobile = document.querySelector('.mobile-search-results');

        if (resultados) resultados.classList.remove('active');
        if (sugestoes) sugestoes.classList.remove('active');
        if (resultadosMobile) resultadosMobile.classList.remove('active');
    }

    handleKeyboardNavigation(e) {
        const resultados = document.querySelectorAll('.resultado-item');
        const currentActive = document.querySelector('.resultado-item.keyboard-active');
        let index = -1;

        if (currentActive) {
            index = Array.from(resultados).indexOf(currentActive);
        }

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                if (currentActive) currentActive.classList.remove('keyboard-active');
                index = Math.min(index + 1, resultados.length - 1);
                if (resultados[index]) {
                    resultados[index].classList.add('keyboard-active');
                    resultados[index].scrollIntoView({ block: 'nearest' });
                }
                break;

            case 'ArrowUp':
                e.preventDefault();
                if (currentActive) currentActive.classList.remove('keyboard-active');
                index = Math.max(index - 1, 0);
                if (resultados[index]) {
                    resultados[index].classList.add('keyboard-active');
                    resultados[index].scrollIntoView({ block: 'nearest' });
                }
                break;

            case 'Enter':
                e.preventDefault();
                if (currentActive) {
                    currentActive.click();
                } else {
                    const input = e.target;
                    this.executarBuscaCompleta(input.value);
                }
                break;

            case 'Escape':
                this.ocultarResultados();
                e.target.blur();
                break;
        }
    }

    executarBuscaCompleta(termo) {
        // Redirecionar para página de resultados completos (se existir)
        // ou processar busca avançada
        window.location.href = `/busca?q=${encodeURIComponent(termo)}`;
    }
}

// ================================
// CSS PARA SISTEMA DE BUSCA
// ================================
const cssSearchSystem = `
<style>
/* BUSCA HEADER */
.busca-header {
    position: relative;
    margin-left: auto;
    margin-right: 1rem;
}

.busca-container {
    position: relative;
    display: flex;
    align-items: center;
    background: white;
    border: 2px solid #e9ecef;
    border-radius: 25px;
    padding: 0.25rem;
    transition: all 0.3s ease;
    min-width: 300px;
}

.busca-container:focus-within {
    border-color: #8e44ad;
    box-shadow: 0 0 0 3px rgba(142, 68, 173, 0.1);
}

.busca-input {
    flex: 1;
    border: none;
    outline: none;
    padding: 0.75rem 1rem;
    font-size: 0.9rem;
    background: transparent;
}

.busca-input::placeholder {
    color: #6c757d;
}

.busca-btn {
    background: linear-gradient(135deg, #8e44ad, #9b59b6);
    border: none;
    border-radius: 50%;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
}

.busca-btn:hover {
    transform: scale(1.1);
}

.busca-btn svg {
    width: 18px;
    height: 18px;
}

/* RESULTADOS */
.busca-resultados {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    border-radius: 15px;
    box-shadow: 0 10px 40px rgba(0,0,0,0.15);
    margin-top: 0.5rem;
    max-height: 500px;
    overflow-y: auto;
    z-index: 1002;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-10px);
    transition: all 0.3s ease;
}

.busca-resultados.active {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
}

.resultados-container {
    padding: 1rem;
}

.resultados-secao {
    margin-bottom: 1.5rem;
}

.resultados-secao:last-child {
    margin-bottom: 0;
}

.resultados-titulo {
    color: #2c3e50;
    font-size: 0.9rem;
    margin-bottom: 0.75rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #e9ecef;
    font-weight: 600;
}

/* ITEM DE RESULTADO */
.resultado-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.2s ease;
    margin-bottom: 0.5rem;
    border: 1px solid transparent;
}

.resultado-item:hover,
.resultado-item.keyboard-active {
    background: #f8f9fa;
    border-color: #8e44ad;
    transform: translateX(5px);
}

.resultado-icone {
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, #8e44ad, #9b59b6);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    color: white;
    flex-shrink: 0;
}

.resultado-conteudo {
    flex: 1;
    min-width: 0;
}

.resultado-titulo {
    font-size: 1rem;
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 0.25rem;
    line-height: 1.3;
}

.resultado-descricao {
    font-size: 0.85rem;
    color: #6c757d;
    line-height: 1.4;
    margin-bottom: 0.5rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.resultado-meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.localizacao {
    font-size: 0.75rem;
    color: #8e44ad;
    font-weight: 500;
}

.localizacao.online {
    color: #059669;
}

.badges {
    display: flex;
    gap: 0.25rem;
    flex-wrap: wrap;
}

.badge {
    font-size: 0.7rem;
    padding: 0.2rem 0.5rem;
    border-radius: 12px;
    font-weight: 500;
    white-space: nowrap;
}

.badge.nova { background: #d1ecf1; color: #0c5460; }
.badge.destaque { background: #fff3cd; color: #856404; }
.badge.atual { background: #f8d7da; color: #721c24; }
.badge.recomendado { background: #d4edda; color: #155724; }

.motivo-redirecionamento {
    font-size: 0.75rem;
    color: #059669;
    font-style: italic;
    margin-top: 0.25rem;
}

.resultado-acao {
    color: #8e44ad;
    opacity: 0.5;
    transition: opacity 0.2s ease;
}

.resultado-item:hover .resultado-acao {
    opacity: 1;
}

.resultado-acao svg {
    width: 16px;
    height: 16px;
}

/* DESTACAR TERMOS */
mark {
    background: rgba(142, 68, 173, 0.2);
    color: #8e44ad;
    padding: 0 0.2rem;
    border-radius: 3px;
    font-weight: 600;
}

/* SUGESTÕES */
.sugestoes {
    border-top: 1px solid #e9ecef;
    padding-top: 1rem;
}

.sugestao-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.2s ease;
    margin-bottom: 0.5rem;
}

.sugestao-item:hover {
    background: #f8f9fa;
}

.sugestao-icone {
    font-size: 1rem;
    opacity: 0.7;
}

.sugestao-texto {
    font-size: 0.9rem;
    color: #495057;
}

.localizacao-opcoes {
    display: flex;
    gap: 0.5rem;
    margin-top: 0.5rem;
}

.localizacao-opcao {
    background: #8e44ad;
    color: white;
    border: none;
    padding: 0.25rem 0.75rem;
    border-radius: 15px;
    font-size: 0.8rem;
    cursor: pointer;
    transition: all 0.2s ease;
}

.localizacao-opcao:hover {
    background: #7c3aed;
    transform: translateY(-1px);
}

/* SEM RESULTADOS */
.sem-resultados {
    text-align: center;
    padding: 2rem 1rem;
}

.sem-resultados-icone {
    font-size: 3rem;
    margin-bottom: 1rem;
    opacity: 0.5;
}

.sem-resultados h4 {
    color: #2c3e50;
    margin-bottom: 0.5rem;
}

.sem-resultados p {
    color: #6c757d;
    margin-bottom: 1.5rem;
}

.busca-popular {
    margin-top: 2rem;
}

.busca-popular h5 {
    color: #2c3e50;
    margin-bottom: 1rem;
    font-size: 0.9rem;
}

.tags-populares {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    justify-content: center;
}

.tag-popular {
    background: #f8f9fa;
    border: 1px solid #dee2e6;
    color: #495057;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.85rem;
    cursor: pointer;
    transition: all 0.2s ease;
}

.tag-popular:hover {
    background: #8e44ad;
    color: white;
    border-color: #8e44ad;
}

/* SUGESTÕES RÁPIDAS */
.busca-sugestoes {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    border-radius: 15px;
    box-shadow: 0 5px 20px rgba(0,0,0,0.1);
    margin-top: 0.5rem;
    z-index: 1001;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-10px);
    transition: all 0.3s ease;
}

.busca-sugestoes.active {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
}

.sugestoes-rapidas {
    padding: 1rem;
}

.sugestoes-rapidas h5 {
    color: #2c3e50;
    font-size: 0.85rem;
    margin-bottom: 0.75rem;
    font-weight: 600;
}

.sugestao-rapida {
    display: inline-block;
    background: #f8f9fa;
    border: 1px solid #dee2e6;
    color: #495057;
    padding: 0.4rem 0.8rem;
    border-radius: 15px;
    font-size: 0.8rem;
    cursor: pointer;
    margin: 0.2rem;
    transition: all 0.2s ease;
}

.sugestao-rapida:hover {
    background: #8e44ad;
    color: white;
    border-color: #8e44ad;
}

/* MOBILE RESPONSIVE */
@media (max-width: 1024px) {
    .busca-header {
        margin-right: 0;
    }
    
    .busca-container {
        min-width: 250px;
    }
}

@media (max-width: 768px) {
    .busca-header {
        display: none; /* Usar busca do menu mobile */
    }
    
    .mobile-search-results {
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        border-radius: 12px;
        margin-top: 0.5rem;
        max-height: 400px;
        overflow-y: auto;
        padding: 1rem;
    }
    
    .mobile-search-results .resultado-item {
        padding: 0.75rem;
        margin-bottom: 0.5rem;
    }
    
    .mobile-search-results .resultado-icone {
        width: 35px;
        height: 35px;
        font-size: 1rem;
    }
    
    .mobile-search-results .resultado-titulo {
        font-size: 0.9rem;
    }
    
    .mobile-search-results .resultado-descricao {
        font-size: 0.8rem;
        -webkit-line-clamp: 1;
    }
}

/* DARK MODE PREPARAÇÃO */
@media (prefers-color-scheme: dark) {
    .busca-resultados,
    .busca-sugestoes,
    .mobile-search-results {
        background: #2c3e50;
        color: #ecf0f1;
    }
    
    .resultado-item:hover {
        background: #34495e;
    }
    
    .resultado-titulo {
        color: #ecf0f1;
    }
    
    .resultado-descricao {
        color: #bdc3c7;
    }
    
    mark {
        background: rgba(155, 89, 182, 0.3);
        color: #9b59b6;
    }
}

/* PERFORMANCE OTIMIZATIONS */
.busca-resultados,
.busca-sugestoes {
    will-change: transform, opacity;
    contain: layout style paint;
}

.resultado-item {
    contain: layout style;
}
</style>
`;

// ================================
// INICIALIZAÇÃO E INTEGRAÇÃO
// ================================

// Inicializar sistema quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    // Inserir CSS
    document.head.insertAdjacentHTML('beforeend', cssSearchSystem);
    
    // Inicializar sistema de busca
    window.sistemaBusca = new SistemaBuscaInteligente();
    
    console.log('🔍 Sistema de Busca Inteligente carregado!');
});

// Integração com menu mobile
class MobileMenuIntegrado {
    constructor() {
        this.init();
    }

    init() {
        this.criarMenuMobile();
        this.configurarEventos();
    }

    criarMenuMobile() {
        const mobileMenuHTML = `
            <!-- Botão Mobile Toggle -->
            <button class="mobile-menu-toggle" aria-label="Abrir menu de navegação">
                <div class="hamburger">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </button>
            
            <!-- Menu Mobile Full Screen -->
            <div class="mobile-menu" id="mobileMenu">
                <div class="mobile-menu-content">
                    <!-- Busca Mobile -->
                    <div class="mobile-search">
                        <input type="search" 
                               class="mobile-search-input"
                               placeholder="🔍 Buscar... (ansiedade, EMDR, Porto)"
                               autocomplete="off">
                        <div class="mobile-search-results"></div>
                    </div>
                    
                    <!-- Navegação Principal -->
                    <ul class="mobile-nav-primary">
                        <li class="mobile-nav-item">
                            <a href="/" class="mobile-nav-link">
                                <span class="mobile-nav-icon">🏠</span>
                                Início
                            </a>
                        </li>
                        
                        <li class="mobile-nav-item mobile-nav-expandable">
                            <a href="#" class="mobile-nav-link">
                                <span class="mobile-nav-icon">🏥</span>
                                Serviços
                            </a>
                            <div class="mobile-nav-submenu">
                                <a href="/pages/psicologo-porto.html" class="mobile-nav-sublink">Psicólogo Porto</a>
                                <a href="/pages/psicologo-barcelos.html" class="mobile-nav-sublink">Psicólogo Barcelos</a>
                                <a href="/pages/psicologo-online-portugal.html" class="mobile-nav-sublink">Consultas Online</a>
                            </div>
                        </li>
                        
                        <li class="mobile-nav-item mobile-nav-expandable">
                            <a href="#" class="mobile-nav-link">
                                <span class="mobile-nav-icon">🧠</span>
                                Especialidades
                            </a>
                            <div class="mobile-nav-submenu">
                                <a href="/pages/emdr-porto.html" class="mobile-nav-sublink">EMDR</a>
                                <a href="/pages/hipnose-clinica-porto.html" class="mobile-nav-sublink">Hipnose Clínica</a>
                                <a href="/pages/terapia-casal-barcelos.html" class="mobile-nav-sublink">Terapia de Casal</a>
                            </div>
                        </li>
                        
                        <li class="mobile-nav-item">
                            <a href="/blog/" class="mobile-nav-link">
                                <span class="mobile-nav-icon">📚</span>
                                Blog & Artigos
                            </a>
                        </li>
                        
                        <li class="mobile-nav-item">
                            <a href="/sobre" class="mobile-nav-link">
                                <span class="mobile-nav-icon">👥</span>
                                Sobre Nós
                            </a>
                        </li>
                        
                        <li class="mobile-nav-item">
                            <a href="/contactos" class="mobile-nav-link">
                                <span class="mobile-nav-icon">📞</span>
                                Contacto
                            </a>
                        </li>
                    </ul>
                    
                    <!-- Ações Rápidas -->
                    <div class="mobile-actions">
                        <a href="tel:+351935522267" class="mobile-action-button">
                            📞 Ligar Agora
                        </a>
                        <a href="/contactos" class="mobile-action-button secondary">
                            📅 Marcar Consulta
                        </a>
                        <a href="/pages/psicologo-online-portugal.html" class="mobile-action-button secondary">
                            💻 Consulta Online
                        </a>
                    </div>
                </div>
            </div>
        `;

        // Inserir no header
        const navContainer = document.querySelector('.nav-container');
        if (navContainer) {
            navContainer.insertAdjacentHTML('beforeend', mobileMenuHTML);
        }
    }

    configurarEventos() {
        const toggle = document.querySelector('.mobile-menu-toggle');
        const menu = document.getElementById('mobileMenu');
        const expandables = document.querySelectorAll('.mobile-nav-expandable');

        // Toggle do menu principal
        if (toggle && menu) {
            toggle.addEventListener('click', () => {
                toggle.classList.toggle('active');
                menu.classList.toggle('active');
                
                // Prevenir scroll do body quando menu aberto
                if (menu.classList.contains('active')) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
            });
        }

        // Submenus expansíveis
        expandables.forEach(item => {
            const link = item.querySelector('.mobile-nav-link');
            link.addEventListener('click', (e) => {
                e.preventDefault();
                item.classList.toggle('expanded');
            });
        });

        // Fechar menu ao clicar em link
        document.querySelectorAll('.mobile-nav-sublink, .mobile-action-button').forEach(link => {
            link.addEventListener('click', () => {
                if (menu) menu.classList.remove('active');
                if (toggle) toggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Fechar menu com ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && menu && menu.classList.contains('active')) {
                menu.classList.remove('active');
                toggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// Inicializar menu mobile
document.addEventListener('DOMContentLoaded', function() {
    window.mobileMenu = new MobileMenuIntegrado();
});

// Exportar para uso global
window.SistemaBuscaInteligente = SistemaBuscaInteligente;
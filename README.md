# Cloudflare Skills para Claude Code

Skills oficiais da Cloudflare para uso com Claude Code (CLI e Web).

## Skills Incluídas

| Skill | Comando | Descrição |
|-------|---------|-----------|
| cloudflare | `/cloudflare` | Skill completa da plataforma Cloudflare |
| agents-sdk | `/agents-sdk` | SDK para construir agentes AI |
| building-ai-agent-on-cloudflare | `/building-ai-agent-on-cloudflare` | Guia para criar agentes AI |
| building-mcp-server-on-cloudflare | `/building-mcp-server-on-cloudflare` | Guia para criar servidores MCP |
| durable-objects | `/durable-objects` | Durable Objects |
| sandbox-sdk | `/sandbox-sdk` | SDK para sandbox |
| web-perf | `/web-perf` | Performance web |
| wrangler | `/wrangler` | CLI Wrangler |

## Como Usar

### No Claude Code Web (claude.ai/code)

1. Faça fork deste repositório ou clone para seu projeto
2. Acesse https://claude.ai/code
3. Conecte o repositório
4. As skills estarão disponíveis automaticamente

### No Claude Code CLI

Clone este repositório e copie as skills:

```bash
git clone https://github.com/SEU_USUARIO/cloudflare-claude-skills.git
cp -r cloudflare-claude-skills/.claude/skills/* ~/.claude/skills/
```

### Em um projeto existente

Copie a pasta `.claude/skills/` para a raiz do seu projeto:

```bash
cp -r .claude/skills /caminho/do/seu/projeto/.claude/
```

## Sites Hospedados

Estrutura de pastas para deploy no Cloudflare Pages:

```
sites/
├── ihering.com/          # Projeto: ihering-com (pagina principal + _redirects)
│   ├── index.html        # Pagina principal (em construcao)
│   └── _redirects        # Redirects /isis/* -> isis.ihering.com, etc.
└── gain.com.br/          # Projeto: gain-com-br (site unico com subpastas)
    ├── index.html        # Pagina principal (em desenvolvimento)
    ├── ec/, eco/, econ/   # Espaco Consciencia (versoes)
    ├── ecpro/, ic/        # EC Pro, IC
    ├── ianews/            # IA News
    ├── ip/, ipro/         # IP, IPro
    ├── isis/, ihering/    # Isis, Ihering
    ├── pro/, pro2/, pro2a/ # Pro (versoes)
    ├── proclean/, proec/  # Pro Clean, Pro EC
    ├── savigny/           # Savigny
    └── win/               # Win
```

### Arquitetura

**ihering.com** usa uma arquitetura com projeto principal + subdominos:
- `ihering-com` (Pages) = pagina "em construcao" + `_redirects` que redireciona paths para subdominos
- Cada site individual tem seu proprio projeto Pages com custom domain no subdominio
- Acesso via `ihering.com/isis` faz redirect 301 para `isis.ihering.com`
- Evita conteudo duplicado e deploys desnecessarios

**gain.com.br** usa deploy unico com todas as subpastas no mesmo projeto.

### Deploy

**Deploy manual via Wrangler:**
```bash
wrangler pages deploy sites/ihering.com --project-name ihering-com --branch main
wrangler pages deploy sites/gain.com.br --project-name gain-com-br --branch main
```

### Projetos Cloudflare Pages

| Projeto | Pages URL | Custom Domain | Conteudo |
|---------|-----------|---------------|----------|
| ihering-com | ihering-com.pages.dev | ihering.com, www.ihering.com | Pagina em construcao + redirects |
| isis | isis-8y1.pages.dev | isis.ihering.com | Atelier Isis |
| renascer | renascer-6ok.pages.dev | renascer.ihering.com | Renascer depois do Amor |
| dieta | dieta-a1s.pages.dev | dieta.ihering.com | FitTracker Pro |
| catolestudios | catolestudios.pages.dev | catolestudios.ihering.com | Catole Studios |
| rotina | rotina-6qt.pages.dev | rotina.ihering.com | Rotina Semanal |
| gain-com-br | gain-com-br.pages.dev | (pendente) | Todos os sites gain.com.br |

### DNS (ihering.com)

| Tipo | Nome | Destino |
|------|------|---------|
| CNAME | ihering.com | ihering-com.pages.dev |
| CNAME | www.ihering.com | ihering.com |
| CNAME | isis.ihering.com | isis-8y1.pages.dev |
| CNAME | renascer.ihering.com | renascer-6ok.pages.dev |
| CNAME | dieta.ihering.com | dieta-a1s.pages.dev |
| CNAME | catolestudios.ihering.com | catolestudios.pages.dev |
| CNAME | rotina.ihering.com | rotina-6qt.pages.dev |

## Fonte

Skills baseadas no repositório oficial: https://github.com/cloudflare/skills

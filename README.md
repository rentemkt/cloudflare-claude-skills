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
├── ihering.com/          # Projeto: ihering-com
│   ├── index.html        # Pagina principal (em construcao)
│   ├── renascer/         # Renascer depois do Amor
│   ├── catolestudios/    # Catole Studios
│   ├── dieta/            # FitTracker Pro
│   ├── isis/             # Atelier Isis
│   └── rotina/           # Rotina Semanal
└── gain.com.br/          # (pendente)
```

### Deploy

Cada pasta de dominio em `sites/` corresponde a um projeto no Cloudflare Pages.
O deploy e feito apontando o diretorio raiz do projeto Pages para a pasta do dominio.

**Deploy manual via Wrangler:**
```bash
wrangler pages deploy sites/ihering.com --project-name ihering-com
```

### URLs atuais (Pages)

| Site | URL |
|------|-----|
| ihering.com (principal) | https://ihering-com.pages.dev |
| /renascer | https://ihering-com.pages.dev/renascer |
| /catolestudios | https://ihering-com.pages.dev/catolestudios |
| /dieta | https://ihering-com.pages.dev/dieta |
| /isis | https://ihering-com.pages.dev/isis |
| /rotina | https://ihering-com.pages.dev/rotina |

## Fonte

Skills baseadas no repositório oficial: https://github.com/cloudflare/skills

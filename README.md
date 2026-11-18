<div align="center">
  <img src="public/brand/carolize-principal.svg" width="420" alt="CAROLIZE — Marketing Digital por Carol Guedes">
</div>

<br>

Identidade visual e portfólio digital da **CAROLIZE**, marca independente de
marketing digital, estratégia e criação de Carol Guedes.

Não é uma landing page: é uma apresentação de marca em sete capítulos, com
manual de identidade, estudos de caso e um sistema de aplicações construído
em código.

---

## O que está aqui

| | |
|---|---|
| **Marca** | Símbolo, wordmark e 15 arquivos vetoriais gerados por geometria paramétrica |
| **Universo gráfico** | 20 adesivos, carimbos e intervenções autorais |
| **Portfólio** | 7 capítulos em `/`, estudos de caso em `/projetos` |
| **Manual da marca** | `/marca` — conceito, construção, cor, tipografia, aplicações |
| **Proposta comercial** | `/proposta` — página interna, não indexada |

## Começar

```bash
npm install
npm run dev        # http://localhost:4321
```

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Gera `dist/` para publicar (roda verificação de tipos antes) |
| `npm run preview` | Confere o build |
| `npm run brand` | Regenera os arquivos da marca a partir de `tools/` *(requer Python 3)* |
| `npm run og` | Regenera a imagem de compartilhamento |

## Estrutura

```
src/
├── data/             ← conteúdo editável (contato, serviços, preços, processo)
├── content/projetos/ ← um .md por projeto do portfólio
├── components/
│   ├── marca/        ← wordmark, símbolo, selo, adesivos, construção
│   ├── pecas/        ← sistema de aplicações (13 peças)
│   ├── capitulos/    ← os 7 capítulos da home
│   └── ui/           ← revelação, marquee, botão, índice, cabeçalho, rodapé
├── pages/            ← rotas
├── styles/           ← tokens.css (cor, tipografia, ritmo) e base.css
└── lib/              ← movimento, cor, curvas geradas

tools/                ← geradores da marca em Python
public/brand/         ← SVGs prontos para download e impressão
public/fonts/         ← fontes variáveis self-hosted (SIL OFL)
docs/                 ← manual de edição e direção criativa
```

## A marca é gerada, não desenhada

O símbolo é um anel de espessura modulada definido por parâmetros em
`tools/geometry.py`: raio externo, raio interno, deslocamento do eixo de stress
e ângulo de abertura. O wordmark vetoriza a Fraunces e substitui o **O** pelo
símbolo, calibrado opticamente contra o glifo original.

Mudar um parâmetro e rodar `npm run brand` regenera os quinze arquivos de marca
e o módulo que alimenta os componentes animados — sem nenhum passo manual, sem
risco de uma versão divergir das outras.

## Decisões técnicas

- **Astro 5**, saída estática. Zero JavaScript por padrão.
- **19 kB de JS** no site inteiro — a maior parte é a inércia de rolagem, que
  só carrega em ponteiro fino.
- **Fontes self-hosted** em woff2 variável, com `preload` e subset por
  `unicode-range`. Sem requisição a terceiros.
- **Animação em CSS**, comandada por um único `IntersectionObserver`.
  Tudo respeita `prefers-reduced-motion`.
- **WCAG 2.1 AA**: todas as páginas passam na auditoria `axe-core`
  (wcag2a, wcag2aa, wcag21a, wcag21aa e best-practice), sem exceções.
- **SEO**: metadados por página, Open Graph, JSON-LD, sitemap e robots.
  A página de proposta fica fora do índice e do sitemap.

## Documentação

- **[docs/MANUAL.md](docs/MANUAL.md)** — como editar conteúdo, adicionar
  projetos, configurar contato, montar propostas e publicar.
- **[docs/DIRECAO-CRIATIVA.md](docs/DIRECAO-CRIATIVA.md)** — o raciocínio por
  trás de cada decisão de marca e de interface.

## Licenças

Fraunces, Archivo e DM Mono: SIL Open Font License 1.1 — uso comercial livre,
inclusive em impressos e redistribuídas com o projeto.

Identidade visual, universo gráfico e código: propriedade da CAROLIZE.

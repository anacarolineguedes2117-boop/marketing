# Manual de edição — CAROLIZE

Como atualizar o site sem mexer em código. Tudo que você precisa trocar está em
poucos arquivos de texto.

> Depois de qualquer alteração, rode `npm run build` e publique a pasta `dist/`.
> Se o site estiver na Vercel, Netlify ou Cloudflare Pages, basta dar `git push`
> — a publicação é automática.

---

## 1. Contato e redes sociais

**Arquivo:** `src/data/site.ts`

```ts
export const contato = {
  whatsapp: '5511999999999',   // 55 + DDD + número, só dígitos
  whatsappMensagem: 'Oi, Carol! ...',
  email: 'ola@carolize.com.br',
  instagram: 'carolize.studio',  // só o usuário, sem @
  linkedin: '',                  // URL completa, ou deixe vazio
  behance: '',
  local: 'São Paulo, SP',
};
```

Deixe `''` em qualquer campo para **esconder** aquele canal. Os botões e links
aparecem e somem sozinhos — enquanto nada estiver preenchido, o site mostra um
aviso discreto no lugar.

Também nesse arquivo: título e descrição que aparecem no Google (`site.titulo`,
`site.descricao`) e o endereço final do site (`site.url`).

---

## 2. Adicionar um projeto ao portfólio

**Pasta:** `src/content/projetos/`

Copie um arquivo existente, renomeie (o nome do arquivo vira o endereço:
`casa-nove.md` → `/projetos/casa-nove`) e preencha.

```yaml
---
titulo: Nome do Projeto
segmento: Ramo de atuação
resumo: Uma frase que resume o caso.
frase: Frase curta que aparece dentro das peças.

conceitual: false     # false = trabalho real de cliente
ano: '2026'
ordem: 5              # menor aparece primeiro
publicado: true       # false esconde sem apagar

desafio: Qual era o problema.
conceito: Qual foi a ideia que resolveu.
solucao: O que foi entregue e por quê.

entregas:
  - Identidade visual
  - Gestão de redes

resultados:           # deixe vazio se não houver número confiável
  - { valor: '+180%', rotulo: 'alcance em 3 meses' }

paleta:
  - { nome: Principal, hex: '#1a2b3c', tinta: true }
  - { nome: Apoio,     hex: '#d9c7a8' }
  - { nome: Destaque,  hex: '#c04a2b' }

marca:
  texto: Nome do Projeto
  familia: serif        # serif ou sans
  peso: 500
  tracking: 0.02
  caixaAlta: true
  assinatura: linha de apoio

pecas: [cartao, post, story, papelaria]
---

Um parágrafo final de reflexão sobre o projeto.
```

### Campos que importam

- **`conceitual`** — mantenha `true` em estudos demonstrativos. O site carimba
  esses projetos em três lugares para que nunca sejam confundidos com trabalho
  entregue. Em projeto real, use `false`.
- **`paleta`** — marque com `tinta: true` a cor que serve de texto. É dela que
  o site deriva todas as peças de aplicação.
- **`pecas`** — escolha entre: `cartao`, `cartaoVerso`, `papelaria`, `post`,
  `carrossel`, `story`, `etiqueta`, `embalagem`, `catalogo`, `tela`, `selo`,
  `destaques`, `assinaturaEmail`.
- **`resultados`** — só preencha com números que você consiga comprovar.

### Usar fotografia real

Coloque a imagem em `public/projetos/` e aponte:

```yaml
foto: /projetos/nome-do-arquivo.jpg
fotoAlt: Descrição do que aparece na foto
```

---

## 3. Sua fotografia na seção "A criadora"

1. Salve o retrato em `public/criadora.jpg` (proporção 3:4, mínimo 900×1200).
2. Abra `src/components/capitulos/C06Criadora.astro`.
3. Troque a linha `const foto: string | null = null;` por
   `const foto: string | null = '/criadora.jpg';`.

Enquanto não houver foto, o espaço mostra uma moldura com o selo da marca —
é um estado desenhado, não um buraco.

---

## 4. Serviços

**Arquivo:** `src/data/servicos.ts`

Cada categoria tem número, título, uma **premissa** (a frase que explica o valor
da frente, não o que ela entrega) e a lista de itens. Para acrescentar um
serviço, inclua uma linha em `itens`.

---

## 5. Textos dos capítulos

| Capítulo | Arquivo |
|---|---|
| 01 Abertura | `src/components/capitulos/C01Abertura.astro` |
| 02 Quem é | `src/components/capitulos/C02Marca.astro` |
| 03 O que fazemos | `src/data/servicos.ts` |
| 04 Processo | `src/data/processo.ts` |
| 05 Projetos | `src/content/projetos/` |
| 06 A criadora | `src/components/capitulos/C06Criadora.astro` |
| 07 Contato | `src/components/capitulos/C07Contato.astro` |

Nomes e ordem dos capítulos: `src/data/capitulos.ts`.

---

## 6. Preços e propostas comerciais

**Arquivo:** `src/data/comercial.ts`

Os valores **não aparecem no portfólio público**. Eles alimentam só a página
`/proposta`, que não é linkada em lugar nenhum, não entra no sitemap e é marcada
como `noindex`.

### Montar uma proposta

```ts
export const propostaAtual = {
  cliente: 'Nome do cliente',
  validade: '30 dias',
  itens: ['gestao-basica', 'posts-8', 'reels-4'],  // chaves da tabela
  observacoes: ['Os valores não incluem mídia paga.'],
};
```

Abra `/proposta` e envie o link. A página também imprime bem em PDF
(Ctrl+P → Salvar como PDF).

### Pacote de gestão geral

O bloco `gestaoGeral` está pronto, com `ativo: false`. Preencha valor, o que
inclui e as condições, mude para `ativo: true` e ele aparece na proposta.

> ⚠️ **`noindex` não é senha.** A página não aparece no Google, mas quem tiver
> o link consegue abrir. Para proteção real, veja a seção 9.

---

## 7. Arquivos da marca

Todos em `public/brand/` — logo principal, vertical, wordmark, negativa,
monocromática, símbolo, avatar e favicon, em SVG (vetor, não perde qualidade).

A página `/marca` mostra todos com botão de download, mais as regras de uso,
a paleta com os códigos, a tipografia e o universo gráfico completo.

### Regenerar a marca

Se um dia você quiser ajustar o símbolo (contraste, abertura, tamanho do
fragmento), os parâmetros estão em `tools/geometry.py`. Depois rode:

```bash
npm run brand
```

Os quinze arquivos se regeneram coerentes entre si. Para refazer a imagem de
compartilhamento: `npm run og`.

---

## 8. Comandos

```bash
npm install      # uma vez, ao clonar o projeto
npm run dev      # servidor local em http://localhost:4321
npm run build    # gera a pasta dist/ para publicar
npm run preview  # confere o resultado do build
npm run brand    # regenera os arquivos da marca (precisa de Python 3)
npm run og       # regenera a imagem de compartilhamento
```

---

## 9. Área administrativa protegida

Hoje o conteúdo é editado em arquivos de texto e publicado por Git. Isso é
rápido, versionado e de custo zero. Para editar pelo navegador, com senha,
é preciso infraestrutura adicional. **Nada disso foi implementado — seria
autenticação fictícia, que não protege nada.** As opções reais:

### Opção A — CMS em cima do Git *(recomendada)*

Painel no navegador que grava direto nos mesmos arquivos `.md`.

- **O que usar:** Sveltia CMS ou Decap CMS (gratuitos).
- **O que falta montar:** um serviço de autenticação OAuth com o GitHub —
  um worker na Cloudflare resolve, no plano gratuito.
- **Custo:** zero. **Esforço:** algumas horas de configuração.
- **Ganho:** você edita projetos e textos de qualquer lugar, com login do
  GitHub, e o site republica sozinho.

### Opção B — CMS hospedado

- **O que usar:** Sanity, Storyblok ou Contentful (têm plano gratuito).
- **O que falta montar:** migrar o conteúdo e reconectar as páginas à API.
- **Custo:** gratuito no início, pago conforme cresce.
- **Ganho:** painel mais completo, com pré-visualização e vários usuários.

### Proteger a página de proposta

- **Mais simples:** proteção por senha da hospedagem. Netlify e Vercel oferecem
  isso em planos pagos; Cloudflare Pages faz com Cloudflare Access.
- **Alternativa de custo zero:** gerar um endereço difícil de adivinhar
  (ex.: `/proposta-a7f3k9`) e enviar só para o cliente.
- **O que não fazer:** senha em JavaScript no navegador. É decorativa — qualquer
  pessoa lê o código da página.

---

## 10. Onde publicar

O site é estático: gera só HTML, CSS e imagens. Funciona em qualquer hospedagem.

| Serviço | Custo | Observação |
|---|---|---|
| **Cloudflare Pages** | Gratuito | Mais rápido no Brasil |
| **Netlify** | Gratuito | Mais simples de configurar |
| **Vercel** | Gratuito | Integração direta com Git |

Em todos: conecte o repositório, defina `npm run build` como comando e `dist`
como pasta de saída. Depois disso, cada `git push` publica.

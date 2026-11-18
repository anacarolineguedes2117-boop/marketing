# CAROLIZE — direção criativa

Registro das decisões e do porquê de cada uma. Serve para defender o projeto
numa reunião e para manter coerência quando a marca crescer.

---

## 1. O problema de posicionamento

Uma marca de marketing digital independente disputa atenção com dois extremos:
o freelancer que mostra só artes soltas, e a agência que fala em linguagem
corporativa genérica. Os dois são esquecíveis pelo mesmo motivo: não têm ponto
de vista.

A decisão central do projeto foi **tratar a Carolize como um estúdio criativo,
não como um prestador de serviços**. Isso muda tudo: o site não lista o que ela
faz, ele demonstra como ela pensa. O preço nem aparece — valor vem antes de
tabela.

## 2. O nome vira o conceito

`CAROL + IZE = transformar`

O sufixo *-ize* / *-izar* transforma substantivo em verbo. Esse é o conceito, e
ele não ficou só no texto: **o símbolo executa o mesmo movimento em geometria**.

Um anel fechado (O) que se abre (C) e deixa escapar um fragmento. Lido rápido,
é um O. Lido devagar, é um C. É a marca em estado de transformação.

Isso resolve o pedido de "monograma com C e O" sem recorrer a duas letras
encaixadas — solução que todo mundo já viu.

## 3. Por que o símbolo é geométrico, mas não frio

O anel **não tem espessura constante**. O círculo interno é deslocado 12% do
raio num eixo de −38°, o que engrossa a forma de um lado e afina do outro.

Esse é exatamente o princípio do contraste de espessura das serifas de alto
contraste (didones). O resultado: uma forma puramente geométrica que conversa
com a tipografia sem imitá-la. É o que impede o símbolo de parecer um ícone de
*loading*.

A abertura de 52° fica no ponto mais fino — onde um C clássico também afina.

**O símbolo é gerado por parâmetros, não desenhado à mão** (`tools/geometry.py`).
Mudar o contraste, a abertura ou o eixo é mudar um número e rodar `npm run brand`.
Os quinze arquivos de marca se regeneram coerentes entre si.

## 4. Tipografia: três vozes, papéis que não se sobrepõem

| Família | Papel | Por quê |
|---|---|---|
| **Fraunces** | Display, logo, títulos | Serifa variável de alto contraste. Os eixos `opsz`, `SOFT` e `WONK` dão personalidade sem recorrer a uma fonte decorativa. Usada em `opsz 144` + `SOFT 15`: terminais com um resto de arredondamento — é esse detalhe que tira a frieza e dá o lado feminino **sem infantilizar**. |
| **Archivo** | Texto corrido, interface | Grotesca variável desenhada para tela. Neutra o suficiente para não disputar com a Fraunces, com largura variável para ajustes finos. |
| **DM Mono** | Etiquetas, numeração, carimbos | Só em caixa alta com espacejamento largo. Funciona como anotação sobre a página — a camada de "arquivo", "edição", "capítulo". |

Todas sob licença SIL OFL e **servidas do próprio domínio** — sem Google Fonts,
sem requisição a terceiros, sem salto de layout no carregamento.

O wordmark substitui o **O** tipográfico pelo símbolo, com diâmetro calibrado
opticamente contra o O original e **preservando o avanço do glifo** — o ritmo da
palavra não muda.

## 5. Cor: o rosa é assinatura, não superfície

O briefing pedia o rosa como assinatura e alertava contra excesso de rosa.
A hierarquia resolve isso:

- **Creme** é a superfície dominante. Quase todo o site é creme.
- **Preto** é a tinta e o fundo dramático.
- **Vinho** dá profundidade e, em fundos claros, **substitui o rosa em texto**
  (o rosa sobre creme dá 2,8:1 — reprova em acessibilidade).
- **Rosa** aparece em dose pequena: o fragmento do símbolo, um detalhe, uma
  régua, um adesivo. É notado justamente porque é raro.
- **Rosa claro** só como respiro de fundo.

Os tons de apoio foram calculados para **4,5:1 contra todas as superfícies** do
sistema, não escolhidos no olho.

## 6. Universo gráfico: scrapbook construído, não bagunçado

Vinte elementos autorais: estrelas, asterisco, carimbo, recortes de papel, fita,
etiqueta, rabisco, onda, seta, colchetes, alvo, moldura, formas orgânicas.

Duas decisões evitam a aparência de trabalho escolar:

1. **Tudo é gerado com geometria controlada** (`tools/stickers.py`), com ruído
   de semente fixa. O serrilhado do carimbo e o rasgo do papel parecem feitos à
   mão, mas são idênticos a cada build.
2. **Uso disciplinado.** Nunca mais de dois ou três elementos por tela, sempre
   em posições que respondem à composição. O adesivo é pontuação, não enfeite.

## 7. A navegação é uma publicação

Sete capítulos numerados, cada um com **tema de cor próprio** — creme, preto,
creme, vinho, papel, rosa, preto. A troca de fundo funciona como troca de papel
numa revista: cria ritmo e marca a passagem de assunto.

O índice lateral mostra onde você está e quanto falta. Ele **muda de cor
conforme o capítulo em foco**, em vez de recorrer a modo de mistura.

Movimento: nada de biblioteca de animação. Um único `IntersectionObserver`
comanda todas as revelações; o CSS faz o resto. Inércia de rolagem só em
ponteiro fino. **Tudo respeita `prefers-reduced-motion`.** Total de JavaScript
do site: **19 kB**.

## 8. Projetos como estudos de caso

Projeto de design não se apresenta com galeria de imagens — se apresenta com
raciocínio: qual era o problema, qual foi o conceito, o que a solução resolveu.

As aplicações (cartão, papelaria, feed, story, carrossel, embalagem, catálogo,
etiqueta, tela, selo, destaques, assinatura) são **construídas em código com a
paleta de cada projeto**, não mockups genéricos. Trocar a paleta no arquivo do
projeto redesenha todas as peças.

### Honestidade do portfólio

Os três projetos iniciais são **conceituais** e isso é declarado em três lugares
independentes: aviso antes da lista, carimbo sobre cada peça e faixa no topo do
estudo. Nenhum cliente, número ou depoimento foi inventado. O campo de
resultados existe no schema e fica vazio até haver dado real.

## 9. O que foi deliberadamente evitado

- Gradientes, sombras coloridas e brilhos.
- Cards repetidos de três em três.
- Ícones de megafone, foguete, lâmpada e gráfico de crescimento.
- Animação que atrapalha leitura.
- Preço na porta de entrada.
- Qualquer dado inventado.

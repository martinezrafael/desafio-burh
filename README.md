# Desafio Burh

Acesse aqui a aplicação: <a href="https://desafio-burh.vercel.app/">Link</a>

## Tecnologias Utilizadas
- <a href="https://vuejs.org/">Vue.js</a>
- <a href="https://sass-lang.com/">Sass</a>
- <a href="https://axios-http.com/ptbr/">Axios</a>

##Fonte de Dados
Para fazer as requests e popular a aplicação com dados, utilizei a API <a href="https://jsonplaceholder.typicode.com/">JSON Placeholder</a>

## Decisões de Desenvolvimento
- Escolhi o framework Vue.js para este projeto, mesmo sendo uma nova experiência para mim, pois considero importante enfrentar desafios e ampliar meu conhecimento. Além disso, a semelhança do Vue.js com o React, que já tenho experiência, facilitou minha adaptação.
- Optei pelo uso do Sass como pré-processador de estilos, pois, após uma breve pesquisa, percebi sua excelente integração com o Vue.js, o que contribui significativamente para o desenvolvimento eficiente.
- Utilizei o Axios para realizar as solicitações à API, devido à sua praticidade e eficácia comprovadas.

## Estrutura do Projeto
- O diretório `/services` contém o arquivo `api.js`, onde centralizei todas as requisições da aplicação.
- Componentes comuns que são amplamente utilizados em toda a aplicação estão localizados no diretório `/components/Commons`, como o componente `Header.vue`.
- As funcionalidades relacionadas às postagens do blog estão agrupadas no diretório `/components/Blog/Postagens`, que contém:
  - `FormCriarPost.vue`: formulário para criação de postagens.
  - `Post.vue`: componente responsável por receber dados do formulário de criação de postagens e exibir as postagens já criadas.
  - `Posts.vue`: componente de lista responsável por renderizar as postagens na tela.
- Cada pasta de componentes inclui uma pasta `scss` que contém os estilos daqueles componentes.
- Os estilos comuns, como botões, títulos, textos, cores e mixins, estão armazenados na pasta `assets/scss`, para serem compartilhados em toda a aplicação.

## Para rodar o projeto na sua máquina:
- Clone esse repositório na sua máquina local
- Acesse o repositório e rode no terminal o comando `npm install`
- Em seguida  rode o comando `npm run dev`
  

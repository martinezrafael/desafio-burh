# desafio-burh

**Tecnologias utilizadas no projeto**
- <a href="https://vuejs.org/">Vue.js</a>
- <a href="https://sass-lang.com/">Sass</a>
- <a href="https://axios-http.com/ptbr/">Axios</a>

**Para fazer as requests e popular a aplicação com dados, utilizei a API <a href="https://jsonplaceholder.typicode.com/">JSON Placeholder</a>**

**Decisões**
- Optei pela utilização do framework Vue.js por ser um framework qua nunca havia utilizado e achei que seria válido o desafio e por ele ser bastante parecido com o React, com o qual eu já tenho maior familiaridade
- Em relação ao uso do Sass como Pré processador, depois de uma breve pesquisa eu vi que o Sass tem uma ótima integração com o Vue.js e facilita muito o desenvolvimento.
- O Axios para fazer as requests é bastante útil.

**Separação do código**

- Criei um diretório `/services` onde coloquei o meu arquivo `api.js`e nele concentro todas as requisições da minha aplicação:

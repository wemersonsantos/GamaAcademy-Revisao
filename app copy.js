//* Incluindo uma biblioteca
const http = require('http');
const url = require('url');
const queryString = require('query-String');

//*Defini IP e PORTA
const hostname = '127.0.0.1';
const port = 3000;

//* Implementação da regra de negócio
const server = http.createServer((req, res) => {

  //*Pegar a pergunta na url
  let resposta;
  const urlparse = url.parse(req.url, true);
  
  const params = queryString.parse(urlparse.search);
  
  console.log(params);
  //*Verificar a pergunta e escolher a resposta
  
  if(params.pergunta == 'melhor-filme'){
    resposta = 'star wars'
    //console.log()imprimi no terminal
  }else if(params.pergunta == 'melhor-tecnologia-backend'){
    resposta = 'node.js'
  }else{
    resposta = 'nao sei, desculpe'
  }
  //*retorna a resposta escolhida

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(resposta);//imprimi no navegador
});

//*Execução
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

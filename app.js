//* Incluindo uma biblioteca
const http = require('http');
const url = require('url');
const queryString = require('query-String');
const fs = require('fs');


//*Defini IP e PORTA
const hostname = '127.0.0.1';
const port = 3000;

//* Implementação da regra de negócio
const server = http.createServer((req, res) => {

  let resposta;
  const urlparse = url.parse(req.url, true)
  //*Receber informacoes
  const params = queryString.parse(urlparse.search);

  //* Criar um usuario - Atualizar um usuario
  if(urlparse.pathname == '/criar-atualizar-usuario?'){

    //* Salvar as informacoes
      fs.writeFile('users/' + params.id + '.txt', JSON.stringify(params), function (err) {
        if (err) throw err;
        console.log('Saved!');
        resposta = 'usuario salvo com sucesso';

        res.statusCode = 201;
        res.setHeader('Content-Type', 'text/plain');
        res.end(resposta);//imprimi no navegador
      });
      
    }else if(urlparse.pathname == '/selecionar'){
      //* Selecionar o usuario
      fs.readFile('users/' + params.id + '.txt', function(err, data) {
        resposta = data;

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(resposta);//imprimi no navegador
      });
    }else if(urlparse.pathname == '/remover-usuario'){
     //* Remover o usuario
     fs.unlink('users/' + params.id + '.txt', function (err) { 
        console.log('File deleted!');
        
        resposta = err ? 'usuario nao encontrado' : 'usuario deletado';
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end(resposta);//imprimi no navegador
    });
        
      } 
  });

//*Execução
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


//*http://localhost:3000/criar-atualizar-usuario?node=wemerson&idade=23&id=1
//*http://localhost:3000/selecionar?id=1
//*http://localhost:3000/remover-usuario?id=1


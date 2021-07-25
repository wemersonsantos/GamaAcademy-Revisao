//* Importanto as bibliotecas

import { createServer, IncomingMessage, ServerResponse } from 'http';
import { parse } from 'query-string';
import * as url from 'url';
import { writeFile }from 'fs';

//* Definição de porta
const port = 5000;

const server = createServer((request: IncomingMessage, response: ServerResponse) => {

    let resposta;

    const urlparse = url.parse(request.url ? request.url : '', true);

    //*Recebendo informacoes do usuario
    const params = parse(urlparse.search ? urlparse.search : '');

    //* Salvar as informacoes
    writeFile('users/' + params.id + '.txt', JSON.stringify(params), function (err: any) {
        if (err) throw err;
        console.log('Saved!');
        resposta = 'usuario salvo com sucesso';

        response.statusCode = 201;
        response.setHeader('Content-Type', 'text/plain');
        response.end(resposta);//imprimi no navegador
      });
})

//* Execução
server.listen(port, () =>{
    console.log(`Server running on port ${port}`);
})

//*http://localhost:3000/criar-atualizar-usuario?node=wemerson&idade=23&id=1

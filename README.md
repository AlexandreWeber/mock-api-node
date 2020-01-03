# API de clientes e países

API desenvolvida para facilitar os treinamentos front-end,  os dados retornados estão gravados nos arquivos JSON's da pasta **data**.  A API suporta ordenação crescente e decrescente, fields e pesquisa por todos os campos retornados. 

  

# Recurso

**customer**

|Método  |Descrição | URL |
|--|--|--|
| **GET** |Retorna todos os registros, permite filtrar por todos os campos retornados através de query-params. A busca não é case sensitive e a pesquisa não é exata é sempre com o includes ('like')  | /customer?name=João
|**GET**|Retorna apenas um registro, deve ser informado o code |/customer/:code|
|**PUT**|Altera um registro, deve ser informado o code |/customer/:code|
|**POST**|Cria um novo registro| /customer
|**DELETE**|Remover um registro, deve ser informado o code |/customer/:code|


# Recurso

**country**

|Método  |Descrição | URL |
|--|--|--|
| **GET** |Retorna todos os registros, permite filtrar por todos os campos retornados através de query-params. A busca não é case sensitive e a pesquisa não é exata é sempre com o includes ('like')  | /country?code=BRA
|**GET**|Retorna apenas um registro, deve ser informado o id |/country/:id|
|**PUT**|Altera um registro, deve ser informado o id | /country/:id|
|**POST**|Cria um novo registro| /country
|**DELETE**|Remover um registro, deve ser informado o id | /country/:id|  

# Iniciando o serviço

 1. Executar o comando **npm i** e **npm i -g nodemon**
 2. Executar o comando **nodemon server.js**
 3. Deverá apresentar a mensagem **listen on 3000**
 4. A API estará disponível nos caminhos:

http://localhost:3000/customer

http://localhost:3000/country

 - A aplicação faz load automático das alterações após salvar, não é
   necessário reiniciar o serviço quando for realizada alguma alteração
   no JSON com os dados ou nos controllers por exemplo.

# API para facilitar o treinamento do Po, a API retorna os dados dos JSON's gravados na pasta data. Esses JSON's são alterados nos métodos POST, PUT e DELETE

# Recurso
/customer

# Métodos 
QUERY  - Retorna todos os registros, permite filtrar por todos os campos retornados\
       - A busca não é case sensitive e a pesquisa não é exata é sempre com o includes ('like')\
GET    - Retornar apenas um registro, deve ser informado o code /customer/:code\
PUT    - Altera um registro, deve ser informado o code /customer/:code\
POST   - Cria um novo registro\
DELETE - Remover um registro, deve ser informado o code /customer/:code

# Recurso
/country

# Métodos 
QUERY  - Retorna todos os registros, permite filtrar por todos os campos retornados\
       - A busca não é case sensitive e a pesquisa não é exata é sempre com o includes ('like')\
GET    - Retornar apenas um registro, deve ser informado o code /customer/:code\
PUT    - Altera um registro, deve ser informado o code /customer/:code\
POST   - Cria um novo registro\
DELETE - Remover um registro, deve ser informado o code /customer/:code

# Iniciar serviço
- Executar o comando npm i e npm install -g nodemon
- Executar o comando nodemon server.js
- Deverá apresentar a mensagem listen on 3000
- A API estará disponível nos caminhos:
http://localhost:3000/customer\
http://localhost:3000/country\
- A aplicação faz load automático das alterações após salvar, não é necessário reiniciar o serviço quando for realizada alguma alteração no JSON com os dados ou nos controllers por exemplo
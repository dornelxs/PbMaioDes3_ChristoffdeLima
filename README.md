# Backend CRUD de Usuários e Eventos com Autenticação JWT - Projeto AWS

Este projeto é um backend desenvolvido em **Node.js** com **Express** e **TypeScript**, implementando um CRUD para Usuários e Eventos. Utiliza autenticação JWT para segurança dos endpoints e armazena as informações em um banco de dados NoSQL, o **MongoDB**. A aplicação é implantada em uma instância **EC2 da AWS**.

## Requisitos necessários 

- **Node.js** e **npm** instalados
- **MongoDB** para armazenamento de dados
- **AWS EC2** para implantação

## Infraestrutura do Projeto

- `src/controllers/` - Controladores para lógica de negócios
- `src/models/` - Modelos de dados
- `src/routes/` - Definição das rotas da API
- `src/middlewares/` - Middlewares, incluindo autenticação JWT
- `src/tests/` - Testes unitários
- `src/index.ts` - Arquivo principal para inicialização do servidor

## Rotas da API

- `src/routes/authRoutes.ts` - Rotas de autenticação
- `src/routes/eventRoutes.ts` - Rotas de eventos
- `src/routes/userRoutes.ts` - Rotas de usuários

Confira a documentação no [Swagger](https://app.swaggerhub.com/apis/docs/PAULOSENA/sp_nigeria_third_challenge/1.0.0) para detalhes das rotas.

### Usuários

- **POST** `/api/users/sign-up` - Registro de um novo usuário
- **POST** `/api/users/sign-in` - Autenticação do usuário

### Eventos

- **GET** `/api/events` - Listar todos os eventos
- **GET** `/api/events/:id` - Obter detalhes de um evento específico
- **POST** `/api/events` - Criar um novo evento
- **PUT** `/api/events/:id` - Atualizar um evento existente
- **DELETE** `/api/events/:id` - Deletar um evento

## Configuração do Ambiente

1. Clone o repositório:

    ```bash
    git clone https://github.com/dornelxs/PbMaioDes3_ChristoffdeLima.git
    ```

2. Na pasta, instale as dependências:

    ```bash
    npm install
    ```

3. Configure as variáveis de ambiente. Crie um arquivo `.env` na raiz do projeto e insira:

    ```
    MONGO_URI=mongodb://<usuario>:<senha>@<host>:<porta>/<database>
    JWT_SECRET=sua_chave_secreta
    ```

4. Compile o TypeScript:

    ```bash
    tsc
    ```

4. Inicie o servidor:

    ```bash
    npm start
    ```

## Testes

Para executar os testes unitários:

1. Certifique-se de que o MongoDB está em execução.
2. Execute os testes:

    ```bash
    npm test
    ```

## Desenvolvedor

- **Christoff de Lima Dornelas Cavalcante** 

## Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.

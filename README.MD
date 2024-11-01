# Puppeteer - Hooktheory

## 📖 Sobre o Projeto
Este projeto é um scraping que utiliza o site Hooktheory para varrer a base de dados com os artistas e suas músicas e inserir os dados em um banco de dados MongoDB.


## 🚀 Tecnologias e Ferramentas
O projeto foi criado em JavaScript (mas pode ser facilmente convertido para TypeScript) com o Puppeteer e utiliza um Dockerfile para simplificar o uso.

#### Bibliotecas e Tecnologias Utilizadas:
| Tecnologia           | Versão    |
|----------------------|-----------|
| **Runtime**           |           |
| Node                  | v18.x     |
| **Desenvolvimento**   |           |
| Docker Engine         | vXX.X.X   |
| Bundler               | v2.6.0    |

### Organização do Projeto

```
/
├─📁 .devcontainer     -> Configurações do ambiente de desenvolvimento (Devcontainer)
├─📁 docs              -> Artefatos de documentação
├──📁src
│   ├─🇯index.js            -> Arquivo principal para iniciar o scraping
│       ...
│   ├─📁scraping
│      ├─🇯xxxx.js       ->  Funções de scraping específicas (e.g., pesquisa, login...)
│       ...
│   ├─📁utils             
│      ├─🇯fileManager.js   -> Funções para salvar capturas de tela, dados, etc.
│      ├─🇯logger.js        -> Logs e tratamento de erros
│       ...
├──📁 Config
│   ├─🇯browser.js          -> configurações do navegador
│   ├─🇯config.js           -> configurações do Puppeteer
│   ├─🇯db.js               -> configurações do mongoDB
│       ...
├─📁screenshots             -> Pasta onde as capturas de tela serão salvas
├── package.json            -> Configurações e dependências do projeto
├─📄 .gitignore             -> Arquivos e pastas ignorados pelo Git
├─📄 Makefile               -> Automação de tarefas
└─📄 README.md              -> Documentação do projeto (Este arquivo)
```

## 🛠️ Configuração do Ambiente de Desenvolvimento

Este repositório está configurado para rodar em um **Devcontainer** no VSCode. Siga os passos abaixo para instanciar o ambiente.

### Extensões Recomendadas

- **Nome**: Remote Development
- **Id**: `ms-vscode-remote.vscode-remote-extensionpack`
- **Descrição**: Pacote de extensões que permite abrir pastas em containers, máquinas remotas ou WSL com todas as funcionalidades do VSCode.
- **Versão**: 0.25.0
- [VSCode Marketplace Link](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack)

### Docker Engine

É necessário ter o Docker Engine instalado. Veja o guia de instalação para seu sistema operacional [aqui](https://docs.docker.com/engine/install/).

### Procedimento para Instanciar o Projeto no VSCode

1. Instale o pacote de extensões recomendadas.
2. Clone ou faça fork deste repositório.
3. Abra o diretório do projeto no VSCode.
4. Execute o comando _Dev Containers: Reopen in Container_ na paleta de comandos do VSCode (_F1, Ctrl+Shift+P_).

Após a configuração do Devcontainer, o VSCode abrirá o projeto dentro de um ambiente isolado, conforme definido no diretório **/.devcontainer**.

## 🚀 Iniciando a Aplicação

1. Para iniciar o scraping (instalar as dependências e configurar o ambiente):
    ```sh
    make scraping
    ```

### Gerenciamento de Dependências

1. Instale uma nova biblioteca:
    ```sh
    npm install <nome_da_lib>
    ```

## 📖 Caso Prefira sem o Devcontainer

Se você preferir configurar e executar o projeto sem usar o devcontainer, siga as instruções abaixo:

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm (versão 6 ou superior)
- Docker (opcional, se desejar usar o Docker para executar o Puppeteer)


### Executando o scraping localmente 

1. **Inicie o MongoDB:**

    ```sh
    docker run -d \
      --name mongodb \
      -p 27017:27017 \
      -v ~/mongodb/data:/data/db \
      mongo:latest
    ```

2. **Configure o arquivo `.env`:**

    Abra o arquivo `.env` na raiz do projeto `MONGO_URI` para:

    ```env
    MONGO_URI=mongodb://localhost:27017
    ```

3. **Execute o scraping:**

    ```sh
    make scraping
    ```

4. **(Opcional) Execute o scraping usando Docker:**

    Se preferir usar Docker para isolar o ambiente de execução, você pode construir e executar o contêiner Docker:

    1. **Inicie os serviços:**

        ```sh
        docker compose build
        ```

        *Para executar em modo destacado (background), use:*

        ```sh
        docker compose up -d
        ```

    2. **Verifique os logs dos serviços:**

        ```sh
        docker compose logs -f
        ```

    3. **Parar os serviços:**

        ```sh
        docker compose down
        ```

### 📖 Como Visualizar os Dados no MongoDB

1. **Conectar ao MongoDB via Docker Exec:**
    ```sh
    docker exec -it mongodb mongosh
    ```

2. **Conectar-se ao MongoDB:**
    ```sh
    mongosh mongodb://localhost:27017
    ```

3. **Selecionar o banco de dados desejado:**

    ```javascript
    use hooktheory-scraper
    ```

4. **Listar as coleções disponíveis:**
    ```javascript
    show collections
    ```

5. **Visualizar os documentos em uma coleção específica (exemplo: `artists`):**
    ```javascript
    db.artists.find().pretty()
    ```

## 📄 Licença

Este projeto está licenciado sob uma licença de uso restrito. **Não é permitida a utilização deste código para fins lucrativos**. O uso e a distribuição são permitidos somente para fins educacionais, pessoais e de pesquisa. Ao utilizar este repositório, você concorda em não utilizar este código em projetos comerciais ou em qualquer outro contexto com fins de lucro.

Para mais informações sobre as permissões e restrições, consulte o arquivo `LICENSE.md`. [aqui](docs/LICENSE.md)


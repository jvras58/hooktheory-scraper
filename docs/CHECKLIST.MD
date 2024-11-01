## CRIAÇÃO DO REPOSITÓRIO E ESTRUTURAÇÃO DO DEVCONTAINER

**Checkpoints:**

1. [x] Criar repositório no GitHub
2. [x] Criar pasta `.devcontainer` e estruturar as configurações
   - [x] Definir imagem base
   - [x] Configurar Dockerfile
   - [x] Configurar devcontainer.json
3. [x] Testar configuração do DevContainer
   - [x] Verificar se o container inicia corretamente
   - [x] Validar se todas as extensões e ferramentas estão funcionando

## CRIAÇÃO DO CÓDIGO BASE DE SCRAPING

**Checkpoints:**

1. [x] Criar o arquivo `scraping.js`
2. [x] Definir o objetivo do scraping para testes
   - [x] Selecionar o site ou dados a serem extraídos
   - [x] Identificar os elementos HTML alvo
3. [x] Testar o código dentro do ambiente do DevContainer
   - [x] Verificar se o código executa sem erros
   - [x] Validar os dados extraídos
4. [x] Testar o código fora do ambiente do DevContainer
   - [x] Garantir a compatibilidade do código
   - [x] Comparar os resultados com os testes anteriores

## CRIAÇÃO DO DOCKERFILE

**Checkpoints:**

1. [x] Criar Arquivo `DOCKERFILE` na raiz do projeto
   - [x] Definir imagem base lts
   - [x] Configurar Dockerfile e as dependencias
2. [x] Testar configuração do `DOCKERFILE`
   - [x] Verificar se o container inicia corretamente
3. [x] Testar o código dentro do ambiente do `DOCKERFILE`
   - [x] Verificar se o código executa sem erros
   - [x] Validar os dados extraídos
   - [x] Comparar os resultados com os testes anteriores

## Hospedagem no Render

**Checkpoints:**

1. [] Criar a hospedagem no Render
   - [] Configurar o ambiente de produção
   - [] Definir variáveis de ambiente necessárias
2. [] Testar a aplicação hospedada
   - [] Verificar se o código executa sem erros
   - [] Validar a funcionalidade completa da aplicação
   - [] Comparar os resultados com os testes anteriores
3. [] Monitorar a aplicação
   - [] Configurar alertas e logs
   - [] Verificar a performance e disponibilidade

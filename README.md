# App Mobile - Imobly (Gestão Imobiliária)

Este projeto foi desenvolvido como parte do **Trabalho Prático da disciplina de Aplicações Mobile**.
O aplicativo simula um sistema de **Gestão e Catálogo de Imóveis**, permitindo a administração de propriedades e a visualização por clientes.

---

## Funcionalidades Implementadas

### 1. Tela de Login

- Autenticação via E-mail e senha.
- Botão “Entrar” para acesso ao sistema.
- Link direto para a tela de cadastro de novos usuários.
- Integração com Context API para gestão de sessão.

### 2. Cadastro de Usuário

- Nome completo.
- E-mail (com validação de formato).
- Senha.
- **Tipo de usuário:** Cliente ou Admin (define as permissões de acesso no app).

### 3. Cadastro Principal (Dados do Imóvel/Proprietário)

O cadastro de imóveis inclui dados completos de localização e registro:

- **Nome do Imóvel/Empreendimento**.
- **Endereço completo:** Rua, Número, CEP (com busca automática via API), Bairro, Cidade, UF.
- **Geolocalização:** Latitude e Longitude (integrado com mapas).
- **CNPJ** do proprietário ou imobiliária responsável (com máscara).

### 4. Detalhes do Item (Anúncio do Imóvel)

Complementando o cadastro, cada imóvel possui:

- **Nome/Título** do anúncio.
- **Descrição** detalhada.
- **Preço** de venda/aluguel.
- **Imagem** (URL da foto do imóvel).

### 5. Listagem e Gerenciamento

- **Visualização:** Lista vertical com imagem do imóvel à esquerda.
- **Destaque:** Nome do imóvel em negrito e preço formatado à direita.
- **Detalhes:** Descrição breve abaixo do título.
- **Ações (Admin):** Opções para **Editar** e **Excluir** registros existentes.
- **Ações (Cliente):** Visualização detalhada ao clicar no item.

---

## Tecnologias Utilizadas

- **[React Native](https://reactnative.dev/)** - Framework principal.
- **[Expo](https://expo.dev/)** - Plataforma de desenvolvimento.
- **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estática para maior segurança.
- **[Expo SQLite](https://docs.expo.dev/versions/latest/sdk/sqlite/)** - Banco de dados local para persistência dos imóveis.
- **[AsyncStorage](https://react-native-async-storage.github.io/async-storage/)** - Persistência de sessão do usuário.
- **[React Native Maps](https://github.com/react-native-maps/react-native-maps)** - Visualização de localização.
- **[React Native Paper](https://callstack.github.io/react-native-paper/)** - Componentes de UI (Material Design).

---

## Demonstração em Vídeo

Assista ao vídeo de apresentação do app pelo link abaixo:

[Link para o vídeo no YouTube](https://youtube.com/seu-video-aqui)
*(Edite este link com a URL real do seu vídeo)*

---

## Como Rodar o Projeto

Este repositório contém todo o código-fonte do projeto. Siga os passos abaixo para configurar e executar o aplicativo em seu ambiente local.

### Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **[Node.js](https://nodejs.org/)** (versão LTS recomendada).
- **[Expo Go](https://expo.dev/client)** instalado no seu dispositivo físico (Android ou iOS) ou um emulador configurado.

### Instalação

1. Clone este repositório para sua máquina local.
2. Acesse a pasta do projeto via terminal.
3. Instale todas as dependências do projeto executando o comando abaixo:

```bash
npm install
```

### Executando o App

Para iniciar o servidor de desenvolvimento do Expo, utilize o comando:

```bash
npx expo start
```

Após executar o comando, um QR Code será exibido no terminal:

- **Android:** Abra o app Expo Go e escaneie o QR Code.
- **iOS:** Abra a câmera do seu iPhone e escaneie o QR Code.
- **Emulador:** Pressione `a` para abrir no emulador Android ou `i` para o simulador iOS.

### Solução de Problemas (Firewall/Conexão)

Caso você enfrente problemas de conexão (como o app ficar preso na tela de carregamento ou erros de "Network response timed out") devido a restrições de firewall ou rede corporativa, utilize o modo **tunnel** (via ngrok).

1. Instale o pacote global do expo (se ainda não tiver):

   ```bash
   npm install -g expo-cli
   ```

2. Execute o projeto forçando o modo túnel:

   ```bash
   npx expo start --tunnel
   ```

Isso criará uma URL pública acessível via ngrok, contornando a maioria dos bloqueios de rede local.

---

**Alunos:** Rony Amorim dos Reis

**Curso:** Arquitetura de Sistemas Distribuidos

**Professor:** Fernando Pereira

Entrega Individual - Trabalho Prático: App Mobile - Imobly

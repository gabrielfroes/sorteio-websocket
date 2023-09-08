# Sorteio Websocket - Código Fonte TV

Uma aplicação simples de sorteio em tempo real utilizando WebSockets, desenvolvida para a o canal Código Fonte TV no YouTube.

## Descrição

Esta aplicação consiste em duas partes principais:

1. **Admin**: Uma interface para realizar o sorteio e visualizar a quantidade de participantes conectados.
2. **Cliente**: Uma interface para os usuários se conectarem e participarem do sorteio. Quando o sorteio é realizado, a interface do cliente muda de cor e mostra um código se o usuário ganhar.

## Tecnologias Utilizadas

- **Node.js** para o backend.
- **Express** para servir a aplicação web.
- **WebSocket** para comunicação em tempo real entre o servidor e os clientes.

## Configuração e Instalação

### Pré-requisitos

- Node.js e yarn instalados. [Veja como instalar aqui](https://classic.yarnpkg.com/en/docs/install/).

### Passos para configuração

1.**Clonar o Repositório**

```bash
git clone https://github.com/gabrielfroes/sorteio-websocket
cd sorteio-websocket
```

2.**Instalar dependências**

```bash
yarn install
```

3.**Iniciar o Servidor**

```bash
yarn start
```

4.**Configuração do WebSocket**

Para habilitar a comunicação em tempo real, usamos WebSockets. O servidor `server.js` cuida de aceitar conexões de clientes e admin. A lógica de sorteio e comunicação de resultados é tratada aqui.

- `client.js`: Cada cliente conecta-se ao servidor usando WebSockets. Eles recebem atualizações em tempo real quando um sorteio é realizado.
- `admin.js`: A interface do administrador se conecta ao servidor como um cliente especial. A partir daqui, o admin pode iniciar um sorteio.

5.**Estilização e Feedback Visual**

O arquivo `styles.css` fornece a estilização necessária para as páginas do cliente e do admin. Durante e depois de um sorteio, a interface do cliente muda de cor para indicar se ganharam ou perderam. O código de confirmação (para vencedores) é exibido em um estilo que se assemelha a um ticket, com um fundo branco, fonte preta e grossa, e bordas arredondadas.

6.**Feedback Tátil**

Se o dispositivo suportar, ele vibrará após o resultado do sorteio ser anunciado, dando um feedback tátil ao usuário.

7.**Como Executar o Sorteio**

- Abra a página de administração em `http://localhost:3000/admin`.
- Verifique quantos clientes estão conectados através do contador de participantes.
- Clique no botão "Realizar Sorteio" para iniciar o sorteio. Um código de confirmação será gerado.
- Todos os clientes receberão o resultado em tempo real. O vencedor verá o código de confirmação em sua tela.

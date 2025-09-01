## Possiveis Melhorias

- Aumentar a cobertura dos testes (Devido ao tempo realizei apenas alguns testes dos componentes principais);
- Criar tratamento de erros (Criar um modal de error que recebe a mensagem do erro e aparece sempre que vier erro do backend. Devido ao tempo não consegui implementar);

## 🚀 Como Executar

### Pré-requisitos

- Node.js (versão 22)
- pnpm (npm install -g pnpm@latest-10)

### 1. Clonar o repositório

```bash
git clone https://github.com/BrunoPiresXavier/sku-front.git
cd api-sku
```

### 2. Instalar dependências

```bash
pnpm install
```

### 3. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=http://localhost:3000
```

### 4. Iniciar a aplicação

```bash
pnpm run start
```

## 🧪 Como Testar

```bash
pnpm run test:run
```

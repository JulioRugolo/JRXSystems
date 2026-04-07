# JRX Systems — site institucional

Monorepo com **API Node.js + Express + Sequelize + MySQL** (arquitetura MSC) e **frontend React + Vite**. A vitrine de produtos vem do banco: apenas registros com `active = true` na tabela `projects` são expostos em `GET /api/projects`. O formulário de contato grava em `contact_messages`.

## Estrutura

| Pasta        | Descrição                          |
|-------------|-------------------------------------|
| `backend/`  | Express, Sequelize, migrations, seed |
| `frontend/` | React, Vite, site responsivo       |

## Pré-requisitos

- Node.js 18+
- MySQL 8+ (local ou Railway)

## Banco de dados (local)

1. Configure o backend (já existe um `.env` de exemplo; ajuste senha/usuário do MySQL):

```bash
cd backend
cp .env.example .env   # se ainda não tiver .env
# Edite DB_* conforme seu MySQL
npm install
```

2. **Subida automática:** ao rodar `npm run dev` ou `npm start`, o backend:
   - tenta `CREATE DATABASE IF NOT EXISTS` (ligado por padrão com `DB_AUTO_CREATE=true`; desligue com `DB_AUTO_CREATE=false` se não tiver permissão);
   - conecta no Sequelize;
   - executa **`sequelize-cli db:migrate`** (cria/atualiza tabelas). Para desligar no start use `SKIP_DB_MIGRATE=true` (útil se você já roda migrate no *Release* do Railway).

3. Popular projetos iniciais (opcional):

```bash
npm run db:seed
```

4. Suba a API:

```bash
npm run dev
```

A API escuta em `http://localhost:3001` (ou `PORT` do `.env`).

> Se preferir criar o banco manualmente, pode continuar usando `CREATE DATABASE jrxsystems ...` no MySQL; o passo automático apenas evita esse passo quando há permissão.

## Frontend (local)

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Em desenvolvimento, o Vite encaminha `/api` e `/health` para `http://127.0.0.1:3001`. Não é obrigatório definir `VITE_API_URL` no `.env` local.

## Variáveis de ambiente

### Backend (`backend/.env`)

Padrão alinhado aos outros monorepos (`DB_*`, `NODE_ENV`, `PORT`, URLs de frontend/API). Veja também `backend/.env.example` comentado.

| Variável           | Descrição |
|--------------------|-----------|
| `PORT`             | Porta HTTP (Railway injeta `PORT`) |
| `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` | MySQL |
| `DATABASE_URL`     | Opcional — `mysql://user:pass@host:3306/nome_do_banco` (como no torres_veiculos) |
| `MYSQLHOST`, `MYSQLUSER`, … | Alternativa Railway (plugin MySQL) — lidas em `src/config/dbEnv.js` |
| `DB_AUTO_CREATE`   | `true` (padrão): tenta criar o banco se não existir. `false` em ambientes sem permissão |
| `SKIP_DB_MIGRATE`  | `true`: não roda migrations no start (evita duplicar com *Release Command* no Railway) |
| `FRONTEND_ORIGIN`, `FRONTEND_URL`, `FRONTEND_BASE_URL`, `CORS_ORIGIN` | Origem(ns) do site para CORS — várias URLs separadas por vírgula |
| `API_BASE_URL`     | URL pública da API (documentação / uso futuro) |
| `NODE_ENV`         | `production` em deploy |

### Frontend (build)

| Variável         | Descrição |
|------------------|-----------|
| `VITE_API_URL`   | URL pública da API **sem** barra final (ex.: `https://jrxsystems-api.up.railway.app`) |

## Deploy no Railway

Recomenda-se **dois serviços**: um para a API e outro para o frontend estático.

### 1) MySQL

Adicione o plugin **MySQL** ao projeto ou use banco externo. Anote host, porta, usuário, senha e nome do banco.

### 2) Serviço — Backend (Node)

- **Root directory:** `backend`
- **Build:** `npm install` (deixe vazio se só dependências)
- **Start:** `node src/server.js`
- **Release command (opcional):** `npx sequelize-cli db:migrate` — o *start* já roda migrations por padrão; use *Release* se quiser migrar antes do container subir, e então `SKIP_DB_MIGRATE=true` no serviço para não rodar duas vezes
- Variáveis: use as do plugin MySQL (`MYSQLHOST`, `MYSQLUSER`, `MYSQLPASSWORD`, `MYSQLDATABASE`, `MYSQLPORT`) ou equivalentes `DB_*`
- `FRONTEND_ORIGIN`: URL exata do frontend (com `https://`)
- `NODE_ENV=production`

### 3) Serviço — Frontend

- **Root directory:** `frontend`
- **Build:** `npm install && npm run build`
- **Start / publish directory:** servir a pasta `dist` (Railway Static ou Nixpacks com servidor estático)
- Defina **`VITE_API_URL`** nas variáveis de ambiente **antes** do build, apontando para a URL pública do backend

### CORS

Defina `FRONTEND_URL` ou `FRONTEND_ORIGIN` igual à URL do site publicado (com `https://`).

### Seed em produção

Após o primeiro deploy com migrations, execute uma vez (Railway CLI ou console):

```bash
cd backend && npx sequelize-cli db:seed:all
```

Ou insira/atualize projetos manualmente no MySQL (`projects.active` controla visibilidade no site).

## Ocultar um produto na vitrine

No banco, defina `active = 0` (false) na linha correspondente em `projects`. O endpoint público só retorna `active = true`.

## Scripts úteis (backend)

| Comando              | Ação                |
|----------------------|---------------------|
| `npm run db:migrate` | Aplica migrations   |
| `npm run db:seed`    | Roda seeders        |
| `npm run db:seed:undo:all` | Desfaz seeds |

## Endpoints

- `GET /health` — health check
- `GET /api/projects` — lista projetos ativos (público)
- `POST /api/contact` — envio do formulário (público, rate limit)

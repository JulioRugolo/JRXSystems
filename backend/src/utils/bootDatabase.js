const mysql = require('mysql2/promise');
const path = require('path');
const { execFileSync } = require('child_process');
const { getMysqlBase, getMysqlServerOnly } = require('../config/dbEnv');

function isDbNameSafe(name) {
  return typeof name === 'string' && /^[a-zA-Z0-9_-]+$/.test(name);
}

/**
 * CREATE DATABASE IF NOT EXISTS (local / quando o usuário tem permissão).
 * Railway: costuma falhar por permissão — apenas loga aviso e segue se o banco já existir.
 */
async function ensureDatabaseExists() {
  const skip =
    process.env.DB_AUTO_CREATE === '0' || process.env.DB_AUTO_CREATE === 'false';
  if (skip) {
    return;
  }

  const { database } = getMysqlBase();
  if (!isDbNameSafe(database)) {
    console.warn(
      '[db] DB_NAME com caracteres não suportados para criação automática; pulando CREATE DATABASE.'
    );
    return;
  }

  const server = getMysqlServerOnly();
  let conn;
  try {
    conn = await mysql.createConnection(server);
    await conn.query(
      `CREATE DATABASE IF NOT EXISTS \`${database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
    );
    console.log(`[db] Banco \`${database}\` verificado ou criado.`);
  } catch (err) {
    console.warn(
      '[db] Não foi possível criar o banco automaticamente (normal em hospedagens gerenciadas):',
      err.message
    );
  } finally {
    if (conn) {
      await conn.end().catch(() => {});
    }
  }
}

function runMigrations() {
  const skip =
    process.env.SKIP_DB_MIGRATE === '1' ||
    process.env.SKIP_DB_MIGRATE === 'true';
  if (skip) {
    console.log('[db] SKIP_DB_MIGRATE ativo — migrations não rodaram no start.');
    return;
  }

  const backendRoot = path.join(__dirname, '..', '..');
  const cliPath = require.resolve('sequelize-cli/lib/sequelize');
  execFileSync(process.execPath, [cliPath, 'db:migrate'], {
    cwd: backendRoot,
    stdio: 'inherit',
    env: process.env,
  });
  console.log('[db] Migrations aplicadas.');
}

function runSeeders() {
  const skip =
    process.env.SKIP_DB_SEED === '1' ||
    process.env.SKIP_DB_SEED === 'true';
  if (skip) {
    console.log('[db] SKIP_DB_SEED ativo — seeders não rodaram no start.');
    return;
  }

  const backendRoot = path.join(__dirname, '..', '..');
  const cliPath = require.resolve('sequelize-cli/lib/sequelize');
  console.log('[db] Executando seeders...');
  execFileSync(process.execPath, [cliPath, 'db:seed:all'], {
    cwd: backendRoot,
    stdio: 'inherit',
    env: process.env,
  });
  console.log('[db] Seeders aplicados.');
}

/**
 * Ordem: garantir banco → autenticar Sequelize → sequelize-cli db:migrate (tabelas) → seeders (dados iniciais).
 */
async function prepareDatabase(sequelize) {
  await ensureDatabaseExists();
  await sequelize.authenticate();
  runMigrations();
  runSeeders();
}

module.exports = {
  prepareDatabase,
  ensureDatabaseExists,
  runMigrations,
  runSeeders,
};

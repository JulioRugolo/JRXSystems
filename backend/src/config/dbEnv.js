require('dotenv').config();

function parseDatabaseUrl(raw) {
  if (!raw || !String(raw).trim()) return null;
  try {
    const u = new URL(String(raw).trim());
    const database = u.pathname.replace(/^\//, '').split('?')[0];
    if (!database) return null;
    return {
      host: u.hostname,
      port: u.port ? Number(u.port) : 3306,
      username: u.username ? decodeURIComponent(u.username) : 'root',
      password: u.password ? decodeURIComponent(u.password) : '',
      database,
    };
  } catch {
    return null;
  }
}

/**
 * Credenciais MySQL unificadas (DB_* / MYSQL* / DATABASE_URL), no mesmo espírito dos outros monorepos.
 */
function getMysqlBase() {
  const parsed = parseDatabaseUrl(process.env.DATABASE_URL);

  const username =
    process.env.DB_USER || process.env.MYSQLUSER || parsed?.username || 'root';
  const password =
    process.env.DB_PASSWORD !== undefined
      ? process.env.DB_PASSWORD
      : process.env.MYSQLPASSWORD !== undefined
        ? process.env.MYSQLPASSWORD
        : (parsed?.password ?? '');
  const database =
    process.env.DB_NAME || process.env.MYSQLDATABASE || parsed?.database || 'jrxsystems';
  const host =
    process.env.DB_HOST || process.env.MYSQLHOST || parsed?.host || '127.0.0.1';
  const port = Number(
    process.env.DB_PORT || process.env.MYSQLPORT || parsed?.port || 3306
  );

  return { username, password, database, host, port };
}

/** Conexão ao servidor MySQL sem selecionar o banco (para CREATE DATABASE). */
function getMysqlServerOnly() {
  const { username, password, host, port } = getMysqlBase();
  return { user: username, password, host, port };
}

module.exports = {
  parseDatabaseUrl,
  getMysqlBase,
  getMysqlServerOnly,
};

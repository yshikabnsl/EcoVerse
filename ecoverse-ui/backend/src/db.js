const oracledb = require("oracledb");

let pool;
let oracleClientInitialized = false;

function initOracleClientIfConfigured() {
  if (oracleClientInitialized) {
    return;
  }
  try {
    const libDir = process.env.ORACLE_CLIENT_LIB_DIR;
    if (libDir) {
      oracledb.initOracleClient({ libDir });
    } else {
      oracledb.initOracleClient();
    }
    oracleClientInitialized = true;
    console.log("Oracle client initialized in Thick mode.");
  } catch (error) {
    if (error.message && error.message.includes("NJS-077")) {
      oracleClientInitialized = true;
      return;
    }
    console.warn("Oracle client initialization skipped:", error.message);
  }
}

function getPoolConfig() {
  return {
    user: process.env.ORACLE_USER,
    password: process.env.ORACLE_PASSWORD,
    connectString: process.env.ORACLE_CONNECT_STRING,
    poolMin: Number(process.env.ORACLE_POOL_MIN || 1),
    poolMax: Number(process.env.ORACLE_POOL_MAX || 5),
    poolIncrement: Number(process.env.ORACLE_POOL_INCREMENT || 1),
  };
}

function validateConfig() {
  const required = ["ORACLE_USER", "ORACLE_PASSWORD", "ORACLE_CONNECT_STRING"];
  const missing = required.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(`Missing Oracle env vars: ${missing.join(", ")}`);
  }
}

async function initDb() {
  if (pool) {
    return pool;
  }
  validateConfig();
  initOracleClientIfConfigured();
  pool = await oracledb.createPool(getPoolConfig());
  return pool;
}

function getDb() {
  if (!pool) {
    throw new Error("Oracle pool not initialized. Call initDb() first.");
  }
  return pool;
}

async function withConnection(run) {
  const connection = await getDb().getConnection();
  try {
    return await run(connection);
  } finally {
    await connection.close();
  }
}

async function closeDb() {
  if (!pool) {
    return;
  }
  await pool.close(10);
  pool = undefined;
}

module.exports = {
  initDb,
  closeDb,
  withConnection,
};

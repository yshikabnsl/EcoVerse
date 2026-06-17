const oracledb = require("oracledb");
const { withConnection } = require("./db");

const graphData = {
  DEPOT: { A: 3, B: 5, C: 8 },
  A: { DEPOT: 3, B: 2, D: 6 },
  B: { DEPOT: 5, A: 2, D: 2, E: 3 },
  C: { DEPOT: 8, E: 2 },
  D: { A: 6, B: 2, E: 1, F: 4 },
  E: { B: 3, C: 2, D: 1, F: 2 },
  F: { D: 4, E: 2 },
};

async function addUser({ name, email, password }) {
  return withConnection(async (connection) => {
    const result = await connection.execute(
      `INSERT INTO users (name, email, password_hash)
       VALUES (:name, :email, :password)
       RETURNING id INTO :id`,
      {
        name,
        email: email.toLowerCase(),
        password,
        id: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 64 },
      },
      { autoCommit: true },
    );
    return {
      id: result.outBinds.id[0],
      name,
      email: email.toLowerCase(),
      points: 0,
      wasteClassified: 0,
      pickupsCompleted: 0,
      co2SavedKg: 0,
    };
  });
}

async function findUserByEmail(email) {
  return withConnection(async (connection) => {
    const result = await connection.execute(
      `SELECT id, name, email, password_hash, points, waste_classified, pickups_completed, co2_saved_kg
       FROM users
       WHERE email = :email`,
      { email: email.toLowerCase() },
      { outFormat: oracledb.OUT_FORMAT_OBJECT },
    );
    if (result.rows.length === 0) {
      return null;
    }
    const user = result.rows[0];
    return {
      id: user.ID,
      name: user.NAME,
      email: user.EMAIL,
      password: user.PASSWORD_HASH,
      points: user.POINTS,
      wasteClassified: user.WASTE_CLASSIFIED,
      pickupsCompleted: user.PICKUPS_COMPLETED,
      co2SavedKg: user.CO2_SAVED_KG,
    };
  });
}

async function getUserById(userId) {
  return withConnection(async (connection) => {
    const result = await connection.execute(
      `SELECT id, name, email, password_hash, points, waste_classified, pickups_completed, co2_saved_kg
       FROM users
       WHERE id = :userId`,
      { userId },
      { outFormat: oracledb.OUT_FORMAT_OBJECT },
    );
    if (result.rows.length === 0) {
      return null;
    }
    const user = result.rows[0];
    return {
      id: user.ID,
      name: user.NAME,
      email: user.EMAIL,
      password: user.PASSWORD_HASH,
      points: user.POINTS,
      wasteClassified: user.WASTE_CLASSIFIED,
      pickupsCompleted: user.PICKUPS_COMPLETED,
      co2SavedKg: user.CO2_SAVED_KG,
    };
  });
}

async function addClassification(entry) {
  return withConnection(async (connection) => {
    const insertResult = await connection.execute(
      `INSERT INTO classifications (user_id, type, confidence, original_name)
       VALUES (:userId, :type, :confidence, :originalName)
       RETURNING id, created_at INTO :id, :createdAt`,
      {
        userId: entry.userId,
        type: entry.type,
        confidence: entry.confidence,
        originalName: entry.originalName,
        id: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 64 },
        createdAt: { dir: oracledb.BIND_OUT, type: oracledb.DATE },
      },
    );

    await connection.execute(
      `UPDATE users
       SET waste_classified = waste_classified + 1,
           points = points + 10,
           co2_saved_kg = co2_saved_kg + 0.4
       WHERE id = :userId`,
      { userId: entry.userId },
    );

    await connection.commit();

    return {
      id: insertResult.outBinds.id[0],
      userId: entry.userId,
      type: entry.type,
      confidence: entry.confidence,
      originalName: entry.originalName,
      createdAt: new Date(insertResult.outBinds.createdAt[0]).toISOString(),
    };
  });
}

async function getClassificationsForUser(userId) {
  return withConnection(async (connection) => {
    const result = await connection.execute(
      `SELECT id, user_id, type, confidence, original_name, created_at
       FROM classifications
       WHERE user_id = :userId
       ORDER BY created_at DESC
       FETCH FIRST 10 ROWS ONLY`,
      { userId },
      { outFormat: oracledb.OUT_FORMAT_OBJECT },
    );
    return result.rows.map((row) => ({
      id: row.ID,
      userId: row.USER_ID,
      type: row.TYPE,
      confidence: row.CONFIDENCE,
      originalName: row.ORIGINAL_NAME,
      createdAt: new Date(row.CREATED_AT).toISOString(),
    }));
  });
}

async function addPickup(data) {
  return withConnection(async (connection) => {
    const result = await connection.execute(
      `INSERT INTO pickups (user_id, pickup_date, pickup_time, type, address, status)
       VALUES (:userId, :pickupDate, :pickupTime, :type, :address, 'scheduled')
       RETURNING id, created_at INTO :id, :createdAt`,
      {
        userId: data.userId,
        pickupDate: data.date,
        pickupTime: data.time,
        type: data.type,
        address: data.address,
        id: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 64 },
        createdAt: { dir: oracledb.BIND_OUT, type: oracledb.DATE },
      },
      { autoCommit: true },
    );

    return {
      id: result.outBinds.id[0],
      userId: data.userId,
      date: data.date,
      time: data.time,
      type: data.type,
      address: data.address,
      status: "scheduled",
      createdAt: new Date(result.outBinds.createdAt[0]).toISOString(),
    };
  });
}

async function getPickupsForUser(userId) {
  return withConnection(async (connection) => {
    const result = await connection.execute(
      `SELECT id, user_id, pickup_date, pickup_time, type, address, status, created_at
       FROM pickups
       WHERE user_id = :userId
       ORDER BY created_at DESC`,
      { userId },
      { outFormat: oracledb.OUT_FORMAT_OBJECT },
    );

    return result.rows.map((row) => ({
      id: row.ID,
      userId: row.USER_ID,
      date: row.PICKUP_DATE,
      time: row.PICKUP_TIME,
      type: row.TYPE,
      address: row.ADDRESS,
      status: row.STATUS,
      createdAt: new Date(row.CREATED_AT).toISOString(),
    }));
  });
}

async function updatePickupStatus(id, userId, status) {
  return withConnection(async (connection) => {
    const currentResult = await connection.execute(
      `SELECT status FROM pickups WHERE id = :id AND user_id = :userId`,
      { id, userId },
      { outFormat: oracledb.OUT_FORMAT_OBJECT },
    );
    if (currentResult.rows.length === 0) {
      return null;
    }
    const wasCompleted = currentResult.rows[0].STATUS === "completed";

    await connection.execute(
      `UPDATE pickups SET status = :status WHERE id = :id AND user_id = :userId`,
      { status, id, userId },
    );

    if (!wasCompleted && status === "completed") {
      await connection.execute(
        `UPDATE users
         SET pickups_completed = pickups_completed + 1,
             points = points + 25,
             co2_saved_kg = co2_saved_kg + 0.8
         WHERE id = :userId`,
        { userId },
      );
    }
    await connection.commit();

    const result = await connection.execute(
      `SELECT id, user_id, pickup_date, pickup_time, type, address, status, created_at
       FROM pickups
       WHERE id = :id AND user_id = :userId`,
      { id, userId },
      { outFormat: oracledb.OUT_FORMAT_OBJECT },
    );
    if (result.rows.length === 0) {
      return null;
    }
    const row = result.rows[0];
    return {
      id: row.ID,
      userId: row.USER_ID,
      date: row.PICKUP_DATE,
      time: row.PICKUP_TIME,
      type: row.TYPE,
      address: row.ADDRESS,
      status: row.STATUS,
      createdAt: new Date(row.CREATED_AT).toISOString(),
    };
  });
}

async function addRewardEvent(userId, action, points) {
  return withConnection((connection) =>
    connection.execute(
      `INSERT INTO reward_history (user_id, action, points, event_date)
       VALUES (:userId, :action, :points, TRUNC(SYSDATE))`,
      { userId, action, points },
      { autoCommit: true },
    ),
  );
}

async function getRewardHistoryForUser(userId) {
  return withConnection(async (connection) => {
    const result = await connection.execute(
      `SELECT id, user_id, action, points, TO_CHAR(event_date, 'YYYY-MM-DD') AS event_date
       FROM reward_history
       WHERE user_id = :userId
       ORDER BY created_at DESC
       FETCH FIRST 30 ROWS ONLY`,
      { userId },
      { outFormat: oracledb.OUT_FORMAT_OBJECT },
    );
    return result.rows.map((row) => ({
      id: row.ID,
      userId: row.USER_ID,
      action: row.ACTION,
      points: row.POINTS,
      date: row.EVENT_DATE,
    }));
  });
}

async function getRewardCatalog() {
  return withConnection(async (connection) => {
    const result = await connection.execute(
      `SELECT id, name, cost, icon
       FROM reward_catalog
       ORDER BY display_order`,
      {},
      { outFormat: oracledb.OUT_FORMAT_OBJECT },
    );
    return result.rows.map((row) => ({
      id: row.ID,
      name: row.NAME,
      cost: row.COST,
      icon: row.ICON,
    }));
  });
}

async function redeemReward(userId, rewardId) {
  return withConnection(async (connection) => {
    const rewardResult = await connection.execute(
      `SELECT id, name, cost, icon
       FROM reward_catalog
       WHERE id = :rewardId`,
      { rewardId },
      { outFormat: oracledb.OUT_FORMAT_OBJECT },
    );
    if (rewardResult.rows.length === 0) {
      return { ok: false, message: "Invalid user or reward" };
    }
    const reward = rewardResult.rows[0];

    const userResult = await connection.execute(
      `SELECT id, points FROM users WHERE id = :userId`,
      { userId },
      { outFormat: oracledb.OUT_FORMAT_OBJECT },
    );
    if (userResult.rows.length === 0) {
      return { ok: false, message: "Invalid user or reward" };
    }

    const currentPoints = userResult.rows[0].POINTS;
    if (currentPoints < reward.COST) {
      return { ok: false, message: "Not enough points" };
    }

    const updatedPoints = currentPoints - reward.COST;

    await connection.execute(
      `UPDATE users SET points = :updatedPoints WHERE id = :userId`,
      { updatedPoints, userId },
    );
    await connection.execute(
      `INSERT INTO reward_history (user_id, action, points, event_date)
       VALUES (:userId, :action, :points, TRUNC(SYSDATE))`,
      {
        userId,
        action: `Redeemed ${reward.NAME}`,
        points: -reward.COST,
      },
    );
    await connection.commit();

    return {
      ok: true,
      points: updatedPoints,
      reward: {
        id: reward.ID,
        name: reward.NAME,
        cost: reward.COST,
        icon: reward.ICON,
      },
    };
  });
}

function getGraphData() {
  return graphData;
}

module.exports = {
  addUser,
  findUserByEmail,
  getUserById,
  addClassification,
  getClassificationsForUser,
  addPickup,
  getPickupsForUser,
  updatePickupStatus,
  getRewardCatalog,
  addRewardEvent,
  getRewardHistoryForUser,
  redeemReward,
  getGraphData,
};

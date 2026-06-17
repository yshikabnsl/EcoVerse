require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {
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
} = require("./src/store");
const { initDb, closeDb } = require("./src/db");
const { classifyWaste } = require("./src/wasteClassifier");
const { shortestPathBetween } = require("./src/dijkstra");

const app = express();
const upload = multer({ storage: multer.memoryStorage() });
const PORT = Number(process.env.PORT || 4000);
const JWT_SECRET = process.env.JWT_SECRET || "ecoverse-dev-secret";
const BCRYPT_ROUNDS = Number(process.env.BCRYPT_ROUNDS || 10);

app.use(cors());
app.use(express.json({ limit: "4mb" }));

function auth(req, res, next) {
  const rawHeader = req.headers.authorization || "";
  const token = rawHeader.startsWith("Bearer ") ? rawHeader.slice(7) : "";
  if (!token) {
    return res.status(401).json({ message: "Missing token" });
  }
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.userId = payload.userId;
    return next();
  } catch (_error) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "ecoverse-backend" });
});

app.post("/auth/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "name, email and password are required" });
  }
  if (await findUserByEmail(email)) {
    return res.status(409).json({ message: "User already exists" });
  }
  const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);
  const user = await addUser({ name, email, password: passwordHash });
  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" });
  return res.status(201).json({
    token,
    user: { id: user.id, name: user.name, email: user.email, points: user.points },
  });
});

app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "email and password are required" });
  }
  const user = await findUserByEmail(email);
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" });
  return res.json({
    token,
    user: { id: user.id, name: user.name, email: user.email, points: user.points },
  });
});

app.get("/me", auth, async (req, res) => {
  const user = await getUserById(req.userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    points: user.points,
    wasteClassified: user.wasteClassified,
    pickupsCompleted: user.pickupsCompleted,
    co2SavedKg: user.co2SavedKg,
  });
});

app.post("/upload-image", auth, upload.single("image"), async (req, res) => {
  const user = await getUserById(req.userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  if (!req.file) {
    return res.status(400).json({ message: "image is required" });
  }
  const result = classifyWaste(req.file.originalname, req.file.mimetype, req.file.size);
  await addClassification({
    userId: user.id,
    type: result.type,
    confidence: result.confidence,
    originalName: req.file.originalname,
  });
  await addRewardEvent(user.id, `Waste classification (${result.type})`, 10);
  return res.status(201).json({ ...result, pointsEarned: 10 });
});

app.get("/classifications", auth, async (req, res) => {
  return res.json(await getClassificationsForUser(req.userId));
});

app.get("/pickup", auth, async (req, res) => {
  return res.json(await getPickupsForUser(req.userId));
});

app.post("/pickup", auth, async (req, res) => {
  const { date, time, type, address } = req.body;
  if (!date || !time || !type || !address) {
    return res.status(400).json({ message: "date, time, type, address are required" });
  }
  const pickup = await addPickup({ userId: req.userId, date, time, type, address });
  return res.status(201).json(pickup);
});

app.patch("/pickup/:id/status", auth, async (req, res) => {
  const { status } = req.body;
  if (!status) {
    return res.status(400).json({ message: "status is required" });
  }
  const updated = await updatePickupStatus(req.params.id, req.userId, status);
  if (!updated) {
    return res.status(404).json({ message: "Pickup not found" });
  }
  if (status === "completed") {
    await addRewardEvent(req.userId, "Scheduled pickup completed", 25);
  }
  return res.json(updated);
});

app.get("/rewards", auth, async (req, res) => {
  const user = await getUserById(req.userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.json({
    points: user.points,
    catalog: await getRewardCatalog(),
    history: await getRewardHistoryForUser(user.id),
  });
});

app.post("/rewards/redeem", auth, async (req, res) => {
  const { rewardId } = req.body;
  if (!rewardId) {
    return res.status(400).json({ message: "rewardId is required" });
  }
  const result = await redeemReward(req.userId, rewardId);
  if (!result.ok) {
    return res.status(400).json({ message: result.message });
  }
  return res.json(result);
});

app.get("/get-route", auth, (req, res) => {
  const graph = getGraphData();
  const source = typeof req.query.source === "string" ? req.query.source : "DEPOT";
  const target = typeof req.query.target === "string" ? req.query.target : "C";
  const route = shortestPathBetween(graph, source, target);
  if (!route) {
    return res.status(404).json({ message: "No route found" });
  }
  return res.json(route);
});

app.use((error, _req, res, _next) => {
  console.error("Unhandled API error:", error);
  return res.status(500).json({ message: "Internal server error", detail: error.message });
});

async function startServer() {
  try {
    await initDb();
    app.listen(PORT, () => {
      console.log(`EcoVerse backend running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start backend:", error.message);
    process.exit(1);
  }
}

async function shutdown() {
  try {
    await closeDb();
  } catch (error) {
    console.error("Failed to close Oracle pool:", error.message);
  } finally {
    process.exit(0);
  }
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

startServer();

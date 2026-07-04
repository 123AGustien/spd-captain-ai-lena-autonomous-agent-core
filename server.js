import express from "express";
import { runSPDCore } from "./spd_engine_core.js";

const app = express();
app.use(express.json());

// STORAGE (temporary memory layer)
let latestState = null;

// CLIENT INPUT ENDPOINT
app.post("/state", (req, res) => {

  const state = req.body;

  if (!state) {
    return res.status(400).json({ error: "No state provided" });
  }

  latestState = state;

  const result = runSPDCore(state);

  res.json({
    status: "PROCESSED",
    result
  });
});

// GET CURRENT STATE (for cockpit)
app.get("/state", (req, res) => {
  res.json({
    latestState
  });
});

// HEALTH CHECK
app.get("/", (req, res) => {
  res.send("SPD Captain AI Lena API Running");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`SPD API running on http://localhost:${PORT}`);
});
const functions = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");

admin.initializeApp();
const db = admin.firestore();

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

const router = express.Router();

// GET /api/pages?uid=xxx
router.get("/pages", async (req, res) => {
  const uid = req.query.uid;
  if (!uid) {
    return res.status(400).json({ error: "uid is required" });
  }

  try {
    const snapshot = await db
      .collection("pages")
      .where("uid", "==", uid)
      .get();
    const pages = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json({ pages });
  } catch (error) {
    console.error("Error fetching pages:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST /api/pages
router.post("/pages", async (req, res) => {
  const { uid, title, category = "", meta = {}, tags = [] } = req.body || {};
  if (!uid || !title) {
    return res.status(400).json({ error: "uid and title are required" });
  }

  try {
    const docRef = await db.collection("pages").add({
      uid,
      title,
      category,
      meta,
      tags,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    res.json({ id: docRef.id });
  } catch (error) {
    console.error("Error adding page:", error);
    res.status(500).json({ error: "Internal Server Error" });

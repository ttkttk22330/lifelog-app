// functions-v2/index.js
const functions = require("firebase-functions/v2");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });

admin.initializeApp();
const db = admin.firestore();

exports.listPages = functions.https.onRequest(
  {
    region: "asia-northeast1" // ← ここを明示
  },
  async (req, res) => {
    cors(req, res, async () => {
      const uid = req.query.uid;
      if (!uid) {
        return res.status(400).json({ error: "uid is required" });
      }

      try {
        const snapshot = await db
          .collection("pages")
          .where("uid", "==", uid)
          .get();

        const pages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        return res.json({ pages });
      } catch (error) {
        console.error("Error fetching pages:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    });
  }
);

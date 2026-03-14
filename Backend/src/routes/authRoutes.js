const express = require("express");
const { authenticateToken } = require("../middleware/auth");
const { query } = require("../config/db");

const router = express.Router();

router.get("/me", authenticateToken, async (req, res, next) => {
  try {
    const rows = await query(
      "SELECT id, name, email, role_id, status FROM users WHERE id = ? LIMIT 1",
      [req.user?.id || null]
    );
    if (!rows.length) {
      return res.status(404).json({ success: false, error: "User not found" });
    }
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

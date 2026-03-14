const { query } = require("../config/db");

async function resolveLanguage(langCode) {
  const requested = (langCode || "").trim().toLowerCase();
  if (requested) {
    const rows = await query(
      "SELECT id, code FROM languages WHERE code = ? AND is_active = TRUE LIMIT 1",
      [requested]
    );
    if (rows.length > 0) return rows[0];
  }

  const defaults = await query(
    "SELECT id, code FROM languages WHERE is_default = TRUE AND is_active = TRUE LIMIT 1"
  );
  if (defaults.length > 0) return defaults[0];

  const fallback = await query(
    "SELECT id, code FROM languages WHERE is_active = TRUE ORDER BY id ASC LIMIT 1"
  );
  if (fallback.length > 0) return fallback[0];

  throw new Error("No active language found. Seed languages table first.");
}

module.exports = { resolveLanguage };

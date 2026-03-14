const { query } = require("../config/db");

function assignNested(target, dottedKey, value) {
  const parts = dottedKey.split(".");
  let cursor = target;
  for (let i = 0; i < parts.length; i += 1) {
    const part = parts[i];
    if (i === parts.length - 1) {
      cursor[part] = value;
      return;
    }
    if (!cursor[part] || typeof cursor[part] !== "object" || Array.isArray(cursor[part])) {
      cursor[part] = {};
    }
    cursor = cursor[part];
  }
}

function parseUiValue(valueType, rawValue) {
  if (valueType === "json") {
    try {
      return JSON.parse(rawValue);
    } catch {
      return null;
    }
  }
  return rawValue;
}

async function getUiTextMap(languageId) {
  const rows = await query(
    `SELECT translation_key, translation_value, value_type
     FROM ui_translations
     WHERE language_id = ?
     ORDER BY translation_key ASC`,
    [languageId]
  );

  const result = {};
  rows.forEach((row) => {
    assignNested(result, row.translation_key, parseUiValue(row.value_type, row.translation_value));
  });
  return result;
}

module.exports = { getUiTextMap };

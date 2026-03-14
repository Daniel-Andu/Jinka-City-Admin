const { query } = require('../config/db');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// File upload setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

const SAFE_COLUMN = /^[a-zA-Z0-9_]+$/;

function slugify(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function getDefaultLanguageId() {
  const defaults = await query(
    "SELECT id FROM languages WHERE is_default = TRUE AND is_active = TRUE LIMIT 1"
  );
  if (defaults.length > 0) return defaults[0].id;

  const fallback = await query(
    "SELECT id FROM languages WHERE is_active = TRUE ORDER BY id ASC LIMIT 1"
  );
  if (fallback.length > 0) return fallback[0].id;

  return null;
}

async function resolveLanguageId(languageId) {
  if (languageId !== undefined && languageId !== null && languageId !== "") {
    return Number(languageId);
  }
  return await getDefaultLanguageId();
}

async function upsertTranslation(table, keyFields, dataFields) {
  const entries = Object.entries(dataFields || {}).filter(
    ([, value]) => value !== undefined
  );
  if (!entries.length) {
    return false;
  }

  const columns = [
    ...Object.keys(keyFields),
    ...entries.map(([key]) => key),
  ];
  const placeholders = columns.map(() => "?").join(", ");
  const updates = entries
    .map(([key]) => `\`${key}\` = VALUES(\`${key}\`)`)
    .join(", ");
  const values = [
    ...Object.values(keyFields),
    ...entries.map(([, value]) => value),
  ];

  await query(
    `INSERT INTO ${table} (${columns.map((col) => `\`${col}\``).join(", ")})
     VALUES (${placeholders})
     ON DUPLICATE KEY UPDATE ${updates}`,
    values
  );
  return true;
}

function buildUpdateStatement(table, updates) {
  const entries = Object.entries(updates || {}).filter(
    ([key, value]) => key !== "id" && value !== undefined && SAFE_COLUMN.test(key)
  );

  if (!entries.length) {
    return null;
  }

  const setClause = entries.map(([key]) => `\`${key}\` = ?`).join(", ");
  const values = entries.map(([, value]) => value);

  return { sql: `UPDATE ${table} SET ${setClause} WHERE id = ?`, values };
}

async function updateById(table, id, updates) {
  if (id === undefined || id === null) {
    return false;
  }
  const stmt = buildUpdateStatement(table, updates);
  if (!stmt) {
    return false;
  }
  await query(stmt.sql, [...stmt.values, id]);
  return true;
}

// Auth
async function login(req, res, next) {
  // Already in authController, but for admin
  const authController = require('./authController');
  return authController.login(req, res, next);
}

// Settings
async function getSettings(req, res, next) {
  try {
    const settings = await query('SELECT * FROM settings');
    res.json(settings);
  } catch (err) {
    next(err);
  }
}

async function updateSettings(req, res, next) {
  try {
    const { id, ...updates } = req.body;
    const updated = await updateById('settings', id, updates);
    if (!updated) {
      return res.status(400).json({ error: 'No valid fields to update' });
    }
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}

// Languages
async function getLanguages(req, res, next) {
  try {
    const languages = await query('SELECT * FROM languages');
    res.json(languages);
  } catch (err) {
    next(err);
  }
}

async function createLanguage(req, res, next) {
  try {
    const { code, name, is_default, is_active } = req.body;
    await query('INSERT INTO languages (code, name, is_default, is_active) VALUES (?, ?, ?, ?)', [code, name, is_default, is_active]);
    res.status(201).json({ success: true });
  } catch (err) {
    next(err);
  }
}

async function updateLanguage(req, res, next) {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updated = await updateById('languages', id, updates);
    if (!updated) {
      return res.status(400).json({ error: 'No valid fields to update' });
    }
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}

async function deleteLanguage(req, res, next) {
  try {
    const { id } = req.params;
    await query('DELETE FROM languages WHERE id = ?', [id]);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}

// UI Translations
async function getUiTranslations(req, res, next) {
  try {
    const translations = await query('SELECT * FROM ui_translations');
    res.json(translations);
  } catch (err) {
    next(err);
  }
}

async function createUiTranslation(req, res, next) {
  try {
    const { language_id, translation_key, translation_value, value_type } = req.body;
    const result = await query('INSERT INTO ui_translations (language_id, translation_key, translation_value, value_type) VALUES (?, ?, ?, ?)', [language_id, translation_key, translation_value, value_type]);

    // Get the created translation
    const [created] = await query('SELECT * FROM ui_translations WHERE id = ?', [result.insertId]);

    res.status(201).json({ success: true, data: created });
  } catch (err) {
    next(err);
  }
}

async function updateUiTranslation(req, res, next) {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updated = await updateById('ui_translations', id, updates);
    if (!updated) {
      return res.status(400).json({ error: 'No valid fields to update' });
    }
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}

async function deleteUiTranslation(req, res, next) {
  try {
    const { id } = req.params;
    await query('DELETE FROM ui_translations WHERE id = ?', [id]);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}

// Hero Sliders
async function getHeroSliders(req, res, next) {
  try {
    const sliders = await query('SELECT * FROM hero_sliders');
    res.json(sliders);
  } catch (err) {
    next(err);
  }
}

async function createHeroSlider(req, res, next) {
  try {
    const { title, subtitle, button_text, button_link, image, is_active } = req.body || {};
    const result = await query(
      'INSERT INTO hero_sliders (title, subtitle, button_text, button_link, image, is_active) VALUES (?, ?, ?, ?, ?, ?)',
      [
        title || null,
        subtitle || null,
        button_text || null,
        button_link || null,
        image || null,
        is_active !== undefined ? is_active : true
      ]
    );
    res.status(201).json({ success: true, id: result.insertId });
  } catch (err) {
    next(err);
  }
}

async function updateHeroSlider(req, res, next) {
  try {
    const { id } = req.params;
    const allowed = ['title', 'subtitle', 'button_text', 'button_link', 'image', 'is_active'];
    const updates = {};
    allowed.forEach((key) => {
      if (req.body && req.body[key] !== undefined) {
        updates[key] = req.body[key];
      }
    });
    const updated = await updateById('hero_sliders', id, updates);
    if (!updated) {
      return res.status(400).json({ error: 'No valid fields to update' });
    }
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}

async function deleteHeroSlider(req, res, next) {
  try {
    const { id } = req.params;
    await query('DELETE FROM hero_sliders WHERE id = ?', [id]);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}

// Hero Slider Translations
async function getHeroSliderTranslations(req, res, next) {
  try {
    const { slider_id, language_id } = req.query;
    let sql = 'SELECT * FROM hero_slider_translations';
    const params = [];

    if (slider_id || language_id) {
      const conditions = [];
      if (slider_id) {
        conditions.push('slider_id = ?');
        params.push(slider_id);
      }
      if (language_id) {
        conditions.push('language_id = ?');
        params.push(language_id);
      }
      sql += ` WHERE ${conditions.join(' AND ')}`;
    }

    const rows = await query(sql, params);
    res.json(rows);
  } catch (err) {
    next(err);
  }
}

async function createHeroSliderTranslation(req, res, next) {
  try {
    const { slider_id, language_id, title, subtitle, button_text } = req.body;
    await query(
      'INSERT INTO hero_slider_translations (slider_id, language_id, title, subtitle, button_text) VALUES (?, ?, ?, ?, ?)',
      [slider_id, language_id, title, subtitle, button_text]
    );
    res.status(201).json({ success: true });
  } catch (err) {
    next(err);
  }
}

async function updateHeroSliderTranslation(req, res, next) {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updated = await updateById('hero_slider_translations', id, updates);
    if (!updated) {
      return res.status(400).json({ error: 'No valid fields to update' });
    }
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}

async function deleteHeroSliderTranslation(req, res, next) {
  try {
    const { id } = req.params;
    await query('DELETE FROM hero_slider_translations WHERE id = ?', [id]);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}

// Page Hero Slides
async function getPageHeroSlides(req, res, next) {
  try {
    const { page_slug, slider_id } = req.query;
    if (page_slug || slider_id) {
      const conditions = [];
      const params = [];
      if (page_slug) {
        conditions.push('page_slug = ?');
        params.push(page_slug);
      }
      if (slider_id) {
        conditions.push('slider_id = ?');
        params.push(slider_id);
      }
      const rows = await query(
        `SELECT * FROM page_hero_slides WHERE ${conditions.join(' AND ')} ORDER BY order_number ASC, id ASC`,
        params
      );
      return res.json(rows);
    }
    const rows = await query('SELECT * FROM page_hero_slides ORDER BY page_slug ASC, order_number ASC, id ASC');
    res.json(rows);
  } catch (err) {
    next(err);
  }
}

async function createPageHeroSlide(req, res, next) {
  try {
    const { page_slug, slider_id, order_number, is_active } = req.body;
    await query(
      'INSERT INTO page_hero_slides (page_slug, slider_id, order_number, is_active) VALUES (?, ?, ?, ?)',
      [page_slug, slider_id, order_number || 0, is_active !== undefined ? is_active : true]
    );
    res.status(201).json({ success: true });
  } catch (err) {
    next(err);
  }
}

async function updatePageHeroSlide(req, res, next) {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updated = await updateById('page_hero_slides', id, updates);
    if (!updated) {
      return res.status(400).json({ error: 'No valid fields to update' });
    }
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}

async function deletePageHeroSlide(req, res, next) {
  try {
    const { id } = req.params;
    await query('DELETE FROM page_hero_slides WHERE id = ?', [id]);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}

// Leaders / Mayor
async function getLeaders(req, res, next) {
  try {
    const leaders = await query('SELECT * FROM leaders ORDER BY order_number ASC, id ASC');
    res.json(leaders);
  } catch (err) {
    next(err);
  }
}

async function createLeader(req, res, next) {
  try {
    const { name, position, photo, message, order_number } = req.body;
    const result = await query(
      'INSERT INTO leaders (name, position, photo, message, order_number) VALUES (?, ?, ?, ?, ?)',
      [name, position, photo, message, order_number || 0]
    );

    // Get the created leader
    const [created] = await query('SELECT * FROM leaders WHERE id = ?', [result.insertId]);

    res.status(201).json({ success: true, data: created });
  } catch (err) {
    next(err);
  }
}

async function updateLeader(req, res, next) {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updated = await updateById('leaders', id, updates);
    if (!updated) {
      return res.status(400).json({ error: 'No valid fields to update' });
    }

    // Get the updated leader
    const [updatedData] = await query('SELECT * FROM leaders WHERE id = ?', [id]);

    res.json({ success: true, data: updatedData });
  } catch (err) {
    next(err);
  }
}

async function deleteLeader(req, res, next) {
  try {
    const { id } = req.params;

    // Start transaction for safe deletion
    await query('START TRANSACTION');

    try {
      // Delete dependent translations first
      await query('DELETE FROM leader_translations WHERE leader_id = ?', [id]);

      // Delete leader
      await query('DELETE FROM leaders WHERE id = ?', [id]);

      // Commit transaction
      await query('COMMIT');

      res.json({ success: true, message: 'Leader deleted successfully' });
    } catch (innerErr) {
      // Rollback on error
      await query('ROLLBACK');
      throw innerErr;
    }
  } catch (err) {
    next(err);
  }
}

// Leader Translations
async function getLeaderTranslations(req, res, next) {
  try {
    const { leader_id, language_id } = req.query;
    let sql = 'SELECT * FROM leader_translations';
    const params = [];

    if (leader_id || language_id) {
      const conditions = [];
      if (leader_id) {
        conditions.push('leader_id = ?');
        params.push(leader_id);
      }
      if (language_id) {
        conditions.push('language_id = ?');
        params.push(language_id);
      }
      sql += ` WHERE ${conditions.join(' AND ')}`;
    }

    const rows = await query(sql, params);
    res.json(rows);
  } catch (err) {
    next(err);
  }
}

async function createLeaderTranslation(req, res, next) {
  try {
    const { leader_id, language_id, name, position, message } = req.body;
    await query(
      'INSERT INTO leader_translations (leader_id, language_id, name, position, message) VALUES (?, ?, ?, ?, ?)',
      [leader_id, language_id, name, position, message]
    );
    res.status(201).json({ success: true });
  } catch (err) {
    next(err);
  }
}

async function updateLeaderTranslation(req, res, next) {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updated = await updateById('leader_translations', id, updates);
    if (!updated) {
      return res.status(400).json({ error: 'No valid fields to update' });
    }
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}

async function deleteLeaderTranslation(req, res, next) {
  try {
    const { id } = req.params;
    await query('DELETE FROM leader_translations WHERE id = ?', [id]);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}

// City Stats
async function getCityStats(req, res, next) {
  try {
    const stats = await query('SELECT * FROM city_stats ORDER BY order_number');
    res.json(stats);
  } catch (err) {
    next(err);
  }
}

async function createCityStat(req, res, next) {
  try {
    const {
      stat_key,
      value,
      icon,
      order_number,
      is_active,
      label,
      description,
      language_id
    } = req.body || {};
    const result = await query(
      'INSERT INTO city_stats (stat_key, value, icon, order_number, is_active) VALUES (?, ?, ?, ?, ?)',
      [
        stat_key,
        value,
        icon || null,
        order_number || 0,
        is_active !== undefined ? is_active : true
      ]
    );

    if (label !== undefined || description !== undefined) {
      const langId = await resolveLanguageId(language_id);
      if (langId) {
        await upsertTranslation(
          "city_stat_translations",
          { stat_id: result.insertId, language_id: langId },
          { label, description }
        );
      }
    }
    res.status(201).json({ success: true });
  } catch (err) {
    next(err);
  }
}

async function updateCityStat(req, res, next) {
  try {
    const { id } = req.params;
    const { label, description, language_id, ...rest } = req.body || {};
    const updated = Object.keys(rest).length
      ? await updateById('city_stats', id, rest)
      : false;

    let updatedTranslation = false;
    if (label !== undefined || description !== undefined) {
      const langId = await resolveLanguageId(language_id);
      if (langId) {
        await upsertTranslation(
          "city_stat_translations",
          { stat_id: id, language_id: langId },
          { label, description }
        );
        updatedTranslation = true;
      }
    }

    if (!updated && !updatedTranslation) {
      return res.status(400).json({ error: 'No valid fields to update' });
    }
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}

async function deleteCityStat(req, res, next) {
  try {
    const { id } = req.params;
    await query('DELETE FROM city_stats WHERE id = ?', [id]);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}

// Departments
async function getDepartments(req, res, next) {
  try {
    const departments = await query('SELECT * FROM departments');
    res.json(departments);
  } catch (err) {
    next(err);
  }
}

async function createDepartment(req, res, next) {
  try {
    const {
      slug,
      icon,
      color,
      order_number,
      is_active,
      name,
      description,
      language_id
    } = req.body || {};
    const finalSlug = slug || slugify(name);
    if (!finalSlug) {
      return res.status(400).json({ error: "slug or name is required" });
    }

    const result = await query(
      'INSERT INTO departments (slug, icon, color, order_number, is_active) VALUES (?, ?, ?, ?, ?)',
      [
        finalSlug,
        icon || null,
        color || null,
        order_number || 0,
        is_active !== undefined ? is_active : true
      ]
    );

    if (name !== undefined || description !== undefined) {
      const langId = await resolveLanguageId(language_id);
      if (langId) {
        await upsertTranslation(
          "department_translations",
          { department_id: result.insertId, language_id: langId },
          { name, description }
        );
      }
    }
    res.status(201).json({ success: true });
  } catch (err) {
    next(err);
  }
}

async function updateDepartment(req, res, next) {
  try {
    const { id } = req.params;
    const { name, description, language_id, ...rest } = req.body || {};
    const baseUpdates = {};
    const baseFields = ['slug', 'icon', 'color', 'order_number', 'is_active'];

    for (const field of baseFields) {
      if (rest[field] !== undefined) {
        baseUpdates[field] = rest[field];
      }
    }

    const updatedBase = Object.keys(baseUpdates).length
      ? await updateById('departments', id, baseUpdates)
      : false;

    let updatedTranslation = false;
    if (name !== undefined || description !== undefined) {
      const langId = await resolveLanguageId(language_id);
      if (langId) {
        await upsertTranslation(
          "department_translations",
          { department_id: id, language_id: langId },
          { name, description }
        );
        updatedTranslation = true;
      }
    }

    if (!updatedBase && !updatedTranslation) {
      return res.status(400).json({ error: 'No valid fields to update' });
    }
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}

async function deleteDepartment(req, res, next) {
  try {
    const { id } = req.params;

    // Start transaction for safe deletion
    await query('START TRANSACTION');

    try {
      // Delete dependent translations first
      await query('DELETE FROM department_translations WHERE department_id = ?', [id]);

      // Delete the department
      await query('DELETE FROM departments WHERE id = ?', [id]);

      // Commit transaction
      await query('COMMIT');

      res.json({ success: true, message: 'Department deleted successfully' });
    } catch (innerErr) {
      // Rollback on error
      await query('ROLLBACK');
      throw innerErr;
    }
  } catch (err) {
    next(err);
  }
}

// Department Translations
async function getDepartmentTranslations(req, res, next) {
  try {
    const { department_id, language_id } = req.query;
    let sql = 'SELECT * FROM department_translations';
    const params = [];

    if (department_id || language_id) {
      const conditions = [];
      if (department_id) {
        conditions.push('department_id = ?');
        params.push(department_id);
      }
      if (language_id) {
        conditions.push('language_id = ?');
        params.push(language_id);
      }
      sql += ` WHERE ${conditions.join(' AND ')}`;
    }

    const rows = await query(sql, params);
    res.json(rows);
  } catch (err) {
    next(err);
  }
}

async function createDepartmentTranslation(req, res, next) {
  try {
    const { department_id, language_id, name, description } = req.body;
    const result = await query(
      'INSERT INTO department_translations (department_id, language_id, name, description) VALUES (?, ?, ?, ?)',
      [department_id, language_id, name, description]
    );

    // Get the created translation
    const [created] = await query('SELECT * FROM department_translations WHERE id = ?', [result.insertId]);

    res.status(201).json({ success: true, data: created });
  } catch (err) {
    next(err);
  }
}

async function updateDepartmentTranslation(req, res, next) {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updated = await updateById('department_translations', id, updates);
    if (!updated) {
      return res.status(400).json({ error: 'No valid fields to update' });
    }
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}

async function deleteDepartmentTranslation(req, res, next) {
  try {
    const { id } = req.params;
    await query('DELETE FROM department_translations WHERE id = ?', [id]);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}

// Services
async function getServices(req, res, next) {
  try {
    const services = await query('SELECT * FROM services');
    res.json(services);
  } catch (err) {
    next(err);
  }
}

async function createService(req, res, next) {
  try {
    const { title, description, icon, language_id } = req.body || {};
    const result = await query('INSERT INTO services (title, description, icon) VALUES (?, ?, ?)', [
      title || null,
      description || null,
      icon || null
    ]);

    if (title !== undefined || description !== undefined) {
      const langId = await resolveLanguageId(language_id);
      if (langId) {
        await upsertTranslation(
          "service_translations",
          { service_id: result.insertId, language_id: langId },
          { title, description }
        );
      }
    }
    res.status(201).json({ success: true });
  } catch (err) {
    next(err);
  }
}

async function updateService(req, res, next) {
  try {
    const { id } = req.params;
    const { title, description, language_id, ...rest } = req.body || {};
    const updated = Object.keys(rest).length
      ? await updateById('services', id, rest)
      : false;

    let updatedTranslation = false;
    if (title !== undefined || description !== undefined) {
      const langId = await resolveLanguageId(language_id);
      if (langId) {
        await upsertTranslation(
          "service_translations",
          { service_id: id, language_id: langId },
          { title, description }
        );
        updatedTranslation = true;
      }
    }

    if (!updated && !updatedTranslation) {
      return res.status(400).json({ error: 'No valid fields to update' });
    }
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}

async function deleteService(req, res, next) {
  try {
    const { id } = req.params;
    await query('DELETE FROM services WHERE id = ?', [id]);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}

// Service Translations
async function getServiceTranslations(req, res, next) {
  try {
    const { service_id, language_id } = req.query;
    let sql = 'SELECT * FROM service_translations';
    const params = [];

    if (service_id || language_id) {
      const conditions = [];
      if (service_id) {
        conditions.push('service_id = ?');
        params.push(service_id);
      }
      if (language_id) {
        conditions.push('language_id = ?');
        params.push(language_id);
      }
      sql += ` WHERE ${conditions.join(' AND ')}`;
    }

    const rows = await query(sql, params);
    res.json(rows);
  } catch (err) {
    next(err);
  }
}

async function createServiceTranslation(req, res, next) {
  try {
    const { service_id, language_id, title, description } = req.body;
    const result = await query(
      'INSERT INTO service_translations (service_id, language_id, title, description) VALUES (?, ?, ?, ?)',
      [service_id, language_id, title, description]
    );

    // Get the created translation
    const [created] = await query('SELECT * FROM service_translations WHERE id = ?', [result.insertId]);

    res.status(201).json({ success: true, data: created });
  } catch (err) {
    next(err);
  }
}

async function updateServiceTranslation(req, res, next) {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updated = await updateById('service_translations', id, updates);
    if (!updated) {
      return res.status(400).json({ error: 'No valid fields to update' });
    }

    // Get the updated translation
    const [updatedData] = await query('SELECT * FROM service_translations WHERE id = ?', [id]);

    res.json({ success: true, data: updatedData });
  } catch (err) {
    next(err);
  }
}

async function deleteServiceTranslation(req, res, next) {
  try {
    const { id } = req.params;
    await query('DELETE FROM service_translations WHERE id = ?', [id]);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}

// News
async function getNews(req, res, next) {
  try {
    const news = await query('SELECT * FROM news ORDER BY created_at DESC');
    res.json(news);
  } catch (err) {
    next(err);
  }
}

// Pages (e.g. government or static pages)
async function getPages(req, res, next) {
  try {
    const pages = await query('SELECT * FROM pages ORDER BY id');
    res.json(pages);
  } catch (err) {
    next(err);
  }
}

async function createPage(req, res, next) {
  try {
    const { title, slug, content, is_active } = req.body;
    await query('INSERT INTO pages (title, slug, content, is_active) VALUES (?, ?, ?, ?)', [title, slug, content, is_active]);
    res.status(201).json({ success: true });
  } catch (err) {
    next(err);
  }
}

async function updatePage(req, res, next) {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updated = await updateById('pages', id, updates);
    if (!updated) {
      return res.status(400).json({ error: 'No valid fields to update' });
    }
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}

async function deletePage(req, res, next) {
  try {
    const { id } = req.params;
    await query('DELETE FROM pages WHERE id = ?', [id]);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}

async function createNews(req, res, next) {
  try {
    const {
      title,
      slug,
      content,
      featured_image,
      status,
      published_by,
      is_active,
      excerpt,
      language_id
    } = req.body || {};
    const finalSlug = slug || slugify(title) || `news-${Date.now()}`;
    const finalStatus =
      status ||
      (is_active !== undefined ? (is_active ? "published" : "draft") : "draft");

    const result = await query(
      'INSERT INTO news (title, slug, content, featured_image, published_by, status) VALUES (?, ?, ?, ?, ?, ?)',
      [
        title || null,
        finalSlug || null,
        content || null,
        featured_image || null,
        published_by || null,
        finalStatus
      ]
    );

    if (title !== undefined || content !== undefined || excerpt !== undefined) {
      const langId = await resolveLanguageId(language_id);
      if (langId) {
        await upsertTranslation(
          "news_translations",
          { news_id: result.insertId, language_id: langId },
          {
            title,
            slug: finalSlug,
            content,
            excerpt: excerpt || null
          }
        );
      }
    }
    res.status(201).json({ success: true });
  } catch (err) {
    next(err);
  }
}

async function updateNews(req, res, next) {
  try {
    const { id } = req.params;
    const {
      title,
      content,
      excerpt,
      slug,
      language_id,
      is_active,
      status,
      ...rest
    } = req.body || {};

    const finalStatus =
      status || (is_active !== undefined ? (is_active ? "published" : "draft") : undefined);
    const baseUpdates = { ...rest };
    if (title !== undefined) baseUpdates.title = title;
    if (content !== undefined) baseUpdates.content = content;
    if (slug !== undefined) baseUpdates.slug = slug;
    if (finalStatus !== undefined) baseUpdates.status = finalStatus;

    const updated = Object.keys(baseUpdates).length
      ? await updateById('news', id, baseUpdates)
      : false;

    let updatedTranslation = false;
    const translationData = {};
    if (title !== undefined) translationData.title = title;
    if (content !== undefined) translationData.content = content;
    if (excerpt !== undefined) translationData.excerpt = excerpt;
    const translationSlug = slug || (title ? slugify(title) : undefined);
    if (translationSlug !== undefined) translationData.slug = translationSlug;

    if (Object.keys(translationData).length) {
      const langId = await resolveLanguageId(language_id);
      if (langId) {
        await upsertTranslation(
          "news_translations",
          { news_id: id, language_id: langId },
          translationData
        );
        updatedTranslation = true;
      }
    }

    if (!updated && !updatedTranslation) {
      return res.status(400).json({ error: 'No valid fields to update' });
    }
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}

async function deleteNews(req, res, next) {
  try {
    const { id } = req.params;

    // Start transaction for safe deletion
    await query('START TRANSACTION');

    try {
      // Delete dependent records in correct order
      await query('DELETE FROM news_tag_map WHERE news_id = ?', [id]);
      await query('DELETE FROM news_category_map WHERE news_id = ?', [id]);
      await query('DELETE FROM news_translations WHERE news_id = ?', [id]);

      // Delete news
      await query('DELETE FROM news WHERE id = ?', [id]);

      // Commit transaction
      await query('COMMIT');

      res.json({ success: true, message: 'News deleted successfully' });
    } catch (innerErr) {
      // Rollback on error
      await query('ROLLBACK');
      throw innerErr;
    }
  } catch (err) {
    next(err);
  }
}

// News Translations
async function getNewsTranslations(req, res, next) {
  try {
    const { news_id, language_id } = req.query;
    let sql = 'SELECT * FROM news_translations';
    const params = [];

    if (news_id || language_id) {
      const conditions = [];
      if (news_id) {
        conditions.push('news_id = ?');
        params.push(news_id);
      }
      if (language_id) {
        conditions.push('language_id = ?');
        params.push(language_id);
      }
      sql += ` WHERE ${conditions.join(' AND ')}`;
    }

    const rows = await query(sql, params);
    res.json(rows);
  } catch (err) {
    next(err);
  }
}

async function createNewsTranslation(req, res, next) {
  try {
    const { news_id, language_id, title, slug, content, excerpt } = req.body;
    const result = await query(
      'INSERT INTO news_translations (news_id, language_id, title, slug, content, excerpt) VALUES (?, ?, ?, ?, ?, ?)',
      [news_id, language_id, title, slug, content, excerpt]
    );

    // Get the created translation
    const [created] = await query('SELECT * FROM news_translations WHERE id = ?', [result.insertId]);

    res.status(201).json({ success: true, data: created });
  } catch (err) {
    next(err);
  }
}

async function updateNewsTranslation(req, res, next) {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updated = await updateById('news_translations', id, updates);
    if (!updated) {
      return res.status(400).json({ error: 'No valid fields to update' });
    }
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}

async function deleteNewsTranslation(req, res, next) {
  try {
    const { id } = req.params;
    await query('DELETE FROM news_translations WHERE id = ?', [id]);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}

// News Categories
async function getNewsCategories(req, res, next) {
  try {
    const { language_id } = req.query;
    let sql, params;

    if (language_id) {
      // Get categories with translations for specific language
      sql = `
        SELECT 
          nc.*,
          nct.name as translated_name,
          nct.name as category_translation_name
        FROM news_categories nc
        LEFT JOIN news_category_translations nct ON nc.id = nct.category_id AND nct.language_id = ?
        ORDER BY nc.id ASC
      `;
      params = [language_id];
    } else {
      // Get all categories without translations
      sql = 'SELECT * FROM news_categories ORDER BY id ASC';
      params = [];
    }

    const rows = await query(sql, params);
    res.json(rows);
  } catch (err) {
    next(err);
  }
}

async function createNewsCategory(req, res, next) {
  try {
    const { slug, name, color, is_active, language_id } = req.body || {};
    const finalSlug = slug || slugify(name);
    if (!finalSlug) {
      return res.status(400).json({ error: "slug or name is required" });
    }
    const result = await query(
      'INSERT INTO news_categories (slug, color, is_active) VALUES (?, ?, ?)',
      [finalSlug, color || null, is_active !== undefined ? is_active : true]
    );

    // Get the created category
    const [category] = await query('SELECT * FROM news_categories WHERE id = ?', [result.insertId]);

    if (name !== undefined) {
      const langId = await resolveLanguageId(language_id);
      if (langId) {
        await upsertTranslation(
          "news_category_translations",
          { category_id: result.insertId, language_id: langId },
          { name }
        );
      }
    }

    res.status(201).json({ success: true, data: category });
  } catch (err) {
    next(err);
  }
}

async function updateNewsCategory(req, res, next) {
  try {
    const { id } = req.params;
    const { name, language_id, ...rest } = req.body || {};
    const baseUpdates = {};
    if (rest.slug !== undefined) baseUpdates.slug = rest.slug;
    if (rest.color !== undefined) baseUpdates.color = rest.color;
    if (rest.is_active !== undefined) baseUpdates.is_active = rest.is_active;

    const updated = Object.keys(baseUpdates).length
      ? await updateById('news_categories', id, baseUpdates)
      : false;

    let updatedTranslation = false;
    if (name !== undefined) {
      const langId = await resolveLanguageId(language_id);
      if (langId) {
        await upsertTranslation(
          "news_category_translations",
          { category_id: id, language_id: langId },
          { name }
        );
        updatedTranslation = true;
      }
    }

    if (!updated && !updatedTranslation) {
      return res.status(400).json({ error: 'No valid fields to update' });
    }

    // Get the updated category
    const [category] = await query('SELECT * FROM news_categories WHERE id = ?', [id]);

    res.json({ success: true, data: category });
  } catch (err) {
    next(err);
  }
}

async function deleteNewsCategory(req, res, next) {
  try {
    const { id } = req.params;
    await query('DELETE FROM news_categories WHERE id = ?', [id]);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}

// News Category Translations
async function getNewsCategoryTranslations(req, res, next) {
  try {
    const { category_id, language_id } = req.query;
    let sql = 'SELECT * FROM news_category_translations';
    const params = [];

    if (category_id || language_id) {
      const conditions = [];
      if (category_id) {
        conditions.push('category_id = ?');
        params.push(category_id);
      }
      if (language_id) {
        conditions.push('language_id = ?');
        params.push(language_id);
      }
      sql += ` WHERE ${conditions.join(' AND ')}`;
    }

    const rows = await query(sql, params);
    res.json(rows);
  } catch (err) {
    next(err);
  }
}

async function createNewsCategoryTranslation(req, res, next) {
  try {
    const { category_id, language_id, name } = req.body;
    const result = await query(
      'INSERT INTO news_category_translations (category_id, language_id, name) VALUES (?, ?, ?)',
      [category_id, language_id, name]
    );

    // Get the created translation
    const [created] = await query('SELECT * FROM news_category_translations WHERE id = ?', [result.insertId]);

    res.status(201).json({ success: true, data: created });
  } catch (err) {
    next(err);
  }
}

async function updateNewsCategoryTranslation(req, res, next) {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updated = await updateById('news_category_translations', id, updates);
    if (!updated) {
      return res.status(400).json({ error: 'No valid fields to update' });
    }
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}

async function deleteNewsCategoryTranslation(req, res, next) {
  try {
    const { id } = req.params;
    await query('DELETE FROM news_category_translations WHERE id = ?', [id]);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}

// News Category Map
async function getNewsCategoryMap(req, res, next) {
  try {
    const { news_id } = req.query;
    if (news_id) {
      const rows = await query('SELECT * FROM news_category_map WHERE news_id = ?', [news_id]);
      return res.json(rows);
    }
    const rows = await query('SELECT * FROM news_category_map');
    res.json(rows);
  } catch (err) {
    next(err);
  }
}

async function createNewsCategoryMap(req, res, next) {
  try {
    const { news_id, category_id } = req.body;
    await query(
      'INSERT INTO news_category_map (news_id, category_id) VALUES (?, ?)',
      [news_id, category_id]
    );
    res.status(201).json({ success: true });
  } catch (err) {
    next(err);
  }
}

async function deleteNewsCategoryMap(req, res, next) {
  try {
    const { id } = req.params;
    await query('DELETE FROM news_category_map WHERE id = ?', [id]);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}

// News Tags
async function getNewsTags(req, res, next) {
  try {
    const rows = await query('SELECT * FROM news_tags ORDER BY id ASC');
    res.json(rows);
  } catch (err) {
    next(err);
  }
}

async function createNewsTag(req, res, next) {
  try {
    const { slug, name, language_id } = req.body || {};
    const finalSlug = slug || slugify(name);
    if (!finalSlug) {
      return res.status(400).json({ error: "slug or name is required" });
    }
    const result = await query('INSERT INTO news_tags (slug) VALUES (?)', [finalSlug]);

    if (name !== undefined) {
      const langId = await resolveLanguageId(language_id);
      if (langId) {
        await upsertTranslation(
          "news_tag_translations",
          { tag_id: result.insertId, language_id: langId },
          { name }
        );
      }
    }
    res.status(201).json({ success: true });
  } catch (err) {
    next(err);
  }
}

async function updateNewsTag(req, res, next) {
  try {
    const { id } = req.params;
    const { name, language_id, is_active, slug } = req.body || {};
    const baseUpdates = {};
    if (slug !== undefined) baseUpdates.slug = slug;
    if (is_active !== undefined) baseUpdates.is_active = is_active;

    const updated = Object.keys(baseUpdates).length
      ? await updateById('news_tags', id, baseUpdates)
      : false;

    let updatedTranslation = false;
    if (name !== undefined) {
      const langId = await resolveLanguageId(language_id);
      if (langId) {
        await upsertTranslation(
          "news_tag_translations",
          { tag_id: id, language_id: langId },
          { name }
        );
        updatedTranslation = true;
      }
    }

    if (!updated && !updatedTranslation) {
      return res.status(400).json({ error: 'No valid fields to update' });
    }

    // Get the updated tag
    const [updatedData] = await query('SELECT * FROM news_tags WHERE id = ?', [id]);

    res.json({ success: true, data: updatedData });
  } catch (err) {
    next(err);
  }
}

async function deleteNewsTag(req, res, next) {
  try {
    const { id } = req.params;

    // Start transaction for safe deletion
    await query('START TRANSACTION');

    try {
      // Delete dependent translations first
      await query('DELETE FROM news_tag_translations WHERE tag_id = ?', [id]);
      await query('DELETE FROM news_tag_map WHERE tag_id = ?', [id]);

      // Delete tag
      await query('DELETE FROM news_tags WHERE id = ?', [id]);

      // Commit transaction
      await query('COMMIT');

      res.json({ success: true, message: 'News tag deleted successfully' });
    } catch (innerErr) {
      // Rollback on error
      await query('ROLLBACK');
      throw innerErr;
    }
  } catch (err) {
    next(err);
  }
}

// News Tag Translations
async function getNewsTagTranslations(req, res, next) {
  try {
    const { tag_id, language_id } = req.query;
    let sql = 'SELECT * FROM news_tag_translations';
    const params = [];

    if (tag_id || language_id) {
      const conditions = [];
      if (tag_id) {
        conditions.push('tag_id = ?');
        params.push(tag_id);
      }
      if (language_id) {
        conditions.push('language_id = ?');
        params.push(language_id);
      }
      sql += ` WHERE ${conditions.join(' AND ')}`;
    }

    const rows = await query(sql, params);
    res.json(rows);
  } catch (err) {
    next(err);
  }
}

async function createNewsTagTranslation(req, res, next) {
  try {
    const { tag_id, language_id, name } = req.body;
    const result = await query(
      'INSERT INTO news_tag_translations (tag_id, language_id, name) VALUES (?, ?, ?)',
      [tag_id, language_id, name]
    );

    // Get the created translation
    const [created] = await query('SELECT * FROM news_tag_translations WHERE id = ?', [result.insertId]);

    res.status(201).json({ success: true, data: created });
  } catch (err) {
    next(err);
  }
}

async function updateNewsTagTranslation(req, res, next) {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updated = await updateById('news_tag_translations', id, updates);
    if (!updated) {
      return res.status(400).json({ error: 'No valid fields to update' });
    }
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}

async function deleteNewsTagTranslation(req, res, next) {
  try {
    const { id } = req.params;
    await query('DELETE FROM news_tag_translations WHERE id = ?', [id]);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}

// News Tag Map
async function getNewsTagMap(req, res, next) {
  try {
    const { news_id } = req.query;
    if (news_id) {
      const rows = await query('SELECT * FROM news_tag_map WHERE news_id = ?', [news_id]);
      return res.json(rows);
    }
    const rows = await query('SELECT * FROM news_tag_map');
    res.json(rows);
  } catch (err) {
    next(err);
  }
}

async function createNewsTagMap(req, res, next) {
  try {
    const { news_id, tag_id } = req.body;
    const result = await query('INSERT INTO news_tag_map (news_id, tag_id) VALUES (?, ?)', [news_id, tag_id]);

    // Get the created mapping
    const [created] = await query('SELECT * FROM news_tag_map WHERE id = ?', [result.insertId]);

    res.status(201).json({ success: true, data: created });
  } catch (err) {
    next(err);
  }
}

async function deleteNewsTagMap(req, res, next) {
  try {
    const { id } = req.params;
    await query('DELETE FROM news_tag_map WHERE id = ?', [id]);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}

// Documents
async function getDocuments(req, res, next) {
  try {
    const rows = await query(
      `SELECT d.*, u.name AS uploaded_by_name
       FROM documents d
       LEFT JOIN users u ON u.id = d.uploaded_by
       ORDER BY d.created_at DESC`
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
}

async function getDocumentById(req, res, next) {
  try {
    const { id } = req.params;
    const rows = await query(
      `SELECT d.*, u.name AS uploaded_by_name
       FROM documents d
       LEFT JOIN users u ON u.id = d.uploaded_by
       WHERE d.id = ? LIMIT 1`,
      [id]
    );
    if (!rows.length) {
      return res.status(404).json({ error: "Document not found" });
    }
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
}

async function createDocument(req, res, next) {
  try {
    const { title, file, category, description } = req.body || {};
    if (!title && !file) {
      return res.status(400).json({ error: "title or file is required" });
    }
    const uploadedBy = req.user?.id || null;
    await query(
      'INSERT INTO documents (title, file, category, description, uploaded_by) VALUES (?, ?, ?, ?, ?)',
      [title || null, file || null, category || null, description || null, uploadedBy]
    );
    res.status(201).json({ success: true });
  } catch (err) {
    next(err);
  }
}

async function updateDocument(req, res, next) {
  try {
    const { id } = req.params;
    const updates = req.body || {};
    const updated = await updateById('documents', id, updates);
    if (!updated) {
      return res.status(400).json({ error: "No valid fields to update" });
    }
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}

async function deleteDocument(req, res, next) {
  try {
    const { id } = req.params;
    await query('DELETE FROM documents WHERE id = ?', [id]);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}

async function getDocumentCategories(req, res, next) {
  try {
    const rows = await query('SELECT * FROM document_categories ORDER BY name ASC');
    res.json(rows);
  } catch (err) {
    next(err);
  }
}

async function createDocumentCategory(req, res, next) {
  try {
    const { name } = req.body || {};
    if (!name) {
      return res.status(400).json({ error: "name is required" });
    }
    await query('INSERT INTO document_categories (name) VALUES (?)', [name]);
    res.status(201).json({ success: true });
  } catch (err) {
    next(err);
  }
}

// Projects
async function getProjects(req, res, next) {
  try {
    const rows = await query(
      `SELECT id, title AS name, description, budget, deadline, progress, status, created_at, updated_at
       FROM projects
       ORDER BY COALESCE(updated_at, created_at) DESC, id DESC`
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
}

async function getProjectById(req, res, next) {
  try {
    const { id } = req.params;
    const rows = await query(
      `SELECT id, title AS name, description, budget, deadline, progress, status, created_at, updated_at
       FROM projects
       WHERE id = ? LIMIT 1`,
      [id]
    );
    if (!rows.length) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
}

async function createProject(req, res, next) {
  try {
    const { name, title, description, budget, deadline, progress, status } = req.body || {};
    const finalTitle = title || name;
    if (!finalTitle) {
      return res.status(400).json({ error: "name is required" });
    }
    await query(
      `INSERT INTO projects (title, description, budget, deadline, progress, status, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
      [
        finalTitle,
        description || null,
        budget || null,
        deadline || null,
        progress !== undefined ? progress : 0,
        status || "Planning"
      ]
    );
    res.status(201).json({ success: true });
  } catch (err) {
    next(err);
  }
}

async function updateProject(req, res, next) {
  try {
    const { id } = req.params;
    const { name, title, ...rest } = req.body || {};
    const updates = { ...rest };
    if (title !== undefined) updates.title = title;
    if (name !== undefined) updates.title = name;

    const updated = await updateById('projects', id, updates);
    if (!updated) {
      return res.status(400).json({ error: "No valid fields to update" });
    }
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}

async function updateProjectProgress(req, res, next) {
  try {
    const { id } = req.params;
    const { progress, status } = req.body || {};
    await query(
      'UPDATE projects SET progress = ?, status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [progress !== undefined ? progress : 0, status || "In Progress", id]
    );
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}

async function deleteProject(req, res, next) {
  try {
    const { id } = req.params;
    await query('DELETE FROM projects WHERE id = ?', [id]);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}

// Events
async function getEvents(req, res, next) {
  try {
    const rows = await query('SELECT * FROM events ORDER BY event_date ASC');
    res.json(rows);
  } catch (err) {
    next(err);
  }
}

async function getEventById(req, res, next) {
  try {
    const { id } = req.params;
    const rows = await query('SELECT * FROM events WHERE id = ? LIMIT 1', [id]);
    if (!rows.length) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
}

async function createEvent(req, res, next) {
  try {
    const {
      title,
      description,
      date,
      event_date,
      type,
      location,
      organizer,
      attendees,
      image
    } = req.body || {};

    const finalDate = event_date || date;
    if (!title || !finalDate) {
      return res.status(400).json({ error: "title and date are required" });
    }

    await query(
      `INSERT INTO events (title, description, event_date, event_type, location, organizer, attendees, image)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        description || null,
        finalDate,
        type || null,
        location || null,
        organizer || null,
        attendees || null,
        image || null
      ]
    );
    res.status(201).json({ success: true });
  } catch (err) {
    next(err);
  }
}

async function updateEvent(req, res, next) {
  try {
    const { id } = req.params;
    const updates = { ...(req.body || {}) };
    if (updates.date && !updates.event_date) {
      updates.event_date = updates.date;
      delete updates.date;
    }
    const updated = await updateById('events', id, updates);
    if (!updated) {
      return res.status(400).json({ error: "No valid fields to update" });
    }
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}

async function deleteEvent(req, res, next) {
  try {
    const { id } = req.params;
    await query('DELETE FROM events WHERE id = ?', [id]);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}

async function getEventsByRange(req, res, next) {
  try {
    const { startDate, endDate } = req.query;
    if (!startDate || !endDate) {
      return res.status(400).json({ error: "startDate and endDate are required" });
    }
    const rows = await query(
      'SELECT * FROM events WHERE event_date BETWEEN ? AND ? ORDER BY event_date ASC',
      [startDate, endDate]
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
}

// Reports
async function getReportStatistics(req, res, next) {
  try {
    const period = (req.query.period || "month").toLowerCase();
    const ranges = {
      week: 7,
      month: 30,
      quarter: 90,
      year: 365
    };
    const days = ranges[period] || ranges.month;

    const [visits] = await query(
      `SELECT COUNT(*) AS total_visits,
              COUNT(DISTINCT visitor_hash) AS unique_visitors
       FROM site_visits
       WHERE visited_at >= DATE_SUB(NOW(), INTERVAL ${days} DAY)`
    );
    const [subs] = await query(
      `SELECT COUNT(*) AS total FROM subscribers WHERE status = 'active'`
    );
    const [contacts] = await query(
      `SELECT COUNT(*) AS total FROM contact_messages
       WHERE created_at >= DATE_SUB(NOW(), INTERVAL ${days} DAY)`
    );
    const [newsCount] = await query(`SELECT COUNT(*) AS total FROM news`);
    const [deptCount] = await query(`SELECT COUNT(*) AS total FROM departments`);
    const [serviceCount] = await query(`SELECT COUNT(*) AS total FROM services`);

    res.json({
      period,
      totals: {
        total_visits: Number(visits?.total_visits || 0),
        unique_visitors: Number(visits?.unique_visitors || 0),
        subscribers: Number(subs?.total || 0),
        contacts: Number(contacts?.total || 0),
        news: Number(newsCount?.total || 0),
        departments: Number(deptCount?.total || 0),
        services: Number(serviceCount?.total || 0)
      }
    });
  } catch (err) {
    next(err);
  }
}

async function getDepartmentPerformance(req, res, next) {
  try {
    const rows = await query('SELECT id, slug FROM departments ORDER BY order_number ASC, id ASC');
    const data = rows.map((dept, idx) => ({
      id: dept.id,
      name: dept.slug,
      completedTasks: 0,
      totalTasks: 0,
      performance: 0,
      trend: 'stable',
      color: idx % 2 === 0 ? '#1e5a8e' : '#0d9488'
    }));
    res.json(data);
  } catch (err) {
    next(err);
  }
}

async function getReportActivities(req, res, next) {
  try {
    const limit = Number(req.query.limit || 10);
    const rows = await query(
      'SELECT * FROM activity_logs ORDER BY created_at DESC LIMIT ?',
      [limit]
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
}

async function exportReport(req, res, next) {
  try {
    const { type } = req.params;
    const format = (req.query.format || "json").toLowerCase();
    const payload = {
      type,
      generated_at: new Date().toISOString()
    };

    if (format === "csv") {
      res.setHeader("Content-Type", "text/csv");
      res.send(`type,generated_at\n${payload.type},${payload.generated_at}\n`);
      return;
    }

    res.json(payload);
  } catch (err) {
    next(err);
  }
}

// Newsletter
async function sendNewsletter(req, res, next) {
  try {
    const { subject, message, html, testEmail } = req.body || {};
    if (!subject || (!message && !html)) {
      return res.status(400).json({ error: "subject and message are required" });
    }

    if (testEmail) {
      return res.json({ success: true, sent: 1, mode: "test" });
    }

    const [rows] = await query(
      "SELECT COUNT(*) AS total FROM subscribers WHERE status = 'active'"
    );
    const total = Number(rows?.total || 0);
    res.json({ success: true, sent: total, mode: "mock" });
  } catch (err) {
    next(err);
  }
}

// Subscribers
async function getSubscribers(req, res, next) {
  try {
    const subscribers = await query('SELECT * FROM subscribers');
    res.json(subscribers);
  } catch (err) {
    next(err);
  }
}

async function deleteSubscriber(req, res, next) {
  try {
    const { id } = req.params;
    await query('DELETE FROM subscribers WHERE id = ?', [id]);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}

// Contacts
async function getContacts(req, res, next) {
  try {
    const contacts = await query('SELECT * FROM contact_messages');
    res.json(contacts);
  } catch (err) {
    next(err);
  }
}

async function deleteContact(req, res, next) {
  try {
    const { id } = req.params;
    await query('DELETE FROM contact_messages WHERE id = ?', [id]);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}

// Media Library
async function getMedia(req, res, next) {
  try {
    const rows = await query('SELECT * FROM media ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    next(err);
  }
}

async function deleteMedia(req, res, next) {
  try {
    const { id } = req.params;
    const rows = await query('SELECT file_path FROM media WHERE id = ?', [id]);
    if (rows.length) {
      const filePath = rows[0].file_path;
      if (filePath && filePath.startsWith('uploads/')) {
        const absolute = path.join(__dirname, '../../', filePath);
        fs.unlink(absolute, () => { });
      }
    }
    await query('DELETE FROM media WHERE id = ?', [id]);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
}

// Analytics
async function getVisitorStats(req, res, next) {
  try {
    const range = (req.query.range || "day").toLowerCase();
    const ranges = {
      day: "1 DAY",
      week: "7 DAY",
      month: "30 DAY",
      year: "365 DAY"
    };

    const interval = ranges[range] || ranges.day;

    const rows = await query(
      `SELECT 
          COUNT(*) AS total_visits,
          COUNT(DISTINCT visitor_hash) AS unique_visitors
       FROM site_visits
       WHERE visited_at >= DATE_SUB(NOW(), INTERVAL ${interval})`
    );

    res.json({
      range,
      total_visits: rows[0]?.total_visits || 0,
      unique_visitors: rows[0]?.unique_visitors || 0
    });
  } catch (err) {
    next(err);
  }
}

function pad2(value) {
  return String(value).padStart(2, "0");
}

function toDateKey(date) {
  return `${date.getUTCFullYear()}-${pad2(date.getUTCMonth() + 1)}-${pad2(date.getUTCDate())}`;
}

function toMonthKey(date) {
  return `${date.getUTCFullYear()}-${pad2(date.getUTCMonth() + 1)}`;
}

function getIsoWeekKey(date) {
  const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  return { year: d.getUTCFullYear(), week: weekNo };
}

function startOfIsoWeek(date) {
  const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  const day = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() - day + 1);
  d.setUTCHours(0, 0, 0, 0);
  return d;
}

async function getVisitorSeries(req, res, next) {
  try {
    const range = (req.query.range || "day").toLowerCase();
    const now = new Date();

    let rows = [];
    let buckets = [];
    let sql = "";
    let params = [];

    if (range === "week") {
      sql = `SELECT YEARWEEK(visited_at, 1) AS bucket,
                COUNT(*) AS total_visits,
                COUNT(DISTINCT visitor_hash) AS unique_visitors
             FROM site_visits
             WHERE visited_at >= DATE_SUB(CURDATE(), INTERVAL 11 WEEK)
             GROUP BY bucket
             ORDER BY bucket ASC`;
      rows = await query(sql, params);

      for (let i = 11; i >= 0; i -= 1) {
        const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
        d.setUTCDate(d.getUTCDate() - i * 7);
        const weekStart = startOfIsoWeek(d);
        const { year, week } = getIsoWeekKey(weekStart);
        const key = year * 100 + week;
        const label = `${year}-W${pad2(week)}`;
        buckets.push({ key: String(key), label });
      }
    } else if (range === "month") {
      sql = `SELECT DATE_FORMAT(visited_at, '%Y-%m') AS bucket,
                COUNT(*) AS total_visits,
                COUNT(DISTINCT visitor_hash) AS unique_visitors
             FROM site_visits
             WHERE visited_at >= DATE_SUB(DATE_FORMAT(CURDATE(), '%Y-%m-01'), INTERVAL 11 MONTH)
             GROUP BY bucket
             ORDER BY bucket ASC`;
      rows = await query(sql, params);

      for (let i = 11; i >= 0; i -= 1) {
        const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));
        d.setUTCMonth(d.getUTCMonth() - i);
        buckets.push({ key: toMonthKey(d), label: toMonthKey(d) });
      }
    } else if (range === "year") {
      sql = `SELECT YEAR(visited_at) AS bucket,
                COUNT(*) AS total_visits,
                COUNT(DISTINCT visitor_hash) AS unique_visitors
             FROM site_visits
             WHERE visited_at >= DATE_SUB(CURDATE(), INTERVAL 4 YEAR)
             GROUP BY bucket
             ORDER BY bucket ASC`;
      rows = await query(sql, params);

      const currentYear = now.getUTCFullYear();
      for (let i = 4; i >= 0; i -= 1) {
        const year = currentYear - i;
        buckets.push({ key: String(year), label: String(year) });
      }
    } else {
      sql = `SELECT DATE(visited_at) AS bucket,
                COUNT(*) AS total_visits,
                COUNT(DISTINCT visitor_hash) AS unique_visitors
             FROM site_visits
             WHERE visited_at >= DATE_SUB(CURDATE(), INTERVAL 6 DAY)
             GROUP BY bucket
             ORDER BY bucket ASC`;
      rows = await query(sql, params);

      for (let i = 6; i >= 0; i -= 1) {
        const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
        d.setUTCDate(d.getUTCDate() - i);
        const key = toDateKey(d);
        buckets.push({ key, label: key });
      }
    }

    const rowMap = new Map();
    rows.forEach((row) => {
      const key = String(row.bucket);
      rowMap.set(key, {
        total_visits: Number(row.total_visits || 0),
        unique_visitors: Number(row.unique_visitors || 0)
      });
    });

    const points = buckets.map((bucket) => {
      const values = rowMap.get(bucket.key) || { total_visits: 0, unique_visitors: 0 };
      return {
        label: bucket.label,
        total_visits: values.total_visits,
        unique_visitors: values.unique_visitors
      };
    });

    res.json({ range, points });
  } catch (err) {
    next(err);
  }
}

// File upload
async function uploadFile(req, res, next) {
  upload.single('file')(req, res, (err) => {
    if (err) return next(err);
    const filePath = req.file.path;
    const fileName = req.file.originalname;
    const fileType = req.file.mimetype || null;
    const uploadedBy = req.user?.id || null;
    query(
      'INSERT INTO media (file_name, file_path, file_type, uploaded_by) VALUES (?, ?, ?, ?)',
      [fileName, filePath, fileType, uploadedBy]
    ).catch(() => { });
    res.json({ filePath });
  });
}

module.exports = {
  login,
  getSettings,
  updateSettings,
  getLanguages,
  createLanguage,
  updateLanguage,
  deleteLanguage,
  getUiTranslations,
  createUiTranslation,
  updateUiTranslation,
  deleteUiTranslation,
  getHeroSliders,
  createHeroSlider,
  updateHeroSlider,
  deleteHeroSlider,
  getHeroSliderTranslations,
  createHeroSliderTranslation,
  updateHeroSliderTranslation,
  deleteHeroSliderTranslation,
  getPageHeroSlides,
  createPageHeroSlide,
  updatePageHeroSlide,
  deletePageHeroSlide,
  getLeaders,
  createLeader,
  updateLeader,
  deleteLeader,
  getLeaderTranslations,
  createLeaderTranslation,
  updateLeaderTranslation,
  deleteLeaderTranslation,
  getCityStats,
  createCityStat,
  updateCityStat,
  deleteCityStat,
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
  getDepartmentTranslations,
  createDepartmentTranslation,
  updateDepartmentTranslation,
  deleteDepartmentTranslation,
  getServices,
  createService,
  updateService,
  deleteService,
  getServiceTranslations,
  createServiceTranslation,
  updateServiceTranslation,
  deleteServiceTranslation,
  getNews,
  createNews,
  updateNews,
  deleteNews,
  getNewsTranslations,
  createNewsTranslation,
  updateNewsTranslation,
  deleteNewsTranslation,
  getNewsCategories,
  createNewsCategory,
  updateNewsCategory,
  deleteNewsCategory,
  getNewsCategoryTranslations,
  createNewsCategoryTranslation,
  updateNewsCategoryTranslation,
  deleteNewsCategoryTranslation,
  getNewsCategoryMap,
  createNewsCategoryMap,
  deleteNewsCategoryMap,
  getNewsTags,
  createNewsTag,
  updateNewsTag,
  deleteNewsTag,
  getNewsTagTranslations,
  createNewsTagTranslation,
  updateNewsTagTranslation,
  deleteNewsTagTranslation,
  getNewsTagMap,
  createNewsTagMap,
  deleteNewsTagMap,
  getDocuments,
  getDocumentById,
  createDocument,
  updateDocument,
  deleteDocument,
  getDocumentCategories,
  createDocumentCategory,
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  updateProjectProgress,
  deleteProject,
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventsByRange,
  getReportStatistics,
  getDepartmentPerformance,
  getReportActivities,
  exportReport,
  sendNewsletter,
  getPages,
  createPage,
  updatePage,
  deletePage,
  getSubscribers,
  deleteSubscriber,
  getContacts,
  deleteContact,
  getMedia,
  deleteMedia,
  getVisitorStats,
  getVisitorSeries,
  uploadFile
};

const { query } = require("../config/db");
const { resolveLanguage } = require("../utils/language");
const { getUiTextMap } = require("../services/uiTextService");
const crypto = require("crypto");

async function getSettings(languageId) {
  const rows = await query(
    `SELECT s.id, s.logo, s.favicon, s.phone, s.email, s.facebook, s.twitter, s.youtube,
            st.site_name, st.address, st.office_hours, st.footer_tagline
     FROM settings s
     LEFT JOIN setting_translations st
       ON st.setting_id = s.id AND st.language_id = ?
     ORDER BY s.id ASC
     LIMIT 1`,
    [languageId]
  );
  return rows[0] || null;
}

async function getHeroSlides(languageId, pageSlug = "home") {
  return query(
    `SELECT hs.id, hs.image,
            COALESCE(hst.title, hs.title) AS title,
            COALESCE(hst.subtitle, hs.subtitle) AS subtitle,
            COALESCE(hst.button_text, hs.button_text) AS button_text,
            hs.button_link, hs.is_active
     FROM hero_sliders hs
     LEFT JOIN hero_slider_translations hst
       ON hst.slider_id = hs.id AND hst.language_id = ?
     WHERE hs.is_active = TRUE
       AND EXISTS (
         SELECT 1 FROM page_hero_slides phs
         WHERE phs.slider_id = hs.id
           AND phs.page_slug = ?
           AND phs.is_active = TRUE
       )
     ORDER BY (
       SELECT phs.order_number FROM page_hero_slides phs
       WHERE phs.slider_id = hs.id AND phs.page_slug = ? LIMIT 1
     ) ASC, hs.id ASC`,
    [languageId, pageSlug, pageSlug]
  );
}

async function getStats(languageId) {
  return query(
    `SELECT cs.id, cs.stat_key, cs.value, cs.icon, cs.order_number,
            cst.label, cst.description
     FROM city_stats cs
     LEFT JOIN city_stat_translations cst
       ON cst.stat_id = cs.id AND cst.language_id = ?
     WHERE cs.is_active = TRUE
     ORDER BY cs.order_number ASC, cs.id ASC`,
    [languageId]
  );
}

async function getMayor(languageId) {
  const rows = await query(
    `SELECT l.id, l.photo, l.order_number,
            COALESCE(lt.name, l.name) AS name,
            COALESCE(lt.position, l.position) AS position,
            COALESCE(lt.message, l.message) AS message
     FROM leaders l
     LEFT JOIN leader_translations lt
       ON lt.leader_id = l.id AND lt.language_id = ?
     ORDER BY l.order_number ASC, l.id ASC
     LIMIT 1`,
    [languageId]
  );
  return rows[0] || null;
}

async function getDepartments(languageId) {
  return query(
    `SELECT d.id, d.slug, d.icon, d.color, d.order_number,
            dt.name, dt.description
     FROM departments d
     LEFT JOIN department_translations dt
       ON dt.department_id = d.id AND dt.language_id = ?
     WHERE d.is_active = TRUE
     ORDER BY d.order_number ASC, d.id ASC`,
    [languageId]
  );
}

async function getServices(languageId) {
  return query(
    `SELECT s.id, s.icon, s.created_at,
            st.title, st.description
     FROM services s
     LEFT JOIN service_translations st
       ON st.service_id = s.id AND st.language_id = ?
     ORDER BY s.id ASC`,
    [languageId]
  );
}

async function getLatestNews(languageId, limit = 6, categorySlug = null) {
  const limitNum = parseInt(limit, 10) || 6;
  let sql = `SELECT n.id, n.featured_image, n.created_at, n.status,
            nt.title, nt.slug, nt.content,
            COALESCE(NULLIF(nt.excerpt, ''), LEFT(nt.content, 180)) AS excerpt,
            nc.slug AS category_slug, nct.name AS category_name
     FROM news n
     JOIN news_translations nt
       ON nt.news_id = n.id AND nt.language_id = ?
     LEFT JOIN news_category_map ncm ON ncm.news_id = n.id
     LEFT JOIN news_categories nc ON nc.id = ncm.category_id
     LEFT JOIN news_category_translations nct
       ON nct.category_id = nc.id AND nct.language_id = nt.language_id
     WHERE n.status = 'published'`;

  const params = [languageId];

  if (categorySlug && categorySlug.trim()) {
    sql += " AND nc.slug = ?";
    params.push(categorySlug.trim());
  }

  sql += ` ORDER BY n.created_at DESC LIMIT ${limitNum}`;

  return query(sql, params);
}

async function getNewsBySlug(languageId, slug) {
  const rows = await query(
    `SELECT n.id, n.featured_image, n.created_at, n.status,
            nt.title, nt.slug, nt.content,
            COALESCE(NULLIF(nt.excerpt, ''), LEFT(nt.content, 220)) AS excerpt,
            nc.slug AS category_slug, nct.name AS category_name
     FROM news n
     JOIN news_translations nt
       ON nt.news_id = n.id AND nt.language_id = ?
     LEFT JOIN news_category_map ncm ON ncm.news_id = n.id
     LEFT JOIN news_categories nc ON nc.id = ncm.category_id
     LEFT JOIN news_category_translations nct
       ON nct.category_id = nc.id AND nct.language_id = nt.language_id
     WHERE n.status = 'published'
       AND nt.slug = ?`,
    [languageId, slug]
  );
  return rows;
}

async function getNewsCategories(languageId) {
  return query(
    `SELECT nc.id, nc.slug, nc.color, nct.name
     FROM news_categories nc
     LEFT JOIN news_category_translations nct
       ON nct.category_id = nc.id AND nct.language_id = ?
     WHERE nc.is_active = TRUE
     ORDER BY nc.id ASC`,
    [languageId]
  );
}

async function bootstrap(req, res, next) {
  try {
    const lang = await resolveLanguage(req.query.lang);
    const [settings, ui, heroSlides, stats, mayor, departments, services, categories, news] =
      await Promise.all([
        getSettings(lang.id),
        getUiTextMap(lang.id),
        getHeroSlides(lang.id, "home"),
        getStats(lang.id),
        getMayor(lang.id),
        getDepartments(lang.id),
        getServices(lang.id),
        getNewsCategories(lang.id),
        getLatestNews(lang.id, 6, req.query.category || null)
      ]);

    res.json({
      language: lang.code,
      settings,
      ui,
      heroSlides,
      stats,
      mayor,
      departments,
      services,
      newsCategories: categories,
      news
    });
  } catch (err) {
    next(err);
  }
}

async function uiTexts(req, res, next) {
  try {
    const lang = await resolveLanguage(req.query.lang);
    const ui = await getUiTextMap(lang.id);
    res.json({ language: lang.code, ui });
  } catch (err) {
    next(err);
  }
}

async function services(req, res, next) {
  try {
    const lang = await resolveLanguage(req.query.lang);
    const rows = await getServices(lang.id);
    res.json({ language: lang.code, data: rows });
  } catch (err) {
    next(err);
  }
}

async function departments(req, res, next) {
  try {
    const lang = await resolveLanguage(req.query.lang);
    const rows = await getDepartments(lang.id);
    res.json({ language: lang.code, data: rows });
  } catch (err) {
    next(err);
  }
}

async function stats(req, res, next) {
  try {
    const lang = await resolveLanguage(req.query.lang);
    const rows = await getStats(lang.id);
    res.json({ language: lang.code, data: rows });
  } catch (err) {
    next(err);
  }
}

async function hero(req, res, next) {
  try {
    const lang = await resolveLanguage(req.query.lang);
    const page = (req.query.page || "home").trim().toLowerCase();
    const rows = await getHeroSlides(lang.id, page);
    res.json({ language: lang.code, page, data: rows });
  } catch (err) {
    next(err);
  }
}

async function mayor(req, res, next) {
  try {
    const lang = await resolveLanguage(req.query.lang);
    const row = await getMayor(lang.id);
    res.json({ language: lang.code, data: row });
  } catch (err) {
    next(err);
  }
}

async function news(req, res, next) {
  try {
    const lang = await resolveLanguage(req.query.lang);
    const limit = Number(req.query.limit || 12);
    const category = req.query.category || null;
    const rows = await getLatestNews(lang.id, limit, category);
    res.json({ language: lang.code, data: rows });
  } catch (err) {
    next(err);
  }
}

async function newsDetail(req, res, next) {
  try {
    const lang = await resolveLanguage(req.query.lang);
    const slug = (req.params.slug || "").trim();
    if (!slug) {
      return res.status(400).json({ error: "slug is required" });
    }

    const rows = await getNewsBySlug(lang.id, slug);
    if (!rows.length) {
      return res.status(404).json({ error: "News item not found" });
    }

    const base = rows[0];
    const categories = [];
    const seen = new Set();
    for (const row of rows) {
      if (!row.category_slug && !row.category_name) continue;
      const key = row.category_slug || row.category_name;
      if (seen.has(key)) continue;
      seen.add(key);
      categories.push({
        slug: row.category_slug || null,
        name: row.category_name || row.category_slug || null
      });
    }

    res.json({
      language: lang.code,
      data: {
        id: base.id,
        featured_image: base.featured_image,
        created_at: base.created_at,
        status: base.status,
        title: base.title,
        slug: base.slug,
        excerpt: base.excerpt,
        content: base.content,
        categories
      }
    });
  } catch (err) {
    next(err);
  }
}

async function recordVisit(req, res, next) {
  try {
    const rawForwarded = req.headers["x-forwarded-for"];
    const ip = (Array.isArray(rawForwarded) ? rawForwarded[0] : rawForwarded || req.ip || "")
      .split(",")[0]
      .trim();
    const userAgent = (req.headers["user-agent"] || "").slice(0, 255);
    const path = (req.body?.path || req.query?.path || req.headers.referer || "").toString().slice(0, 255);

    if (!ip && !userAgent) {
      return res.json({ ok: true });
    }

    const visitorHash = crypto
      .createHash("sha256")
      .update(`${ip}|${userAgent}`)
      .digest("hex");

    const existing = await query(
      "SELECT id FROM site_visits WHERE visitor_hash = ? AND DATE(visited_at) = CURDATE() LIMIT 1",
      [visitorHash]
    );

    if (existing.length === 0) {
      await query(
        "INSERT INTO site_visits (visitor_hash, ip, user_agent, path) VALUES (?, ?, ?, ?)",
        [visitorHash, ip || null, userAgent || null, path || null]
      );
    }

    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  bootstrap,
  uiTexts,
  services,
  departments,
  stats,
  hero,
  mayor,
  news,
  newsDetail,
  recordVisit
};

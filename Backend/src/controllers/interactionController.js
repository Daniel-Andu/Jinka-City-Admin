const { query } = require("../config/db");

async function submitContact(req, res, next) {
  try {
    const { name, email, subject, message } = req.body || {};
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "name, email, subject, and message are required" });
    }

    await query(
      `INSERT INTO contact_messages (name, email, subject, message)
       VALUES (?, ?, ?, ?)`,
      [name.trim(), email.trim(), subject.trim(), message.trim()]
    );

    return res.status(201).json({ success: true, message: "Contact message submitted" });
  } catch (err) {
    return next(err);
  }
}

async function subscribe(req, res, next) {
  try {
    const { email } = req.body || {};
    if (!email) {
      return res.status(400).json({ error: "email is required" });
    }

    await query(
      `INSERT INTO subscribers (email, status, subscribed_at, unsubscribed_at)
       VALUES (?, 'active', CURRENT_TIMESTAMP, NULL)
       ON DUPLICATE KEY UPDATE
         status = 'active',
         subscribed_at = CURRENT_TIMESTAMP,
         unsubscribed_at = NULL`,
      [email.trim().toLowerCase()]
    );

    return res.status(201).json({ success: true, message: "Subscribed successfully" });
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  submitContact,
  subscribe
};

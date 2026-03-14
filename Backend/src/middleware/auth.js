const jwt = require('jsonwebtoken');
const { query } = require('../config/db');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

async function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid token' });
  }
}

async function requireAdmin(req, res, next) {
  if (!req.user || !req.user.role_id) {
    return res.status(403).json({ error: 'Admin access required' });
  }

  try {
    const roles = await query('SELECT r.name FROM roles r JOIN users u ON u.role_id = r.id WHERE u.id = ?', [req.user.id]);
    if (roles.length === 0 || roles[0].name !== 'admin') {
      return res.status(403).json({ error: 'Admin role required' });
    }
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  authenticateToken,
  requireAdmin,
  JWT_SECRET
};
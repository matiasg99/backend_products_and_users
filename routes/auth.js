const express = require('express');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();
const USERS_PATH = path.join(__dirname, '..', 'data', 'users.json');

function readUsers() {
  if (!fs.existsSync(USERS_PATH)) return [];
  return JSON.parse(fs.readFileSync(USERS_PATH, 'utf8') || '[]');
}
function writeUsers(users) {
  fs.writeFileSync(USERS_PATH, JSON.stringify(users, null, 2));
}

router.post('/register', async (req, res) => {
  const { nombre, email, password, rol } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'email y password requeridos' });

  const users = readUsers();
  if (users.find(u => u.email === email)) return res.status(409).json({ error: 'Email ya registrado' });

  const hash = await bcrypt.hash(password, 10);
  const nuevo = {
    id: users.length ? Math.max(...users.map(u => u.id)) + 1 : 1,
    nombre: nombre || '',
    email,
    password: hash,
    rol: rol || 'cliente'
  };
  users.push(nuevo);
  writeUsers(users);

  return res.status(201).json({ id: nuevo.id, email: nuevo.email, rol: nuevo.rol });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const users = readUsers();
  const user = users.find(u => u.email === email);
  if (!user) return res.status(401).json({ error: 'Credenciales inválidas' });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ error: 'Credenciales inválidas' });

  const token = jwt.sign({ id: user.id, email: user.email, rol: user.rol }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES || '1d'
  });
  return res.json({ token, user: { id: user.id, email: user.email, rol: user.rol, nombre: user.nombre } });
});

module.exports = router;

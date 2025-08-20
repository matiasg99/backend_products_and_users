const fs = require('fs');
const path = require('path');
const USERS_PATH = path.join(__dirname, '..', 'data', 'users.json');

function readUsers() {
  if (!fs.existsSync(USERS_PATH)) return [];
  return JSON.parse(fs.readFileSync(USERS_PATH, 'utf8') || '[]');
}
function writeUsers(users) {
  fs.writeFileSync(USERS_PATH, JSON.stringify(users, null, 2));
}

exports.listar = (req, res) => {
  const users = readUsers().map(u => ({ id: u.id, nombre: u.nombre, email: u.email, rol: u.rol }));
  res.json(users);
};

exports.obtener = (req, res) => {
  const id = Number(req.params.id);
  const u = readUsers().find(x => x.id === id);
  if (!u) return res.status(404).json({ error: 'No encontrado' });
  res.json({ id: u.id, nombre: u.nombre, email: u.email, rol: u.rol });
};

exports.crear = (req, res) => {
  return res.status(501).json({ error: 'Usar /auth/register para crear usuarios' });
};

exports.actualizar = (req, res) => {
  const id = Number(req.params.id);
  const users = readUsers();
  const idx = users.findIndex(x => x.id === id);
  if (idx === -1) return res.status(404).json({ error: 'No encontrado' });
  const { nombre } = req.body;
  if (nombre !== undefined) users[idx].nombre = nombre;
  writeUsers(users);
  res.json({ ok: true });
};

exports.eliminar = (req, res) => {
  const id = Number(req.params.id);
  const users = readUsers();
  const left = users.filter(x => x.id !== id);
  if (left.length === users.length) return res.status(404).json({ error: 'No encontrado' });
  writeUsers(left);
  res.json({ ok: true });
};

exports.cambiarRol = (req, res) => {
  const id = Number(req.params.id);
  const { rol } = req.body; // "admin", "cliente", "moderador", etc.
  if (!rol) return res.status(400).json({ error: 'rol requerido' });

  const users = readUsers();
  const idx = users.findIndex(x => x.id === id);
  if (idx === -1) return res.status(404).json({ error: 'No encontrado' });

  users[idx].rol = rol;
  writeUsers(users);
  res.json({ ok: true, id, rol });
};

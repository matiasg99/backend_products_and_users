const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/usuarios.json');

function leerUsuarios() {
  if (!fs.existsSync(dataPath)) return [];
  const data = fs.readFileSync(dataPath, 'utf-8');
  return data ? JSON.parse(data) : [];
}

function guardarUsuarios(usuarios) {
  fs.writeFileSync(dataPath, JSON.stringify(usuarios, null, 2));
}

exports.getAll = (req, res) => {
  const usuarios = leerUsuarios();
  res.json(usuarios);
};

exports.getById = (req, res) => {
  const usuarios = leerUsuarios();
  const usuario = usuarios.find(u => u.id === parseInt(req.params.id));
  if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
  res.json(usuario);
};

exports.create = (req, res) => {
  const usuarios = leerUsuarios();
  const nuevo = { id: Date.now(), ...req.body };
  usuarios.push(nuevo);
  guardarUsuarios(usuarios);
  res.status(201).json(nuevo);
};

exports.update = (req, res) => {
  const usuarios = leerUsuarios();
  const idx = usuarios.findIndex(u => u.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Usuario no encontrado' });
  usuarios[idx] = { ...usuarios[idx], ...req.body };
  guardarUsuarios(usuarios);
  res.json(usuarios[idx]);
};

exports.delete = (req, res) => {
  let usuarios = leerUsuarios();
  const idx = usuarios.findIndex(u => u.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Usuario no encontrado' });
  const eliminado = usuarios.splice(idx, 1);
  guardarUsuarios(usuarios);
  res.json(eliminado[0]);
};

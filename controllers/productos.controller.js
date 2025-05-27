const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/productos.json');

function leerProductos() {
  if (!fs.existsSync(dataPath)) return [];
  const data = fs.readFileSync(dataPath, 'utf-8');
  return data ? JSON.parse(data) : [];
}

function guardarProductos(productos) {
  fs.writeFileSync(dataPath, JSON.stringify(productos, null, 2));
}

exports.getAll = (req, res) => {
  const productos = leerProductos();
  res.json(productos);
};

exports.getById = (req, res) => {
  const productos = leerProductos();
  const producto = productos.find(p => p.id === parseInt(req.params.id));
  if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
  res.json(producto);
};

exports.create = (req, res) => {
  const productos = leerProductos();
  const nuevo = { id: Date.now(), ...req.body };
  productos.push(nuevo);
  guardarProductos(productos);
  res.status(201).json(nuevo);
};

exports.update = (req, res) => {
  const productos = leerProductos();
  const idx = productos.findIndex(p => p.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Producto no encontrado' });
  productos[idx] = { ...productos[idx], ...req.body };
  guardarProductos(productos);
  res.json(productos[idx]);
};

exports.delete = (req, res) => {
  let productos = leerProductos();
  const idx = productos.findIndex(p => p.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Producto no encontrado' });
  const eliminado = productos.splice(idx, 1);
  guardarProductos(productos);
  res.json(eliminado[0]);
};

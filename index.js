require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({ origin: 'http://localhost:3001' }));
app.use(express.json());

const authRoutes = require('./routes/auth');
const usuariosRoutes = require('./routes/usuarios.routes');
const productosRoutes = require('./routes/productos.routes');

app.use('/auth', authRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/productos', productosRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API escuchando en http://localhost:${PORT}`));

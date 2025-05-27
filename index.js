const express = require('express');
const cors = require('cors');
const app = express();
const productosRoutes = require('./routes/productos.routes');
const usuariosRoutes = require('./routes/usuarios.routes');

app.use(cors());
app.use(express.json());

app.use('/api/productos', productosRoutes);
app.use('/api/usuarios', usuariosRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});

const express = require('express');
const { obtenerjoyasPorFiltros, obtenerJoyas } = require('./consultas');
const HandlerDatabaseLogs = require('./logMiddelware');

const app = express();
app.listen(3000, () => console.log('Server ON'));

const OrdernarDatos = (data) => {
  const totalJoyas = data.length;
  const stockTotal = data.reduce((stock, inventario) => stock + inventario.stock, 0);
  const results = data.map(inventario => ({
    nombre: inventario.nombre, 
    link: `/joyas/joya/${inventario.id} `
  }));
  return { totalJoyas, stockTotal, results };
};

app.get('/joyas', HandlerDatabaseLogs, async (req, res) => {
  try {
    const limits = req.query;
    const joyas = await obtenerJoyas(limits);
    const joyasHATEOS = OrdernarDatos(joyas);
    res.json(joyasHATEOS);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/joyas/filtros', HandlerDatabaseLogs, async (req, res) => {
  try {
    const queryStrings = req.query;
    const joyas = await obtenerjoyasPorFiltros(queryStrings);
    const joyasHATEOS = joyas.map(joya => ({
      id: joya.id,
      nombre: joya.nombre,
      categoria: joya.categoria,
      metal: joya.metal,
      precio: joya.precio,
      stock: joya.stock
    }));

    res.json(joyasHATEOS);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



const { Pool } = require("pg");
const format = require('pg-format');

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "12345",
    database: "joyas",
    port: 5432,
    allowExitOnIdle: true
});



const obtenerJoyas = async ({ limits = 10, order_by = "id_ASC", page = 0 }) => {

    const [campo, direccion] = order_by.split("_")
    const offset = page * limits

    const formattedQuery = format(
        `SELECT * FROM inventario order by %s %s LIMIT %s OFFSET %s`,
        campo,
        direccion,
        limits,
        offset
    );

    const { rows: joyas } = await pool.query(formattedQuery)
    return joyas
}



const obtenerjoyasPorFiltros = async ({ precio_min, precio_max, categoria, metal }) => {
    let filtros = [];
    let valores = [];

    // Filtrar por precio mínimo
    if (precio_min) {
        filtros.push(`precio >= $${filtros.length + 1}`);
        valores.push(precio_min);
    }
    // Filtrar por precio máximo
    if (precio_max) {
        filtros.push(`precio <= $${filtros.length + 1}`);
        valores.push(precio_max);
    }
    // Filtrar por categoría
    if (categoria) {
        filtros.push(`categoria ILIKE $${filtros.length + 1}`);
        valores.push(`%${categoria}%`);
    }
    // Filtrar por metal
    if (metal) {
        filtros.push(`metal ILIKE $${filtros.length + 1}`);
        valores.push(`%${metal}%`);
    }

    let consulta = "SELECT id, nombre, categoria, metal, precio, stock FROM inventario";
    if (filtros.length > 0) {
        filtros = filtros.join(" AND ");
        consulta += ` WHERE ${filtros}`;
    }

    try {
        const { rows: inventario } = await pool.query(consulta, valores);
        return inventario;
    } catch (error) {
        console.error('Error ejecutando la consulta:', error);
        throw error;
    }
};

module.exports = { obtenerJoyas, obtenerjoyasPorFiltros }
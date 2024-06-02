paso 1: ejecutar npm run dev en archivo base

paso 2: abrrir y crear base de datos del archivo script.sql
paso 3: ejecutar comandos del archivo index.rest los Send Request

comprobar los limites y paginas:

GET http://127.0.0.1:3000/joyas?limits=3&page=1&order_by=stock_ASC
GET http://127.0.0.1:3000/joyas?limits=6&page=0&order_by=stock_ASC

Content-Type: application/json

### 

Aplicar filtros:

GET http://127.0.0.1:3000/joyas/filtros?precio_min=25000&precio_max=30000&categoria=aros&metal=plata
GET http://127.0.0.1:3000/joyas/filtros?precio_min=35000&precio_max=50000&categoria=anillo&metal=oro

Content-Type: application/json

### 

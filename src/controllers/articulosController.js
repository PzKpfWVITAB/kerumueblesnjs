const controller = {};

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send(err);
        }
        conn.query('SELECT * FROM ARTICULO', (err, articulos) => {
            if (err) {
                return res.status(500).send(err);
            }
            conn.query('SELECT * FROM CATEGORIA', (err, categorias) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.render('../views/articulos.ejs', { data: articulos, categorias: categorias });
            });
        });
    });
};

controller.save = (req, res) => {
    const { nombre, descripcion, tipo, precio, existencia, categoria } = req.body; // Extraer datos del formulario
    const nuevoArticulo = { nombre, descripción: descripcion, tipo, precio, existencia, CATEGORIA_id_categoria: categoria };
    console.log(nuevoArticulo);
    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send(err);
        }
        conn.query('INSERT INTO ARTICULO SET ?', [nuevoArticulo], (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/catsview'); // Redirigir al listado después de guardar
        });
    });
};

controller.delete = (req, res) => {
    const { id } = req.params; // Obtener el ID del articulo desde los parámetros de la URL
    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send(err);
        }
        conn.query('DELETE FROM ARTICULO WHERE id_articulo = ?', [id], (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/catsview'); // Redirigir al listado después de eliminar
        });
    });
};

controller.update = (req, res) => {
    const { id } = req.params;  // Obtener el ID del articulo desde los parámetros de la URL
    const { nombre, descripcion, tipo, precio, existencia, categoria } = req.body;  // Obtener los datos enviados desde el formulario

    // Verificar que los datos estén presentes
    if (!nombre || !descripcion || !tipo || !precio || !existencia || !categoria) {
        return res.status(400).json({ success: false, message: 'Faltan datos.' });
    }

    // Realizar la actualización en la base de datos
    const query = 'UPDATE ARTICULO SET nombre = ?, descripción = ?, tipo = ?, precio = ?, existencia = ?, CATEGORIA_id_categoria = ? WHERE id_articulo = ?';
    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send(err);
        }
        conn.query(query, [nombre, descripcion, tipo, precio, existencia, categoria, id], (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            if (result.affectedRows > 0) {
                return res.json({ success: true });  // Responder con éxito
            } else {
                return res.status(404).json({ success: false, message: 'Articulo no encontrado.' });
            }
        });
    });
};

module.exports = controller;

const controller = {};

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send(err);
        }
        conn.query('SELECT * FROM categoria', (err, rows) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('../views/categorias.ejs', { data: rows });
        });
    });
};

controller.save = (req, res) => {
    const {nombre} = req.body; // Extraer datos del formulario
    const nuevocategoria = {nombre};
    console.log(nuevocategoria);
    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send(err);
        }
        conn.query('INSERT INTO categoria SET ?', [nuevocategoria], (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/catsview'); // Redirigir al listado después de guardar
        });
    });
};

controller.delete = (req, res) => {
    const { id } = req.params; // Obtener el ID del categoria desde los parámetros de la URL
    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send(err);
        }
        conn.query('DELETE FROM categoria WHERE id_categoria = ?', [id], (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/catsview'); // Redirigir al listado después de eliminar
        });
    });
};

controller.update = (req, res) => {
    const { id } = req.params;  // Obtener el ID del categoria desde los parámetros de la URL
    const { nombre, correo, direccion } = req.body;  // Obtener los datos enviados desde el categoria

    // Verificar que los datos estén presentes
    if (!nombre) {
        return res.status(400).json({ success: false, message: 'Faltan datos.' });
    }

    // Realizar la actualización en la base de datos
    const query = 'UPDATE categoria SET nombre = ? WHERE id_categoria = ?';
    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send(err);
        }
        conn.query(query, [nombre, id], (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            if (result.affectedRows > 0) {
                return res.json({ success: true });  // Responder con éxito
            } else {
                return res.status(404).json({ success: false, message: 'categoria no encontrado.' });
            }
        });
    });
};


module.exports = controller;

const controller = {};

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send(err);
        }
        conn.query('SELECT * FROM cliente', (err, rows) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('../views/clientes.ejs', { data: rows });
        });
    });
};

controller.save = (req, res) => {
    const { nombre, correo, contraseña, direccion } = req.body; // Extraer datos del formulario
    const nuevoCliente = { nombre, correo, contraseña, direccion };
    console.log(nuevoCliente);
    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send(err);
        }
        conn.query('INSERT INTO cliente SET ?', [nuevoCliente], (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/cltsview'); // Redirigir al listado después de guardar
        });
    });
};

controller.delete = (req, res) => {
    const { id } = req.params; // Obtener el ID del cliente desde los parámetros de la URL
    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send(err);
        }
        conn.query('DELETE FROM cliente WHERE id_cliente = ?', [id], (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/cltsview'); // Redirigir al listado después de eliminar
        });
    });
};

controller.update = (req, res) => {
    const { id } = req.params;  // Obtener el ID del cliente desde los parámetros de la URL
    const { nombre, correo, direccion } = req.body;  // Obtener los datos enviados desde el cliente

    // Verificar que los datos estén presentes
    if (!nombre || !correo || !direccion) {
        return res.status(400).json({ success: false, message: 'Faltan datos.' });
    }

    // Realizar la actualización en la base de datos
    const query = 'UPDATE cliente SET nombre = ?, correo = ?, direccion = ? WHERE id_cliente = ?';
    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send(err);
        }
        conn.query(query, [nombre, correo, direccion, id], (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            if (result.affectedRows > 0) {
                return res.json({ success: true });  // Responder con éxito
            } else {
                return res.status(404).json({ success: false, message: 'Cliente no encontrado.' });
            }
        });
    });
};


module.exports = controller;

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

module.exports = controller;

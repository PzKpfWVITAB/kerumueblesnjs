const controller = {};

controller.getAllPedidos = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send(err);
        }
        conn.query('SELECT * FROM pedido', (err, rows) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('../views/pedidos.ejs', { data: rows });
        });
    });
};

controller.savePedido = (req, res) => {
    const { estatus, fecha, fecha_entrega, fecha_recogida, metodo, metodo_desc, recargo, total } = req.body;
    const nuevoPedido = { estatus, fecha, fecha_entrega, fecha_recogida, metodo, metodo_desc, recargo, total };
    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send(err);
        }
        conn.query('INSERT INTO pedido SET ?', [nuevoPedido], (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/pedidos');
        });
    });
};

controller.editPedido = (req, res) => {
    const { id } = req.params;
    const { estatus, fecha, fecha_entrega, fecha_recogida, metodo, metodo_desc, recargo, total } = req.body;
    const query = 'UPDATE pedido SET estatus = ?, fecha = ?, fecha_entrega = ?, fecha_recogida = ?, metodo = ?, metodo_desc = ?, recargo = ?, total = ? WHERE id_pedido = ?';
    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send(err);
        }
        conn.query(query, [estatus, fecha, fecha_entrega, fecha_recogida, metodo, metodo_desc, recargo, total, id], (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            if (result.affectedRows > 0) {
                return res.json({ success: true });
            } else {
                return res.status(404).json({ success: false, message: 'Pedido no encontrado.' });
            }
        });
    });
};

controller.deletePedido = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send(err);
        }
        conn.query('DELETE FROM pedido WHERE id_pedido = ?', [id], (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/pedidos');
        });
    });
};

module.exports = controller;
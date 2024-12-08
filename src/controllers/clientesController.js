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

controller.delete = (req, res) => {
    res.send('eliminamos una cliente');
};

controller.save = (req, res) => {
    res.send('agregamos un cliente');
};

module.exports = controller;

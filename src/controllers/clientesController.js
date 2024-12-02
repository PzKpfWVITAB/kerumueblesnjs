const controller = {};

controller.list = (req,res) => {
    res.render('../views/clientes.ejs');
};

controller.delete = (req,res) => {
    res.send('eliminamos una cliente');
};

controller.save = (req,res) => {
    res.send('agregamos un cliente');
};

module.exports = controller;
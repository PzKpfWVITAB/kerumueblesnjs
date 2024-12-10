const controller = {};

controller.home = (req, res) => {
    res.render('home.ejs');
};

module.exports = controller;
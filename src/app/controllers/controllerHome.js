const controllersIndex = {
    CargarVistaHome: async (req, res) => {
        res.render('index', { title: 'Express' });
   },
}

module.exports = controllersIndex;
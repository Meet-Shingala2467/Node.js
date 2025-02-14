const exprss = require('express');

const routes = exprss.Router();

const {addpage , viewpage }= require('../controllers/crudController')
routes.get('/',viewpage);
routes.get('/add', addpage)

module.exports=routes;
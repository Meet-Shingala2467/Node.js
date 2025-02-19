const express = require('express');
const { LoginPage, RegisterPage, DashboardPage, registerUser, loginUser, Logout } = require('../controllers/Authcontroller');

const routes = express.Router();

routes.get('/', LoginPage);
routes.get('/register', RegisterPage);
routes.get('/dashboard', DashboardPage);
routes.post('/registerUser', registerUser);
routes.post('/loginUser', loginUser);
routes.post('/logout', Logout);

module.exports = routes;

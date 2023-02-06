module.exports = (app) => {
    const userController = require('../controllers/user.controller');

    const router = require('express').Router();

    router.get('/signin', userController.signIn)

    app.use('/api', router);
}
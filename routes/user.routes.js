module.exports = (app) => {
    const userController = require('../controllers/user.controller');

    const router = require('express').Router();

    router.post('/signup', userController.signUp)

    router.post('/signin', userController.signIn)

    router.post('/signout', userController.signOut)

    app.use('/api', router);
}
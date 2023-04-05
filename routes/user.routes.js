module.exports = (app) => {
    const userController = require('../controllers/user.controller');
    const authorization = require('../middleware/authorization-middleware');

    const router = require('express').Router();

    router.post('/signup', userController.signUp)

    router.post('/signin', userController.signIn)

    router.post('/signout', userController.signOut)

    router.get('/user-details', authorization(), userController.getUserDetails)

    app.use('/api', router);
}
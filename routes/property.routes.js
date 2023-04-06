module.exports = (app) => {
    const propertyController = require('../controllers/property.controller');
    const authorization = require('../middleware/authorization-middleware');

    const router = require('express').Router();

    router.post('/addproperty', authorization(), propertyController.addProperty);

    router.get('/property', authorization(), propertyController.getAllProperty);

    router.get('/property-id/:id', authorization(), propertyController.getPropertyById);

    router.get('/property-category/:category', authorization(), propertyController.getPropertyByCategory);

    router.delete('/property-id/:id', authorization(), propertyController.deleteProperty);

    router.patch('/edit-property/:id', authorization(), propertyController.editProperty);

    app.use('/api', router); 
}
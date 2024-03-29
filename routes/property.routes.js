module.exports = (app) => {
  const propertyController = require("../controllers/property.controller");
  const authorization = require("../middleware/authorization-middleware");

  const router = require("express").Router();

  router.post("/addproperty", authorization(), propertyController.addProperty);

  router.get("/property", propertyController.getAllProperty);

  router.get(
    "/property-id/:id",
    authorization(),
    propertyController.getPropertyById
  );

  router.get(
    "/property-category/:category",
    authorization(),
    propertyController.getPropertyByCategory
  );

  router.get(
    "/property/:city",
    authorization(),
    propertyController.getPropertyByCity
  );

  router.delete(
    "/property-id/:id",
    authorization(),
    propertyController.deleteProperty
  );

  router.patch(
    "/edit_property/:id",
    authorization(),
    propertyController.editProperty
  );

  router.get(
    "/property-filters/:city?/:rent?/:category?/:gender?",
    authorization(),
    propertyController.propertyFilters
  );

  app.use("/api", router);
};

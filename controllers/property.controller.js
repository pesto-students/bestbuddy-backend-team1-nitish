const jwt = require("jsonwebtoken");

const db = require("../models/index");
const property = db.property;
const validator = require("../middleware/validation-middleware");
const { addPropertyValidator } = require("../utils/validation-schema");
const { uploadImage } = require("../uploads/uploads");
const { Types } = require("mongoose");

exports.addProperty = async (req, res) => {
  try {
    validator(
      req.body,
      addPropertyValidator.rules,
      addPropertyValidator.customError,
      async (err, status) => {
        const { ObjectId } = Types;

        if (!status) {
          res.status(412).send({
            success: false,
            message: Object.values(err.errors)[0][0],
          });
        } else {
          const decode = jwt.verify(
            req.headers["access-token"],
            process.env.PRIVATEKEY
          );

          //upload the local image to cloundinary.
          const image = req.body.image;
          var imageUrlList = [];
          for (var i = 0; i < image.length; i++) {
            var locaFilePath = image[i];
            var result = await uploadImage(locaFilePath);
            imageUrlList.push(result);
          }

          req.body.user_id = ObjectId(decode.id);
          req.body.user_name = decode.name;
          req.body.image = imageUrlList;

          const newProperty = new property(req.body);
          newProperty
            .save()
            .then(() => {
              res.status(201).send({
                success: true,
                message: "Successfully Added!",
              });
            })
            .catch(() => {
              res.status(400).send({
                success: false,
                message: "Sorry, Property is not added please try again later.",
              });
            });
        }
      }
    );
  } catch (err) {
    res.status(500).send({
      status: false,
      message: "Internal server error, Please try again later!",
    });
  }
};

exports.getAllProperty = (req, res) => {
  try {
    property.find().then((data) => {
      res.status(200).send({
        status: true,
        data,
      });
    });
  } catch (err) {
    res.status(500).send({
      status: false,
      message: "Internal server error, Please try again later!",
    });
  }
};

exports.getPropertyByCategory = (req, res) => {
  try {
    const category = req.params.category;
    property.find({ category: category }).then((data) => {
      res.status(200).send({
        status: true,
        data,
      });
    });
  } catch (err) {
    res.status(500).send({
      status: false,
      message: "Internal server error, Please try again later!",
    });
  }
};

exports.getPropertyById = (req, res) => {
  try {
    const Id = req.params.id;
    property.findOne({ _id: Id }).then((data) => {
      res.status(200).send({
        status: true,
        data,
      });
    });
  } catch (err) {
    res.status(500).send({
      status: false,
      message: "Internal server error, Please try again later!",
    });
  }
};

exports.deleteProperty = (req, res) => {
  try {
    const Id = req.params.id;
    property.deleteOne({ _id: Id }).then(() => {
      res.status(200).send({
        status: true,
        message: "Delete Successful",
      });
    });
  } catch (err) {
    res.status(500).send({
      status: false,
      message: "Internal server error, Please try again later!",
    });
  }
};

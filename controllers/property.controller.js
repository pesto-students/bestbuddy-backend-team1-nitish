const jwt = require("jsonwebtoken");

const db = require("../models/index");
const property = db.property;
const validator = require("../middleware/validation-middleware");
const { addPropertyValidator } = require("../utils/validation-schema");
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

          req.body.user_id = ObjectId(decode.id);
          req.body.user_name = decode.name;

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
    const { query } = req;
    let filters = Object.keys(query);
    let match = {};
    let sort_by;
    if (filters?.length > 0) {
      for (let filter of filters) {
        if (filter === "sort_by") {
          sort_by = query[filter] === "desc" ? -1 : 1;
          continue;
        }
        match[filter] = query[filter];
      }
    }
    property
      .find(match)
      .sort({ rent: sort_by })
      .then((data) => {
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

exports.getPropertyByCity = (req, res) => {
  try {
    const city = req.params.city;
    property.find({ city: city }).then((data) => {
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
        message: "Property deleted successfully",
      });
    });
  } catch (err) {
    res.status(500).send({
      status: false,
      message: "Internal server error, Please try again later!",
    });
  }
};

exports.editProperty = async (req, res) => {
  try {
    const _id = req.params.id;
    const updated_property = await property.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    console.log(updated_property);
    return res.status(200).send({ status: true, data: updated_property });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "Internal server error, Please try again later!",
    });
  }
};

exports.propertyFilters = async (req, res) => {
  try {
    const paramValues = await req.params;
    const filterValues = {};

    for (let [key, value] of Object.entries(paramValues)) {
      if (value != undefined && value != "") {
        filterValues[key] = value;
      }
    }

    await property.find(filterValues).then((data) => {
      res.status(200).send({
        status: true,
        data,
      });
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "Internal server error, Please try again later!",
    });
  }
};

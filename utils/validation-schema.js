const userValidator = {
  rules: {
    userName: "required",
    gender: "required",
    number: "required",
    email: "required|email",
    city: "required",
    password: "required|string|min:8",
  },
  customError: {},
};

const loginValidator = {
  rules: {
    email: "required|email",
    password: "required",
  },
  customError: {},
};

const addPropertyValidator = {
  rules: {
    name: "required",
    city: "required",
    phone: "required",
    rent: "required",
    gender: "required",
    category: "required",
    availableDate: "required",
    typeOfShare: "required",
    amenties: "required",
    preferences: "required",
    image: "required",
  },
  customError: {},
};

module.exports = { userValidator, loginValidator, addPropertyValidator };

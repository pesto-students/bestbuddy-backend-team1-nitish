const Validator = require('validatorjs');


const validator = async (data, rules, customMessage, callback) => {
    let validator = new Validator(data, rules, customMessage);
    validator.passes(() => callback(null, true));
    validator.fails(() => callback(validator.errors, false));
}

module.exports = validator;
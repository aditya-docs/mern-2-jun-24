const getQueryErrors = (schema, data) => schema.validate(data).error;

module.exports = getQueryErrors;

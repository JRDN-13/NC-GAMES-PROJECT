const { fetchApiData } = require("../models/api.model");

exports.getApiData = (req, res, next) => {
  fetchApiData()
    .then((endpoints) => {
      res.status(200).send({endpoints});
    })
    .catch(next);
};

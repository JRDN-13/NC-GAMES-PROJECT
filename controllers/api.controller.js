const { fetchApiData } = require("../models/api.model");

exports.getApiData = (req, res, next) => {
  fetchApiData()
    .then((data) => {
      res.status(200).send({data});
    })
    .catch(next);
};

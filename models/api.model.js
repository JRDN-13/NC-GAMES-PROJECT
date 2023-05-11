const db = require("../db/connection");
const fs = require("fs/promises");

exports.fetchApiData = () => {
  return fs.readFile("endpoints.json", "utf-8").then((result) => {
    const jsonObj = JSON.parse(result);
    return jsonObj;
  });
};

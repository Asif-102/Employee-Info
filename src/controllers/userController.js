const db = require("../models");

const User = db.users;

const createUser = async (req, res) => {
  res.status(201).send(req.body);
};

module.exports = { createUser };

const db = require("../models");

const User = db.users;

const createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);

    const token = await newUser.generateAuthToken();

    res.status(201).json({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      token,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { createUser };

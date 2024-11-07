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

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findByCredentials(email, password);

    const token = await user.generateAuthToken();

    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      token,
    });
  } catch (err) {
    res
      .status(400)
      .json({ error: "Unable to login. Please check your credentials." });
  }
};

module.exports = { createUser, loginUser };

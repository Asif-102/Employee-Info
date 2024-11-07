const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [6, 20],
      },
    },
    token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  // Instance method for generating auth token
  User.prototype.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ id: user.id }, "abcdef");

    // Add the new token
    user.token = token;
    await user.save();

    return token;
  };

  User.findByCredentials = async (email, password) => {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error("Unable to login");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error("Unable to login");
    }

    return user;
  };

  User.addHook("beforeSave", async (user, options) => {
    if (user.changed("password")) {
      user.password = await bcrypt.hash(user.password, 8);
    }
  });

  return User;
};

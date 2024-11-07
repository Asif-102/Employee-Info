module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "toor",
  DB: "employee_db",
  dialect: "mysql",

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

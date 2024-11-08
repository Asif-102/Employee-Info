const employeeController = require("../controllers/employeeController");
const auth = require("../middleware/auth");

const router = require("express").Router();

router.post("/createEmployee", auth, employeeController.createEmployee);

module.exports = router;
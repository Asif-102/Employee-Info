const db = require("../models");

const Employee = db.employees;

const createEmployee = async (req, res) => {
  try {
    const newEmployee = await Employee.create(req.body);

    res.status(201).json({
      id: newEmployee.id,
      name: newEmployee.name,
      positionId: newEmployee.positionId,
      positionName: newEmployee.positionName,
      parentId: newEmployee.parentId,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { createEmployee };

const db = require("../models");

const Employee = db.employees;

const getChildren = async (parentId) => {
  const children = await Employee.findAll({
    where: { parentId },
    order: [["positionId", "ASC"]],
  });

  if (children.length > 0) {
    return Promise.all(
      children.map(async (child) => {
        const childData = {
          id: child.id,
          name: child.name,
          positionId: child.positionId,
          positionName: child.positionName,
          child: await getChildren(child.id),
        };
        return childData;
      })
    );
  }

  return null;
};

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

const getEmployeeById = async (req, res) => {
  try {
    const employeeId = req.params.id;
    const employee = await Employee.findByPk(employeeId);

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    const allChildrenData = await getChildren(employeeId);

    const result = allChildrenData.filter((child) => child.id !== employeeId);

    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { createEmployee, getEmployeeById };

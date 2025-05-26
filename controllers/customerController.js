const { validationResult } = require('express-validator');
const db = require('../database/db');

exports.getAllCustomers = (req, res) => {
  db.all("SELECT * FROM customers", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

exports.getCustomerById = (req, res) => {
  const id = req.params.id;
  db.get("SELECT * FROM customers WHERE id = ?", [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ message: "Customer not found" });
    res.json(row);
  });
};

exports.createCustomer = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, phone } = req.body;

  db.run(
    "INSERT INTO customers (name, email, phone) VALUES (?, ?, ?)",
    [name, email, phone],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID, name, email, phone });
    }
  );
};

exports.updateCustomer = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const id = req.params.id;
  const { name, email, phone } = req.body;

  db.run(
    "UPDATE customers SET name = ?, email = ?, phone = ? WHERE id = ?",
    [name, email, phone, id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ message: "Customer not found" });
      res.json({ id, name, email, phone });
    }
  );
};

exports.deleteCustomer = (req, res) => {
  const id = req.params.id;
  db.run("DELETE FROM customers WHERE id = ?", [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ message: "Customer not found" });
    res.json({ message: "Customer deleted successfully" });
  });
};

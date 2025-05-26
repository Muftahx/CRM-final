const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const controller = require('../controllers/customerController');

// Validation rules
const customerValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').notEmpty().withMessage('Phone is required')
];

// Routes with validation
router.get('/', controller.getAllCustomers);
router.get('/:id', controller.getCustomerById);
router.post('/', customerValidation, controller.createCustomer);
router.put('/:id', customerValidation, controller.updateCustomer);
router.delete('/:id', controller.deleteCustomer);

module.exports = router;

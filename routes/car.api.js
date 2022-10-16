const express = require('express');
const { createCar, getCars, editCar, deleteCar } = require('../controllers/car.controller');
const router = express.Router();

// CREATE
/**
 * @route POST api/car
 * @description create a car
 * @access public
 */
router.post('/', createCar);

// READ
/**
 * @route GET api/car
 * @description get list of cars
 * @access public
 */
router.get('/', getCars);

// UPDATE
/**
 * @route PUT api/car
 * @description update a car
 * @access public
 */
router.put('/:id', editCar);

// // DELETE
/**
 * @route DELETE api/car
 * @description delet a car
 * @access public
 */
router.delete('/:id', deleteCar);

module.exports = router;

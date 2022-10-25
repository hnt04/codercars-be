const mongoose = require('mongoose');
const car = require('../models/Car');
const { sendResponse, AppError } = require("../helpers/utils");
const carsController = {};

carsController.createCar = async (req, res, next) => {
	try {
		const carInfo = req.body;

		if (!carInfo) throw new AppError(402, "Bad Request", "Create car Error");

		const created = await car.create(carInfo);
		sendResponse(
			res,
			200,
			true,
			{ car: created },
			null,
			"Create Car Successfully"
		);
	} catch (err) {
		next(err);
	}
};

carsController.getCars = async (req, res, next) => {
	const allowedFilter = ["make","model","release_date","transmission_type","size","style","price"];

	try {
		let { page, limit, ...filterQuery } = req.query;
        page = parseInt(page) || 1
        limit = parseInt(limit) || 10  

        const filterKeys = Object.keys(filterQuery);

        filterKeys.forEach((key) => {
          if (!allowedFilter.includes(key)) {
            const exception = new Error(`Query ${key} is not allowed`);
            exception.statusCode = 401;
            throw exception;
          }
          if (!filterQuery[key]) delete filterQuery[key];
        });
       
    	let listOfFound = await car.find(filterQuery);

		const totalPage = Math.ceil(listOfFound.length/limit);
        const offset = (page - 1)*limit;
  
        listOfFound = listOfFound.slice(offset, offset + limit);

    	sendResponse(
			res,
			200,
			true,
			listOfFound,
			null,
			"Get Car List Successfully!"
    );
	} catch (err) {
		next(err);
	}
};

carsController.editCar = async (req, res, next) => {
	const { id } = req.params;
    const {make,model,release_date,transmission_type,size,style}= req.body;

    const options = { new:true }

	try {
		const updated = await car.findByIdAndUpdate(id, 
			{make,model,release_date,transmission_type,size,style}, 
			options);

    	sendResponse(res,200,true,updated,null,"Update Car Successfully!"
    );
	} catch (err) {
		next(err);
	}
};

carsController.deleteCar = async (req, res, next) => {
		const {id} = req.params;
		const options = { new: true };
 	 try {
    const updated = await car.findByIdAndDelete(id, options);
    sendResponse(
		res,
		200,
		true,
		{ car: updated },
		null,
		"Delete Car Successfully!"
    );
	} catch (err) {
		next(err);
	}
};

module.exports = carsController;

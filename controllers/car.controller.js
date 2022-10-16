const mongoose = require('mongoose');
const car = require('../models/Car');
const { sendResponse, AppError } = require("./helpers/utils.js");
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
	const filter = {};

	try {
		car.f;
    	const listOfFound = await car.find(filter).limit(2);
    	sendResponse(
			res,
			200,
			true,
			{ car: listOfFound, page: 1, total: 1192 },
			null,
			"Get Car List Successfully!"
    );
	} catch (err) {
		next(err);
	}
};

carsController.editCar = async (req, res, next) => {
	const targetId = null;
  	const updateInfo = "";

  	const options = { new: true };
	try {
		const updated = await car.findByIdAndUpdate(targetId, updateInfo, options);
    	sendResponse(res,200,true,{ car: updated },null,"Update Car Successfully!"
    );
	} catch (err) {
		next(err);
	}
};

carsController.deleteCar = async (req, res, next) => {
		const targetId = null;
		const options = { new: true };
 	 try {
    const updated = await car.findByIdAndDelete(targetId, options);
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

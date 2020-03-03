var carModel = require('../models/carModel.js');

/**
 * carController.js
 *
 * @description :: Server-side logic for managing cars.
 */
module.exports = {

    /**
     * carController.list()
     */
    list: async function (req, res) {
        let discountDate = req.query.discountDate;
        let maxPercent = req.query.maxPercent;
        let minPercent = req.query.minPercent;
        let filter = {};
        if(discountDate) {
            filter["discounts.endDate"] = { $gte: discountDate };
            filter["discounts.startDate"] = { $lte: discountDate };
        }
        if (maxPercent) {
            filter["discounts.percent"] = { $lte: maxPercent };
        }
        if (minPercent) {
            filter["discounts.percent"] = { $gte: minPercent };
        }
        try {
            let cars = await carModel.find(filter).populate("model").exec();
            return res.json(cars);
        } catch (error) {
            return res.status(500).json({
                message: 'Error when getting car.',
                error
            });
        }

        // carModel.find(function (err, cars) {
        //     if (err) {
        //         return res.status(500).json({
        //             message: 'Error when getting car.',
        //             error: err
        //         });
        //     }
        //     return res.json(cars);
        // });
    },

    /**
     * carController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        carModel.findOne({_id: id}, function (err, car) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting car.',
                    error: err
                });
            }
            if (!car) {
                return res.status(404).json({
                    message: 'No such car'
                });
            }
            return res.json(car);
        });
    },

    /**
     * carController.create()
     */
    create: function (req, res) {
        var car = new carModel({
			carDoor : req.body.carDoor,
			color : req.body.color,
            price: req.body.price,
            model: req.body.model,
            discounts: req.body.discounts
        });

        car.save(function (err, car) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating car',
                    error: err
                });
            }
            return res.status(201).json(car);
        });
    },

    /**
     * carController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        carModel.findOne({_id: id}, function (err, car) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting car',
                    error: err
                });
            }
            if (!car) {
                return res.status(404).json({
                    message: 'No such car'
                });
            }

            car.carDoor = req.body.carDoor ? req.body.carDoor : car.carDoor;
			car.color = req.body.color ? req.body.color : car.color;
			
            car.save(function (err, car) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating car.',
                        error: err
                    });
                }

                return res.json(car);
            });
        });
    },

    /**
     * carController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        carModel.findByIdAndRemove(id, function (err, car) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the car.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};

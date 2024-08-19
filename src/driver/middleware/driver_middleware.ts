import { check } from "express-validator";


export class DriverValidation{

    createDriverValidation(){
        return [
            check('name').trim().not().isEmpty().withMessage('Pease provide driver name'),
            check('email').trim().not().isEmpty().withMessage('Pease provide email').isEmail().withMessage('Please provide valid email'),
            check('phone').trim().not().isEmpty().withMessage('Pease provide phone'),
            check('vehicleType').trim().not().isEmpty().withMessage('Pease provide vehicle type.').isIn(['van','bike']).withMessage('Please provide valid vehicle'),
            check('status').trim().not().isEmpty().withMessage('Pease provide status.').isIn(['active', 'inactive']).withMessage('Please provide valid status'),
        ]
    }

    deleteDriverValidation(){
        return [
            check('driverId').trim().not().isEmpty().withMessage('Pease provide driver id.'),
        ]
    }

    driverPaymentValidation(){
        return [
            check('driverId').trim().not().isEmpty().withMessage('Pease provide driver id.'),
            check('ordersCompleted').trim().not().isEmpty().withMessage('please provide total order completed.'),
            check('timeSpentOnline').trim().not().isEmpty().withMessage('please provide total time spent.'),
            check('distanceTraveled').trim().not().isEmpty().withMessage('please provide total distance traveled.')
        ]
    }
}

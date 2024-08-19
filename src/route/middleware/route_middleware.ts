import { check } from "express-validator";

export class RouteValidation {

    createUpdateRouteValidation(){
        return [
            check('routeId').trim().optional({ checkFalsy: true }).isString().withMessage('Please provide valid route id.'),
            check('orderId').trim().not().isEmpty().withMessage('Please provide order id.').isString().withMessage('Please provide valid order id.'),
            check('status').trim().not().isEmpty().withMessage('Please provide status').isIn(['pending', 'in-progress', 'completed']).withMessage('Please provide valid status'),
            check('steps.*.location').trim().not().isEmpty().withMessage('Please provide location')
        ]
    }

    getRouteWithOrder(){
        return [
            check('routeId').trim().optional({ checkFalsy: true }).isString().withMessage('Please provide valid route id.')
        ]
    }
    deleteRouteValidation(){
        return [
            check('routeId').not().isEmpty().withMessage('Please provide route id.').isString().withMessage('Please provide valid route id.')
        ]
    }
}
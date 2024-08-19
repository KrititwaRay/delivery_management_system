import { check } from "express-validator";

export class OrderValidation{
    createOrdervalidation(){
        return [
            check('customerName').trim().not().isEmpty().withMessage('Pease provide customer name').isString().withMessage('Please provide valid customer name.'),
            check('deliveryAddress').trim().not().isEmpty().withMessage('Pease provide address'),
            check('orderStatus').trim().not().isEmpty().withMessage('Pease provide order status').isIn(['pending', 'dispatched', 'delivered', 'canceled']).withMessage('Please provide valid order status'),
            check('totalAmount').trim().not().isEmpty().withMessage('Pease provide total amount'),
        ]
    }

    orderListValidation(){
        return [
            check('user_id').optional({ checkFalsy: true }).isString().withMessage('Please provide valid user id')
        ]
    }

    deleteOrderValidation(){
        return [
            check('orderId').trim().not().isEmpty().withMessage('Pease provide order id').isString().withMessage('Please provide valid order id.'),
            check('user_id').trim().not().isEmpty().withMessage('Pease provide user id').isString().withMessage('Please provide valid user id.')
        ]
    }


    updateOrderValidation(){
        return [
            check('orderId').trim().not().isEmpty().withMessage('Pease provide order id').isString().withMessage('Please provide valid order id.'),
            check('customerName').trim().not().isEmpty().withMessage('Pease provide customer name').isString().withMessage('Please provide valid customer name.'),
            check('deliveryAddress').trim().not().isEmpty().withMessage('Pease provide address'),
            check('orderStatus').trim().not().isEmpty().withMessage('Pease provide order status').isIn(['pending', 'dispatched', 'delivered', 'canceled']).withMessage('Please provide valid order status'),
            check('totalAmount').trim().not().isEmpty().withMessage('Pease provide total amount'),
        ]
    }
}
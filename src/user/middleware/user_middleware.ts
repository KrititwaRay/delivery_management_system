import { check } from "express-validator";


export class UserValidation{
    signupValidation(){
        return [
            check('f_name').trim().not().isEmpty().withMessage('Pease provide first name'),
            check('l_name').trim().not().isEmpty().withMessage('Pease provide last name'),
            check('email').trim().not().isEmpty().withMessage('Pease provide email').isEmail().withMessage('Please provide valid email'),
            check('password').trim().not().isEmpty().withMessage('Pease provide password'),
            check('confirm_password').custom((val,{req}) => {
                if(!(val === req.body.password)){
                    throw new Error('Passwords do not match.');
                }
                return true
            }),
            check('role').trim().not().isEmpty().withMessage('Please provide role').isIn(['Admin', 'Driver', 'User']).withMessage('Please provide valid role')
        ]
    }

    loginValidation() {
        return [
            check('email').trim().not().isEmpty().withMessage('Pease provide email').isEmail().withMessage('Please provide valid email'),
            check('password').trim().not().isEmpty().withMessage('Pease provide password')
        ]
    }
}
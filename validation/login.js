const validator = require('validator');
const isEmpty = require('./is-empty');
module.exports = function validateLoginInput(data){
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';




    if(validator.isEmpty(data.email)){
        errors.email = 'Email fields is required';

    }
    if(!validator.isEmail(data.email)){
        errors.email = 'Email is invaild';

    }
    if(validator.isEmpty(data.password)){
        errors.password = 'Password fields is required';

    }

    return {
        errors: errors,
        isValid: isEmpty(errors)
    }
};
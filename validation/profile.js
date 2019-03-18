const validator = require('validator');
const isEmpty = require('./is-empty');
module.exports = function validateProfileInput(data){
    let errors = {};

    data.handle = !isEmpty(data.handle) ? data.handle : '';
    data.status = !isEmpty(data.status) ? data.status : '';
    data.skills = !isEmpty(data.skills) ? data.skills : '';

if(!validator.isLength(data.handle, {min: 2, max: 40})){
    errors.handle = 'Handle needs to be between 2 and 4 characters';


    if(validator.isEmpty(data.handle)){
        errors.handle = 'Profile handle is required.';
    }
    if(validator.isEmpty(data.status)){
        errors.status = 'Status field is required.';
    }
    if(validator.isEmpty(data.skills)){
        errors.skills = 'Skills field is required.';
    }

    if(!isEmpty(data.website)){
    if(!validator.isURL){
        errors.website = 'not a valid url';
    }

    }
    if(!isEmpty(data.youtube)){
        if(!validator.isURL){
            errors.youtube = 'not a valid url';
        }

    }
    if(!isEmpty(data.twitter)){
        if(!validator.isURL){
            errors.twitter = 'not a valid url';
        }

    }
    if(!isEmpty(data.facebook)){
        if(!validator.isURL){
            errors.facebook = 'not a valid url';
        }

    }
    if(!isEmpty(data.instagram)){
        if(!validator.isURL){
            errors.instagram = 'not a valid url';
        }

    }
    if(!isEmpty(data.website)){
        if(!validator.isURL){
            errors.website = 'not a valid url';
        }

    }
    if(!isEmpty(data.linkedin)){
        if(!validator.isURL){
            errors.linkedin = 'not a valid url';
        }

    }
}
    return {
        errors: errors,
        isValid: isEmpty(errors)
    }
};
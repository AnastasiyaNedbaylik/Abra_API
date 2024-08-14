class RegisterResponse{
    response = {
        'token': 'string',
        'email': 'string',
        'id': 'number'
    }

    compare_models(model) {
        for (let key of Object.keys(model)) {
            if (typeof model[key] !== this.response[key]) return false;
        }
        return true;
    }
}

module.exports = new RegisterResponse();
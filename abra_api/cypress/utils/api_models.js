class RegisterResponse{
    response = {
        'token': 'string',
        'email': 'string',
        'id': 'number'
    }

    negative_response = {
        'detail': 'string'
    }

    compare_models(model, pos=true) {
        let response = (pos) ? this.response : this.negative_response;
        for (let key of Object.keys(model)) {
            if (typeof model[key] !== response[key]) return false;
        }
        return true;
    }
}

module.exports = new RegisterResponse();
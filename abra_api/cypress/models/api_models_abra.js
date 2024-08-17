import { compare_models } from '../utils/compare_models';

class RegisterResponse{
        response = {
            "ok": true,
            "result": true,
            "detail": {
                "message": "string"
            }
        }

    negative_response = {
        "detail": [
            {
                "loc": [], // Массив
                "msg": "string",
                "type": "string",
                "ctx": {
                     "pattern": "string"
                }
            }
        ]
    }

    compare_models(model, positive = true) {
        let response = positive ? this.response : this.negative_response;
        return compare_models(model, response);
    }
}

module.exports = new RegisterResponse();
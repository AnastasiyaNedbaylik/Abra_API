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

    negative_responce_existing_email = {
        "detail": "string"
      }

    compare_models(model, positive = true) {
        let response = positive ? this.response : this.negative_response;
        return compare_models(model, response);
    }
}

module.exports = new RegisterResponse();

// Если сравнивать 3 модели
// compare_models(model, responseType = 'positive') {
//     let response;
//     switch(response) {
//         case 'positive':
//             response = this.response;
//             break;
//         case 'negative':
//             response = this.negative_response;
//             break;
//         case 'existing_email':
//             response = this.negative_response_existing_email;
//             break;
//         default:
//             throw new Error('Invalid response type provided for model comparison');
//     }
//     return compare_models(model, response);
//     }


class СonfirmationResponse{
    response = {
        "ok": true,
        "result": true
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

module.exports = new СonfirmationResponse();


class LoginResponse{
    response = {
        "ok":true,
        "result":true
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

module.exports = new LoginResponse();
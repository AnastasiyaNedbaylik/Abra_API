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

module.exports = new RegisterResponse();

    // compare_models(model, positive = true) {
    //     let expectedModel = (positive) ? this.response : this.negative_response;
    
    //     function deepEqual(obj1, obj2) {
    //         if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) {
    //             return obj1 === obj2;
    //         }
    
    //         let keys1 = Object.keys(obj1);
    //         let keys2 = Object.keys(obj2);
    
    //         if (keys1.length !== keys2.length) {
    //             return false;
    //         }
    
    //         for (let key of keys1) {
    //             if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
    //                 return false;
    //             }
    //         }
    
    //         return true;
    //     }
    
    //     return deepEqual(model, expectedModel);
    // }
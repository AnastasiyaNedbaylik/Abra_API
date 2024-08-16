class RegisterResponse2{
    response = {
        "ok": "boolean",
        "result": "boolean",
        "detail": {
            "message": "string"
        }
    }

    negative_response = {
        "detail": [
            {
                "loc": "array",
                "msg": "string",
                "type": "string"
            }
        ]
    }

    compare_models(model, positive = true) {
        let response = (positive) ? this.response : this.negative_response;
        for (let key of Object.keys(response)) {
            if (typeof model[key] !== typeof response[key]) {
                console.log(`Mismatch at key ${key}: expected ${typeof response[key]}, got ${typeof model[key]}`);
                return false;
            }
        }
        return true;
    }

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
}

module.exports = new RegisterResponse2();
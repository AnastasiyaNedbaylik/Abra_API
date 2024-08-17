export function compare_models(model, referenceModel) {
    for (let key of Object.keys(referenceModel)) {
        if (typeof model[key] !== typeof referenceModel[key]) {
            console.log(`Mismatch at key ${key}: expected ${typeof referenceModel[key]}, got ${typeof model[key]}`);
            return false;
        }
    }
    return true;
}
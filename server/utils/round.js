const twoDecimalPlaces = num => typeof num === 'number' ? num.toFixed(2) : 0.00;
const halfDecimalPlace = num => Math.round(num * 2) / 2;

module.exports = {
    twoDecimalPlaces, halfDecimalPlace
}
const round = require('./round');

module.exports = function(watsonScore) {
    const rating = ((watsonScore + 1) / 2) * 5;
    return round.halfDecimalPlace(rating);
}
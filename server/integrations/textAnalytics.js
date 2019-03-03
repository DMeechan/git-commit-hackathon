require('dotenv').config();

const API_KEY = process.env.WATSON_API_KEY
console.log((API_KEY) ? "Found Watson API key" : "ERROR: Could not find Watson API key :(")

const NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
  version: '2018-11-16',
  iam_apikey: API_KEY,
  url: 'https://gateway-lon.watsonplatform.net/natural-language-understanding/api'
});

function getRating(watsonScore) {
  const rating = (((watsonScore + 1) / 2) * 5);
  return Math.round(rating * 100) / 100;
}

function request(text) {
  const parameters = {
    text: text,
    'features': {
      'sentiment': {
        'targets': text.split(' ')
      }
    }

  };

  naturalLanguageUnderstanding.analyze(parameters, function (err, response) {
    if (err) {
      console.log('error:', err);
    } else {
      let score = response['sentiment']['document']['score'];
      score = getRating(score);
      console.log(score);
    }
  });
}


const text = "I think this hackathon was pretty cool. Food was horrible.";
request(text);

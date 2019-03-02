require('dotenv').config();
const API_KEY = process.env.WATSON_API_KEY
console.log("Watson API key:", API_KEY)

const NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
  version: '2018-11-16',
  iam_apikey: API_KEY,
  url: 'https://gateway-lon.watsonplatform.net/natural-language-understanding/api'
});

function outOfFive(n) {
  return (((n + 1) / 2) * 5)
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
      // console.log(response['sentiment']);
      console.log(outOfFive(response['sentiment']['document']['score']));
    }
  });
}


const text = "i think this hackathon is quite cool but they need to improve their vegan options";
request(text);







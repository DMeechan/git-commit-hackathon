// const NLAnalysis = require('watson-developer-cloud/natural-language-understanding/v1.js');
//
// const analysis = new NLAnalysis({
//   'version' : '2018-11-16',
//   'apikey': 'gMelu-T5cMe5Q1-dusX4B-0tEItpD94gTOpEllPIcUZ7',
//   'url' : 'https://gateway-lon.watsonplatform.net/natural-language-understanding/api'
// });
//
// const parameters = {
//   url: 'www.wsj.com/news/markets',
//   features: {
//     sentiment: {
//       'targets': [
//         'stocks'
//       ]
//
//     }
//   }
// };
//
// analysis.analyze(parameters, (err, response) => {
//   if (err) {
//     console.log('error:', err);
//   } else {
//     console.log(JSON.stringify(response, null, 2));
//   }
// });
//
// //   function(err, response) {
// //       if (err){
// //         console.log('error:',err);
// //       }
// //       else{
// //         console.log(JSON.stringify(response, null, 2));
// //       }
// //   }




// fetch("https://gateway-lon.watsonplatform.net/natural-language-understanding/api/v1/analyze?version=2018-03-19", {
//   body: "{  \"text\": \"I still have a dream. It is a dream deeply rooted in the American dream. I have a dream that one day this nation will rise up and live out the true meaning of its creed: \"We hold these truths to be self-evident, that all men are created equal.\\\"\",  \"features\": {    \"sentiment\": {},    \"keywords\": {}  }}",
//   headers: {
//     Authorization: "Basic YXBpa2V5OmdNZWx1LVQ1Y01lNVExLWR1c1g0Qi0wdEVJdHBEOTRnVE9wRWxsUEljVVo3",
//     "Content-Type": "application/json"
//   },
//   method: "POST"
// })

const dotenv = require('dotenv');
dotenv.load({ path: '.env' });
const API_KEY = process.env.WATSON_API_KEY

function outOfFive(n) {
  return (((n+1)/2)*5)
}


function request(url){
  var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
  var naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
    version: '2018-11-16',
    iam_apikey: API_KEY,
    url: 'https://gateway-lon.watsonplatform.net/natural-language-understanding/api'
  });

  var parameters = {
    'url': url,
    'features': {
      'sentiment': {
        'document': false
      }
    }

  };

  naturalLanguageUnderstanding.analyze(parameters, function(err, response) {
    if (err)
      console.log('error:', err);
    else
      console.log(response['sentiment']);
    // console.log(response);
    console.log(outOfFive(response['sentiment']['document']['score']));


  });
}


request('https://www.bbc.co.uk/news/newsbeat-47356852');







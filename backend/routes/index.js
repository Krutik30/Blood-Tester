var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('object');
  res.render('index', { title: 'Express' });
});

router.post('/generate', function(req, res, next){
  console.log('object');
  const prompt = req.body.prompt;
  const maxTokens = 50;

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`,
  };

  const data = {
    prompt: prompt,
    max_tokens: maxTokens,
  };

  axios.post(apiUrl, data, { headers })
    .then(response => {
      res.json({ generatedText: response.data.choices[0].text });
    })
    .catch(error => {
      res.status(500).json({ error: 'An error occurred' });
    });
})

module.exports = router;

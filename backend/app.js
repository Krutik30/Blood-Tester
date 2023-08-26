// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

// var app = express();

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// const port = process.env.PORT || 3000; // Use the PORT environment variable if set
// app.set('port', port);

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app;


const express = require('express');
const cors = require('cors'); // Import the cors middleware
const axios = require('axios')
  
const app = express();
const PORT = 3000;

const corsOptions = {
  origin: 'http://localhost:5173/', // Change this to your React app's URL
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
})

app.get('/', function(req, res, next) {
  res.json({ title: 'Express' });
});

// const apiKey = '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'; // Replace this with your actual API key
// const apiUrl = 'http://api.openai.com/v1/engines/davinci-codex/completions';


app.get('/generate', async function(req, res, next){
  const apiKey = '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';

  // API endpoint URL
  const apiUrl = 'https://api.openai.com/v1/engines/davinci/completions';

  // Prompt to generate completion
  const prompt = "Once upon a time";

  // Max tokens for response
  const maxTokens = 50;

  // Headers for API request
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`,
  };

  // Data for API request
  const data = {
    prompt: prompt,
    max_tokens: maxTokens,
  };

  // Make a POST request to the OpenAI API
  axios.post(apiUrl, data, { headers })
    .then(response => {
      const generatedText = response.data.choices[0].text;
      console.log('Generated Text:', generatedText);
    })
    .catch(error => {
      console.error('Error:', error);
    });
})

  
app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);
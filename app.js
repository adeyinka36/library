'use strict';

// load modules
const express = require('express');
const morgan = require('morgan');
const router = require('./routes')
const bodyParser = require('body-parser');




// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// create the Express app
const app = express();
const cors=require('cors')

// setup morgan which gives us http request logging

app.use(cors())
app.use(bodyParser.json());

// app.use((req,res,next)=>{
//   res.header("Access-Control-Allow-Origin","*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
//   if(req.method==="OPTIONS"){
//     res.header("Access-Control-Allow-Methods","PUT,POST,PATCH,DELETE,GET");
//     return res.status(200).json({});
//   }
           
 
//   next()
// })

// TODO setup your api routes here
app.use("/api/",router)




if(process.env.NODE_ENV==="production"){
  app.use(express.static('client/build'))

  app.get('*',(req,res)=>{
      res.sendFile(path.resolve(__dirname,'client','build','index.html'))
  })
}

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {err},
  });
});

// set our port
app.set('port', process.env.PORT || 5000);






// start listening on our port and connecting to database
const server = app.listen(app.get('port'),async  () => {
  try{
  console.log(`App is connected to database`)
  console.log(`Express server is listening on port ${server.address().port}`);
  }catch(err){
    console.error(`error connecting to database: ${err}`)
  }
});



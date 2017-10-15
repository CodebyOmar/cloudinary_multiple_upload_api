const app         = require('express')()
      ,bodyParser = require('body-parser')
      ,apiRoutes  = require('./routes/api.js')
      ,config     = require('./config').app;

/*configure app to use body-parser*/
app.use(bodyParser.urlencoded({extended:true}))      
app.use(bodyParser.json())    

/*configuring our application routes*/
app.use('/api/v1', apiRoutes);

/*tells our application to listen on the specified port*/
app.listen(config.port);
console.log("App running on port" + config.port)

const express = require('express')
const app = express()
const path = require('path')
const port = process.env.PORT || 8000
const index = require('./routes/index.js')

var options = {};


// Static files will be stored in the folder 'public'
app.use( express.static('public'));

// Access them via the /static path
app.use('/static', express.static('public'));

// Set the view engine to PUG
app.set("view engine", "pug");

// set views folder
app.set('views', 'views');





// create the router object and hand it off to Express
let router;
router = express.Router();
index.IndexRoute.create(router);
app.use(router);



app.listen(port, () => console.log(`Express app listening on port ${port}!`))

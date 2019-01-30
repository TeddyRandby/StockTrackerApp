const express = require('express')
const app = express()
const path = require('path')
const port = process.env.PORT || 8000

var options = {};


// Static files will be stored in the folder 'public'
app.use( express.static('public'));

// Access them via the /static path
app.use('/static', express.static('public'));

// set views folder
app.set('views', 'views');

// Home Page
app.get('/', (req,res) => {

  res.render("index.pug")

});


app.listen(port, () => console.log(`Express app listening on port ${port}!`))

const express = require('express');
require('dotenv').config();
const methodOverride = require("method-override");

const PORT = process.env.PORT || 4000;
const app = express();
const budget = require('./models/budget')

//set static access to the css
app.use(express.static("public", {maxAge: 20000})); 
//set up body-parser middleware
app.use(express.urlencoded())
//include the method-override package
app.use(methodOverride("_method"));

// -----------------Set up jQuery in Node.js-------------------------
// 1. npm i jquery
// 2. npm i jsdom
// 3. import jsdom module by using require
const jsdom = require("jsdom");
// 4. creating a window with a document
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;
// 5. import jQuery and providing it with the window
const $ = require("jquery")(window);




// -------------SET ROUTES---------------
app.get('/', (req, res) => {
    let sum=0;
    budget.map((data, index) => {
        
        console.log(data.amount);
        sum += parseInt(data.amount);
    });
    console.log(sum)
    
    res.render('index.ejs', {data: budget, sum: sum})
});

app.get('/new', (req, res) => {
    res.render('new.ejs');
});

app.get('/:index', (req, res) => {
    const data = budget[req.params.index]
    console.log("data:",data)
    res.render('show.ejs', {data: data})
});

app.post('/',(req,res)=>{
    budget.push(req.body);
    res.redirect('/')
  })


app.listen(PORT, () => {
    console.log(`port ${PORT} is connected...`);
})
var phantom = require('phantomjs')
var express = require('express');
var jsdom = require('jsdom')
const {JSDOM} = jsdom;
const bodyParser = require('body-parser');
var d3 = require('d3');
var app = express();
var fs = require('fs');

//app.use(express.compress());
//app.use(express.json());
var public_dir = __dirname + '/public';
console.log(public_dir);
app.use(express.static(public_dir));
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine','ejs');


//server = require('webserver').create();
const svgDrawer = require('./src/generator.js')


app.get('/', function (req, res) {
  res.render('index', {title: 'Test Node Phantom Express'});
});

//route: post: /query_url
app.post('/',function(req, res){
 
  console.log("In Post:"+ req.body.url);
  var urlToProcess = req.body.url;
  console.log("url:"+urlToProcess);
  if(urlToProcess===undefined || urlToProcess=='') 
     urlToProcess=public_dir+"/pnggrad16rgb.png";
  console.log("url:->"+urlToProcess);
 
 // res.setHeader('Content-Type','image/png')
  //res.setHeader('Content-Type','image/svg+xml')
  //res.sendFile(urlToProcess)
  svgHtml = svgDrawer();
  res.write(svgHtml);

});



app.get('/getd3svg',function(req,res){
  svgHtml = svgDrawer();
  res.write(svgHtml);
})



app.listen(3000, function () {
  console.log('Listening on port 3000!');
});

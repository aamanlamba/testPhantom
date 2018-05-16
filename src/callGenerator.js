var port,server,page,url, fs = require('fs');
port = 9495;
server = require('webserver').create();

//import {svgDrawer} from './generator.js'

 page = require('webpage').create();
 url = 'file://' + fs.absolute('./index.html');


/** 
 * Draw SVG
*/
var svgDrawer = function(data) {
   var svgContainer = document.getElementById("svg");
   var paper = Raphael(svgContainer, 640, 480);
   paper
      .rect(data.x, data.y, 640, 480, 10)
      .attr({
         fill: '#fff',
         stroke: 'none'
    });
   var circle = paper
                .circle(data.x/2, data.y/2, 60)
                .attr({
                   fill: '#223fa3',
                   stroke: '#000',
                   'stroke-width': 80,
                   'stroke-opacity': 0.5
                });
   paper
      .rect(circle.attr('cx') - 10, circle.attr('cy') - 10, 20, 20)
      .attr({
         fill: '#fff',
         stroke: 'none'
    });
    console.log("Svg:"+svgContainer.innerHTML);
   return svgContainer.innerHTML;
};


var service = server.listen(port,function (request,response){
    var drawerPayload = JSON.parse(request.post).data;
    console.log("drawerPayload:"+drawerPayload)
    page.open(url, function(status){
        var svg = page.evaluate(svgDrawer,drawerPayload);
        console.log("svg:"+svg);

        response.statusCode = 200;
        response.write(svg);
        response.close();
    });
});

if(service) {
    console.log("Web server running on port " + port);
} else {
    console.log("Error creating web server");
    phantom.exit();
}


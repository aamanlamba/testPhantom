
/** 
 * Draw SVG
*/
var svgDrawer = module.exports = function() {
    var jsdom = require('jsdom')
const {JSDOM} = jsdom;
    var d3 = require('d3');
    var chartWidth = 500, chartHeight = 500;
var arc = d3.arc()
    .outerRadius(chartWidth / 2 - 10)
    .innerRadius(0);


var colours = ['#F00','#000','#000','#000','#000','#000','#000','#000','#000'];
var pieData = [12, 31];
    const window = (new JSDOM(`<html><head></head><body></body></html>`, { pretendToBeVisual: true })).window;
    window.d3 = d3.select(window.document); //get d3 into the dom

    //do yr normal d3 stuff
    var svg = window.d3.select('body')
        .append('div').attr('class', 'container') //make a container div to ease the saving process
        .append('svg')
        .attr('xmlns', 'http://www.w3.org/2000/svg')
        .attr('width', 'chartWidth')
        .attr('height', 'chartHeight')
        .append('g')
        .attr('transform', 'translate(' + chartWidth / 2 + ',' + chartWidth / 2 + ')');

    svg.selectAll('.arc')
        .data(d3.pie()(pieData))
        .enter()
        .append('path')
        .attr('class', 'arc')
        .attr('d', arc)
        .attr('fill', function(d, i) {
                return colours[i];
            })
        .attr('stroke', '#fff');
   return window.d3.select('body').html();
};


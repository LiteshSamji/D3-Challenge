// @TODO: YOUR CODE HERE!
//Chart dimensions
var svgWidth = 960;
var svgHeight = 620;

var margin = {
    top: 20,
    right: 40,
    bottom: 200,
    left: 100
};

var width = svgWidth - margin.right - margin.left;
var height = svgHeight - margin.top - margin.bot

//Append DIV class to scatter element
var chart = d3.select("#scatter").append("div").classed("chart", true);

// Append an SVG group
var svg = chart.append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

    //initial Parameters
var chosenXAxis = "poverty";
var chosenYAxis = "healthcare";

//retrieve csv data and execute everything below
d3.csv("./assets/data/data.csv").then(function(censusData) {

    console.log(censusData);
//Define chart area
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

    // parse data
    censusData.forEach(function(data) {
        data.healthcare = +data.healthcare;
        data.poverty = +data.poverty;

    //create first linear scales
    var xLinearScale = xScale(censusData, chosenXAxis);
    var yLinearScale = yScale(censusData, chosenYAxis);

    //create initial axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);
    
    //append x axis
    var xAxis = chartGroup.append("g")
        .classed("x-axis", true)
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

    //append y axis
    var yAxis = chartGroup.append("g")
        .classed("y-axis", true)
        .call(leftAxis);

    //append initial text
    var textGroup = chartGroup.selectAll(".stateText")
        .data(censusData)
        .enter()
        .append("text")
        .classed("stateText", true)
        .attr("x", d => xLinearScale(d[chosenXAxis]))
        .attr("y", d => yLinearScale(d[chosenYAxis]))
        .attr("dy", 3)
        .attr("font-size", "10px")
        .text(function(d){return d.abbr});

});
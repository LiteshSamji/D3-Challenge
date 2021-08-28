//Define chart area
var svgWidth = 900;
var svgHeight = 590;

var margin = {
    top: 20,
    right: 40,
    bottom: 200,
    left: 100
};

//calculate chart height and width
var width = svgWidth - margin.right - margin.left;
var height = svgHeight - margin.top - margin.bottom;

//append DIV class to scatter element
var chart = d3.select("#scatter").append("div").classed("chart", true);

//append an svg element to the chart with appropriate height and width
var svg = chart.append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
                    .attr("transform", `translate(${margin.left}, ${margin.top})`);


//Initial parameters
var chosenXAxis = "poverty";
var chosenYAxis = "healthcare";

//function used for updating x-scale var upon clicking on axis label
function xScale(censusData, chosenXAxis) {
    //create scales
    var xLinearScale = d3.scaleLinear()
        .domain([d3.min(censusData, d => d[chosenXAxis]) * 0.8,
            d3.max(censusData, d => d[chosenXAxis]) * 1.2])
        .range([0, width]);

    return xLinearScale;
}

//function used for updating y-scale var upon clicking on axis label
function yScale(censusData, chosenYAxis) {
    //create scales
    var yLinearScale = d3.scaleLinear()
        .domain([d3.min(censusData, d => d[chosenYAxis]) * 0.8,
            d3.max(censusData, d => d[chosenYAxis]) * 1.2])
        .range([height, 0]);

    return yLinearScale;
}




//retrieve csv data and execute everything below
d3.csv("./assets/data/data.csv").then(function(censusData) {
    console.log(censusData);

    // parse data
    censusData.forEach(function(data) {
        data.obesity = +data.obesity;
        data.income = +data.income;
        data.smokes = +data.smokes;
        data.age = +data.age;
        data.healthcare = +data.healthcare;
        data.poverty = +data.poverty;
    });

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

    //create group for 3 x-axis labels
    var xLabelsGroup = chartGroup.append("g")
        .attr("transform", `translate(${width / 2}, ${height + 20 + margin.top})`);
    
    var povertyLabel = xLabelsGroup.append("text")
        .classed("aText", true)
        .classed("active", true)
        .attr("x", 0)
        .attr("y", 20)
        .attr("value", "poverty")
        .text("In Poverty (%)");

        var ageLabel = xLabelsGroup.append("text")
        .classed("aText", true)
        .classed("inactive", true)
        .attr("x", 0)
        .attr("y", 40)
        .attr("value", "age")
        .text("Age (Median)")

    var incomeLabel = xLabelsGroup.append("text")
        .classed("aText", true)
        .classed("inactive", true)
        .attr("x", 0)
        .attr("y", 60)
        .attr("value", "income")
        .text("Household Income (Median)")
     //create group for 3 y-axis labels
     var yLabelsGroup = chartGroup.append("g")
     .attr("transform", `translate(${0 - margin.left/4}, ${(height/2)})`);

     var healthcareLabel = yLabelsGroup.append("text")
     .classed("aText", true)
     .classed("active", true)
     .attr("x", 0)
     .attr("y", 0 - 20)
     .attr("dy", "1em")
     .attr("transform", "rotate(-90)")
     .attr("value", "healthcare")
     .text("Lacks Healthcare (%)");
     var smokesLabel = yLabelsGroup.append("text")
        .classed("aText", true)
        .classed("inactive", true)
        .attr("x", 0)
        .attr("y", 0 - 40)
        .attr("dy", "1em")
        .attr("transform", "rotate(-90)")
        .attr("value", "smokes")
        .text("Smokes (%)");

    var obesityLabel = yLabelsGroup.append("text")
        .classed("aText", true)
        .classed("inactive", true)
        .attr("x", 0)
        .attr("y", 0 - 60)
        .attr("dy", "1em")
        .attr("transform", "rotate(-90)")
        .attr("value", "obesity")
        .text("Obese (%)");




});
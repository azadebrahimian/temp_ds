var margin = { top: 60, right: 40, bottom: 145, left: 50 },
    width = 1000 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#finalviz")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

svg.append("text")
    .attr("x", (width / 2))
    .attr("y", 0 - (margin.top / 2))
    .attr("text-anchor", "middle")
    .style("font-size", "30px")
    .style("text-decoration", "underline")
    .text("Past and Future Event Participation");

// Initialize the X axis
var x = d3.scaleBand()
    .range([0, width])
    .padding(0.2);
var xAxis = svg.append("g")
    .attr("transform", "translate(0," + height + ")")

svg.append("text")
    .attr("transform",
        "translate(" + 30 + " ," +
        (height + margin.top - 10) + ")")
    .attr("font-family", "sans-serif")
    .style("text-anchor", "middle")
    .style("font-size", "18px")
    .style("font-weight", "bold")
    .text("Event");

svg.append("text")
    .attr("class", "y label")
    .attr("x", -200)
    .attr("y", -45)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .attr("font-family", "sans-serif")
    .style("font-size", "18px")
    .style("font-weight", "bold")
    .text("Participation Count");

// Initialize the Y axis
var y = d3.scaleLinear()
    .range([height, 0]);
var yAxis = svg.append("g")
    .attr("class", "myYaxis")

// var svg3 = d3.select("#finalpie")
//     .append("svg")
//     .attr("width", width)
//     .attr("height", height)
//     .append("g")
//     .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// svg3.append("text")
//     .attr("x", 420)
//     .attr("y", 0 - (margin.top / 2) - 50)
//     .attr("text-anchor", "middle")
//     .style("font-size", "30px")
//     .style("text-decoration", "underline")
//     .text("Still Connected to MPF Network?");

function tab1() {

    // Parse the Data
    d3.csv("/csv/past_events.csv", function (finData) {

        x.domain(finData.map(function (d) { return d.Event; }))
        xAxis.call(d3.axisBottom(x))
            .selectAll("text")
            .attr("y", 5)
            .attr("x", 9)
            .attr("dy", ".35em")
            .attr("transform", "rotate(45)")
            .attr("font-family", "sans-serif")
            .style("font-size", "12px")
            .style("text-anchor", "start");

        y.domain([0, 90]);
        yAxis.call(d3.axisLeft(y));

        var tooltip = d3.select('#finalviz')
            .append('div')
            .attr('class', 'tools');

        tooltip.append('div')
            .attr('class', 'lab');

        var mouseover = function (d) {
            tooltip.select('.lab').html(d.Yes + " responded \"Yes\" to: " + d.Event);
            tooltip.style('display', 'block');
            d3.select(this)
                .style("stroke", "black")
                .style("opacity", 0.8);

            id = finData.indexOf(d)
            tab3(id, d.Yes)
            tab3(id, d.Yes)
            tab3(id, d.Yes)
            tab3(id, d.Yes)
        }

        var mouseleave = function (d) {
            tooltip.style('display', 'none');
            d3.select(this)
                .style("stroke", "none")
                .style("opacity", 1)
        }

        var u = svg.selectAll("rect")
            .data(finData)

        u
            .enter()
            .append("rect")
            .merge(u)
            .attr("x", function (d) { return x(d.Event); })
            .attr("y", function (d) { return y(d.Yes); })
            .attr("width", x.bandwidth())
            .attr("height", function (d) { return height - y(d.Yes) - 110; })
            .attr("fill", "#1277c9")
            .on("mouseover", mouseover)
            .on("mouseleave", mouseleave);

        u
            .exit()
            .remove()
    })
}

function tab2() {

    // Parse the Data
    d3.csv("/csv/future_events.csv", function (finData) {

        x.domain(finData.map(function (d) { return d.Event; }))
        x.domain(finData.map(function (d) { return d.Event; }))
        xAxis.call(d3.axisBottom(x))
            .selectAll("text")
            .attr("y", 5)
            .attr("x", 9)
            .attr("dy", ".35em")
            .attr("transform", "rotate(45)")
            .attr("font-family", "sans-serif")
            .style("font-size", "12px")
            .style("text-anchor", "start");

        y.domain([0, 90]);
        yAxis.call(d3.axisLeft(y));

        var tooltip = d3.select('#finalviz')
            .append('div')
            .attr('class', 'tools');

        tooltip.append('div')
            .attr('class', 'lab');

        var mouseover = function (d) {
            tooltip.select('.lab').html(d.Yes + " responded \"Yes\" to: " + d.Event);
            tooltip.style('display', 'block');
            d3.select(this)
                .style("stroke", "black")
                .style("opacity", 0.8);

            id = finData.indexOf(d)
            tab4(id, d.Yes)
            tab4(id, d.Yes)
            tab4(id, d.Yes)
            tab4(id, d.Yes)
        }

        var mouseleave = function (d) {
            tooltip.style('display', 'none');
            d3.select(this)
                .style("stroke", "none")
                .style("opacity", 1)
        }

        var u = svg.selectAll("rect")
            .data(finData)

        u
            .enter()
            .append("rect")
            .merge(u)
            .attr("x", function (d) { return x(d.Event); })
            .attr("y", function (d) { return y(d.Yes); })
            .attr("width", x.bandwidth())
            .attr("height", function (d) { return height - y(d.Yes) - 110; })
            .attr("fill", "#1277c9")
            .on("mouseover", mouseover)
            .on("mouseleave", mouseleave);

        u
            .exit()
            .remove()
    })
}

tab1()
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

var svg3 = d3.select("#finalpie")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

svg3.append("text")
    .attr("x", 420)
    .attr("y", 0 - (margin.top / 2) - 50)
    .attr("text-anchor", "middle")
    .style("font-size", "30px")
    .style("text-decoration", "underline")
    .text("Still Connected to MPF Network?");

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
            .attr("height", function (d) { return height - y(d.Yes); })
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
            .attr("height", function (d) { return height - y(d.Yes); })
            .attr("fill", "#1277c9")
            .on("mouseover", mouseover)
            .on("mouseleave", mouseleave);

        u
            .exit()
            .remove()
    })
}

// function tab3(n, tot) {
//     var radius = Math.min(450, 450) / 2 - 40

//     // Create dummy data
//     d3.csv("/csv/past_events_pie.csv", function (dataa) {
//         dataa.forEach((i) => {
//             delete i.Event
//             i.Yes = Number(i.Yes)
//             i.No = Number(i.No)
//         })
//         data = dataa[n]
//         // set the color scale
//         var color = d3.scaleOrdinal()
//             .domain(data)
//             .range(['#CD534C', '#F3BC00']);

//         // Compute the position of each group on the pie:
//         var pie = d3.pie()
//             .value(function (d) { return d.value; })
//         var data_ready = pie(d3.entries(data))
//         // Now I know that group A goes from 0 degrees to x degrees and so on.

//         // shape helper to build arcs:
//         var arcGenerator = d3.arc()
//             .innerRadius(0)
//             .outerRadius(radius)

//         var tooltip = d3.select('#finalpie')
//             .append('div')
//             .attr('class', 'tooltipp');

//         tooltip.append('div')
//             .attr('class', 'label');

//         tooltip.append('div')
//             .attr('class', 'percent');

//         var mouseover = function (d) {
//             var percent = Math.round(1000 * d.data.value / tot) / 10;
//             tooltip.select('.label').html(d.data.key);
//             tooltip.select('.percent').html(percent + '%');
//             tooltip.style('display', 'block');
//             d3.select(this)
//                 .style("stroke", "black")
//         };

//         var mouseleave = function () {
//             tooltip.style('display', 'none');
//             d3.select(this)
//                 .style("stroke", "none")
//         };

//         // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
//         svg3
//             .selectAll('mySlices')
//             .data(data_ready)
//             .enter()
//             .append('path')
//             .attr('d', arcGenerator)
//             .attr('fill', function (d) { return (color(d.data.key)) })
//             .on("mouseover", mouseover)
//             .on("mouseleave", mouseleave);

//         svg3
//             .selectAll('mySlices')
//             .data(data_ready)
//             .enter()
//             .append('text')
//             .text(function (d) {
//                 if (d.data.value === 0) {
//                     return "";
//                 } else {
//                     return d.data.key;
//                 }
//             })
//             .attr("transform", function (d) { return "translate(" + arcGenerator.centroid(d) + ")"; })
//             .style("text-anchor", "middle")
//             .style("font-size", 17)
//     })
// }

// function tab4(n, tot) {
//     var radius = Math.min(450, 450) / 2 - 40

//     // Create dummy data
//     d3.csv("/csv/future_events_pie.csv", function (dataa) {
//         dataa.forEach((i) => {
//             delete i.Event
//             i.Yes = Number(i.Yes)
//             i.No = Number(i.No)
//         })
//         data = dataa[n]

//         // set the color scale
//         var color = d3.scaleOrdinal()
//             .domain(data)
//             .range(['#CD534C', '#F3BC00']);

//         // Compute the position of each group on the pie:
//         var pie = d3.pie()
//             .value(function (d) { return d.value; })
//         var data_ready = pie(d3.entries(data))
//         // Now I know that group A goes from 0 degrees to x degrees and so on.

//         // shape helper to build arcs:
//         var arcGenerator = d3.arc()
//             .innerRadius(0)
//             .outerRadius(radius)

//         var tooltip = d3.select('#finalpie')
//             .append('div')
//             .attr('class', 'tooltipp');

//         tooltip.append('div')
//             .attr('class', 'label');

//         tooltip.append('div')
//             .attr('class', 'percent');

//         var mouseover = function (d) {
//             var percent = Math.round(1000 * d.data.value / tot) / 10;
//             tooltip.select('.label').html(d.data.key);
//             tooltip.select('.percent').html(percent + '%');
//             tooltip.style('display', 'block');
//             d3.select(this)
//                 .style("stroke", "black");
//         };

//         var mouseleave = function () {
//             tooltip.style('display', 'none');
//             d3.select(this)
//                 .style("stroke", "none");
//         };

//         // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
//         svg3
//             .selectAll('mySlices')
//             .data(data_ready)
//             .enter()
//             .append('path')
//             .attr('d', arcGenerator)
//             .attr('fill', function (d) { return (color(d.data.key)) })
//             .on("mouseover", mouseover)
//             .on("mouseleave", mouseleave);

//         // Now add the annotation. Use the centroid method to get the best coordinates
//         svg3
//             .selectAll('mySlices')
//             .data(data_ready)
//             .enter()
//             .append('text')
//             .text(function (d) {
//                 if (d.data.value === 0) {
//                     return "";
//                 } else {
//                     return d.data.key;
//                 }
//             })
//             .attr("transform", function (d) { return "translate(" + arcGenerator.centroid(d) + ")"; })
//             .style("text-anchor", "middle")
//             .style("font-size", 17)
//     })
// }

tab1()
// tab3(0, 73)
// tab3(0, 73)
// tab3(0, 73)
// tab3(0, 73)
var margin = { top: -50, right: 40, bottom: 145, left: 50 },
    width = 600 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var svg3 = d3.select("#finalpie")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

svg3.append("text")
    .attr("x", 10)
    .attr("y", -150)
    .attr("text-anchor", "middle")
    .style("font-size", "30px")
    .style("text-decoration", "underline")
    .text("Still Connected to MPF Network?");

function tab3(n, tot) {
    var radius = Math.min(350, 350) / 2 - 40

    // Create dummy data
    d3.csv("/csv/past_events_pie.csv", function (dataa) {
        dataa.forEach((i) => {
            delete i.Event
            i.Yes = Number(i.Yes)
            i.No = Number(i.No)
        })
        data = dataa[n]
        // set the color scale
        var color = d3.scaleOrdinal()
            .domain(data)
            .range(['#CD534C', '#F3BC00']);

        // Compute the position of each group on the pie:
        var pie = d3.pie()
            .value(function (d) { return d.value; })
        var data_ready = pie(d3.entries(data))
        // Now I know that group A goes from 0 degrees to x degrees and so on.

        // shape helper to build arcs:
        var arcGenerator = d3.arc()
            .innerRadius(0)
            .outerRadius(radius)

        var tooltip = d3.select('#finalpie')
            .append('div')
            .attr('class', 'tooltipp');

        tooltip.append('div')
            .attr('class', 'label');

        tooltip.append('div')
            .attr('class', 'percent');

        var mouseover = function (d) {
            var percent = Math.round(1000 * d.data.value / tot) / 10;
            tooltip.select('.label').html(d.data.key);
            tooltip.select('.percent').html(percent + '%');
            tooltip.style('display', 'block');
            d3.select(this)
                .style("stroke", "black")
        };

        var mouseleave = function () {
            tooltip.style('display', 'none');
            d3.select(this)
                .style("stroke", "none")
        };

        // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
        svg3
            .selectAll('mySlices')
            .data(data_ready)
            .enter()
            .append('path')
            .attr('d', arcGenerator)
            .attr('fill', function (d) { return (color(d.data.key)) })
            .on("mouseover", mouseover)
            .on("mouseleave", mouseleave);

        svg3
            .selectAll('mySlices')
            .data(data_ready)
            .enter()
            .append('text')
            .text(function (d) {
                if (d.data.value === 0) {
                    return "";
                } else {
                    return d.data.key;
                }
            })
            .attr("transform", function (d) { return "translate(" + arcGenerator.centroid(d) + ")"; })
            .style("text-anchor", "middle")
            .style("font-size", 17)
    })
}

function tab4(n, tot) {
    var radius = Math.min(350, 350) / 2 - 40

    // Create dummy data
    d3.csv("/csv/future_events_pie.csv", function (dataa) {
        dataa.forEach((i) => {
            delete i.Event
            i.Yes = Number(i.Yes)
            i.No = Number(i.No)
        })
        data = dataa[n]

        // set the color scale
        var color = d3.scaleOrdinal()
            .domain(data)
            .range(['#CD534C', '#F3BC00']);

        // Compute the position of each group on the pie:
        var pie = d3.pie()
            .value(function (d) { return d.value; })
        var data_ready = pie(d3.entries(data))
        // Now I know that group A goes from 0 degrees to x degrees and so on.

        // shape helper to build arcs:
        var arcGenerator = d3.arc()
            .innerRadius(0)
            .outerRadius(radius)

        var tooltip = d3.select('#finalpie')
            .append('div')
            .attr('class', 'tooltipp');

        tooltip.append('div')
            .attr('class', 'label');

        tooltip.append('div')
            .attr('class', 'percent');

        var mouseover = function (d) {
            var percent = Math.round(1000 * d.data.value / tot) / 10;
            tooltip.select('.label').html(d.data.key);
            tooltip.select('.percent').html(percent + '%');
            tooltip.style('display', 'block');
            d3.select(this)
                .style("stroke", "black");
        };

        var mouseleave = function () {
            tooltip.style('display', 'none');
            d3.select(this)
                .style("stroke", "none");
        };

        // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
        svg3
            .selectAll('mySlices')
            .data(data_ready)
            .enter()
            .append('path')
            .attr('d', arcGenerator)
            .attr('fill', function (d) { return (color(d.data.key)) })
            .on("mouseover", mouseover)
            .on("mouseleave", mouseleave);

        // Now add the annotation. Use the centroid method to get the best coordinates
        svg3
            .selectAll('mySlices')
            .data(data_ready)
            .enter()
            .append('text')
            .text(function (d) {
                if (d.data.value === 0) {
                    return "";
                } else {
                    return d.data.key;
                }
            })
            .attr("transform", function (d) { return "translate(" + arcGenerator.centroid(d) + ")"; })
            .style("text-anchor", "middle")
            .style("font-size", 17)
    })
}

tab3(0, 73)
tab3(0, 73)
tab3(0, 73)
tab3(0, 73)
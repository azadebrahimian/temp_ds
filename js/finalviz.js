var margin = { top: 10, right: 30, bottom: 20, left: 150 },
    width = 1750 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#finalviz")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data
d3.csv("../csv/past_events.csv", function (data) {

    // List of subgroups = header of the csv files = soil condition here
    var subgroups = data.columns.slice(1)

    // List of groups = species here = value of the first column called group -> I show them on the X axis
    var groups = d3.map(data, function (d) { return (d.Event) }).keys()

    // Add X axis
    var x = d3.scaleBand()
        .domain(groups)
        .range([0, width])
        .padding([0.5])
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickSize(0));

    // Add Y axis
    var y = d3.scaleLinear()
        .domain([0, 165])
        .range([height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));

    // Another scale for subgroup position?
    var xSubgroup = d3.scaleBand()
        .domain(subgroups)
        .range([0, x.bandwidth()])
        .padding([0.05])

    // color palette = one color per subgroup
    var color = d3.scaleOrdinal()
        .domain(subgroups)
        .range(['#e41a1c', '#377eb8'])

    // Show the bars
    svg.append("g")
        .selectAll("g")
        // Enter in data = loop group per group
        .data(data)
        .enter()
        .append("g")
        .attr("transform", function (d) { return "translate(" + x(d.Event) + ",0)"; })
        .selectAll("rect")
        .data(function (d) { return subgroups.map(function (key) { return { key: key, value: d[key] }; }); })
        .enter().append("rect")
        .attr("x", function (d) { return xSubgroup(d.key); })
        .attr("y", function (d) { return y(d.value); })
        .attr("width", xSubgroup.bandwidth())
        .attr("height", function (d) { return height - y(d.value); })
        .attr("fill", function (d) { return color(d.key); });

    svg.append("text")
        .attr("x", (width / 2))
        .attr("y", margin.top)
        .attr("text-anchor", "middle")
        .style("font-size", "30px")
        .style("text-decoration", "underline")
        .text("Event Participation Counts");

    svg.append("circle").attr("cx", 1350).attr("cy", 30).attr("r", 6).style("fill", "#e41a1c")
    svg.append("circle").attr("cx", 1350).attr("cy", 60).attr("r", 6).style("fill", "#377eb8")
    svg.append("text").attr("x", 1370).attr("y", 30).text("Yes").style("font-size", "15px").attr("alignment-baseline", "middle")
    svg.append("text").attr("x", 1370).attr("y", 60).text("No").style("font-size", "15px").attr("alignment-baseline", "middle")
})
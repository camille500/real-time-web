var margin = {
    top: 20,
    right: 20,
    bottom: 70,
    left: 40
  },
  width = 1200 - margin.left - margin.right,
  height = 700 - margin.top - margin.bottom;

var x = d3.scale.ordinal().rangeRoundBands([
  0, width
], .05);
var y = d3.scale.linear().range([height, 0]);
var xAxis = d3.svg.axis().scale(x).orient("bottom")

var yAxis = d3.svg.axis().scale(y).orient("left").ticks(20);

// add the SVG element
var svg = d3.select(".twitter").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

setInterval(function() {

  d3.json("http://localhost:3000/data/live.json", function(error, data) {

    data = data.data;

    console.log(data.data)

    data.forEach(function(d) {
      d.filter = d.filter;
      d.count = +d.count;
    });

    x.domain(data.map(function(d) {
      return d.filter;
    }));
    y.domain([
      0,
      d3.max(data, function(d) {
        return d.count + 10;
      })
    ]);

    svg.selectAll(".xAxis").remove();
    svg.selectAll(".yAxis").remove();

    // add axis
    svg.append("g").attr("class", "xAxis").attr("transform", "translate(0," + height + ")").call(xAxis).selectAll("text").style("text-anchor", "end").attr("dx", "-.8em").attr("dy", "-.55em").attr("transform", "rotate(-90)");

    svg.append("g").attr("class", "yAxis").call(yAxis).append("text").attr("transform", "rotate(-90)").attr("y", 5).attr("dy", ".71em").style("text-anchor", "end").text("Berichten");

    // Add bar chart
    svg.selectAll("bar").data(data).enter().append("rect").attr("class", "bar").attr("x", function(d) {
      return x(d.filter);
    }).attr("width", x.rangeBand()).attr("y", function(d) {
      return y(d.count);
    }).attr("height", function(d) {
      return height - y(d.count);
    });

  });

}, 800);

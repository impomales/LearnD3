var margin = {
  top: 20,
  right: 30,
  bottom: 30,
  left: 40
}
var width = 960 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
  .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
  .scale(x)
  .orient("bottom");

var yAxis = d3.svg.axis()
  .scale(y)
  .orient("left")
  .ticks(10, "%");
    
var chart = d3.select(".chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");
    
function type(d) {
    d.frequency = +d.frequency;
    return d;
}

d3.tsv("data.tsv", type, function(error, data) {
    var data = [
      {letter: 'A', frequency:	0.08167},
      {letter: 'B', frequency:	0.01492},
      {letter: 'C', frequency:	0.02782},
      {letter: 'D', frequency:	0.04253},
      {letter: 'E', frequency:	0.12702},
      {letter: 'F', frequency:	0.02288},
      {letter: 'G', frequency:	0.02015},
      {letter: 'H', frequency:	0.06094},
      {letter: 'I', frequency:	0.06966},
      {letter: 'J', frequency:	0.00153},
      {letter: 'K', frequency:	0.00772},
      {letter: 'L', frequency:	0.04025},
      {letter: 'M', frequency:	0.02406},
      {letter: 'N', frequency:	0.06749},
      {letter: 'O', frequency:	0.07507},
      {letter: 'P', frequency:	0.01929},
    ];
    
    x.domain(data.map(function(d) {return d.letter}));
    y.domain([0, d3.max(data, function(d) {return d.frequency;})]);
    
    chart.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);
  
    chart.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .attr("text-anchor", "end")
        .text("Frequency");
   
    chart.selectAll(".bar")
        .data(data)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) {return x(d.letter);})
        .attr("y", function(d) {return y(d.frequency);})
        .attr("height", function(d) {return height - y(d.frequency);})
        .attr("width", x.rangeBand());
});
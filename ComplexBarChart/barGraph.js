window.onload = function(){
  // var data = [132,71,337,93,78,43,20,16,30,8,17,21];
  var data = [
    {key: "Glazed", value: 132},
    {key: "Jelly", value: 71},
    {key: "Holes", value: 337},
    {key: "Sprinkles", value: 93},
    {key: "Crumb", value: 78},
    {key: "Chocolate", value: 43},
    {key: "Coconut", value: 20},
    {key: "Cream", value: 16},
    {key: "Cruller", value: 30},
    {key: "Eclair", value: 8},
    {key: "Fritter", value: 17},
    {key: "Bearclaw", value: 21}
  ];

  var w = 800;
  var h = 450;
  var margin = {
    top: 40,
    bottom: 20,
    left: 60,
    right: 40
  };

  //width and height of chart
  var width = w - margin.left - margin.right;
  var height = h - margin.top - margin.bottom;

  var x = d3.scaleBand()
          .domain(data.map(function(entry){
              return entry.key;
            }))
          .range([0,width]);

  var y = d3.scaleLinear()
            .domain([0,d3.max(data, function(d){
              return d.value;
            })])
            .range([height,0]);

  //gradient
  var linearColorScale = d3.scaleLinear()
                          .domain([0, data.length])
                          .range(["#572500", "#f68026"]);

  //20 colors
  var ordinalColorScale = d3.scaleOrdinal(d3.schemeCategory20);


  var svg = d3.select('body').append('svg') //select body text-align and append svg tag
              .attr('id', 'chart')
              .attr('width', w)
              .attr('height', h);

  var chart = svg.append('g') //great svg group
              .classed('display', true)
              .attr('transform','translate(' + margin.left + ',' + margin.top +')');



  function plot(params){
    this.append("g")
      .classed("gridline", true)
      .attr("transform", "translate(0,0)")
      .call(d3.axisLeft(y)
        .tickSize(-width)
        .tickFormat(""));

    this.selectAll('.bar')
      .data(params.data) //bind data array
      .enter() //in the enter phase
      .append('rect')
      .classed("bar", true)
      .attr('x', function(d,i){
        return x(d.key); //to spread out columns after flipping axis
      })
      .attr('y', function(d,i){
        //to stagger the bars
        return y(d.value);
        //use y scaling function
      })
      .attr('width', function(d,i){
        //d is data bound to element
        //i is index of the data
        return x.bandwidth();
        //return x(d.value);
        //use x scaling function
      })
      .attr('height', function(d,i){
        return height - y(d.value);
        //return y.bandwidth()-1;
      }) //height of each bar
      .style("fill", function(d,i){
        return ordinalColorScale(i);
        //return linearColorScale(i);
      });
      this.selectAll('.bar-label')
        .data(params.data)
        .enter()
          .append('text')
          .classed('bar-label', true)
          /*.attr('x', function(d,i){
            return x(d.value); // x(d) is width of bar
            //css used to adjust text position
          })*/
          .attr('x', function(d,i){
            return x(d.key) + (x.bandwidth()/2);
          })
          .attr('dx', -4)
          .attr('y', function(d,i){
            return y(d.value);
          })
          /*.attr('dy', function(d,i){
            return y.bandwidth()/1.5+2; //dy used to nudge text position to halfway point
            // y.bandwidth() is height of one bar
          })*/
          .attr('dy', -6)
          .text(function(d){
            return d.value; //display value
          });

      this.append("g")
        .classed('x axis', true)
        .attr("transform", "translate(" + 0 + "," + height + ")")
        .call(d3.axisBottom(x));

      this.append("g")
        .classed('y axis', true)
        .attr("transform", "translate(0,0)")
        .call(d3.axisLeft(y));
  }


  plot.call(chart, {
    data: data
  }); //use .call to change this to svg instead of window

};

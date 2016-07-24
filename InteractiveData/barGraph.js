window.onload = function(){
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
    bottom: 80,
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


  var svg = d3.select('body').append('svg')
              .attr('id', 'chart')
              .attr('width', w)
              .attr('height', h);

  var chart = svg.append('g')
              .classed('display', true)
              .attr('transform','translate(' + margin.left + ',' + margin.top +')');

  var controls = d3.select("body")
                  .append("div")
                  .attr("id", "controls");

  var sort_btn = controls.append("button")
                  .html("Sort data: ascending")
                  .attr("state", 0);

  function plot(params){
    x.domain(data.map(function(entry){
      return entry.key;
    }));
    y.domain([0,d3.max(data, function(d){
      return d.value;
    })]);

    this.append("g")
      .classed("gridline", true)
      .attr("transform", "translate(0,0)")
      .call(d3.axisLeft(y)
        .tickSize(-width)
        .tickFormat(""));

    //enter() phase: where data is bound to elements
    this.selectAll('.bar')
      .data(params.data)
      .enter()
        .append('rect')
        .classed("bar", true);

    this.selectAll('.bar-label')
      .data(params.data)
      .enter()
        .append('text')
        .classed('bar-label', true);


    //update phase: where elements are updated with changing data
    this.selectAll('.bar')
      .attr('x', function(d,i){
        return x(d.key);
      })
      .attr('y', function(d,i){
        return y(d.value);
      })
      .attr('width', function(d,i){
        //d is data bound to element
        //i is index of the data
        return x.bandwidth();
      })
      .attr('height', function(d,i){
        return height - y(d.value);
      })
      .style("fill", function(d,i){
        return ordinalColorScale(i);
      });

    this.selectAll('.bar-label')
      .attr('x', function(d,i){
        return x(d.key) + (x.bandwidth()/2);
      })
      .attr('dx', -4)
      .attr('y', function(d,i){
        return y(d.value);
      })
      .attr('dy', -6)
      .text(function(d){
        return d.value;
      });

    //exit() phase: where any unbound elements are removed
    this.selectAll('.bar')
      .data(params.data)
      .exit()
      .remove();

    this.selectAll('.bar-label')
      .data(params.data)
      .exit()
      .remove();


      this.append("g")
        .classed('x axis', true)
        .attr("transform", "translate(" + 0 + "," + height + ")")
        .call(d3.axisBottom(x))
          .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", -8)
            .attr("dy", 8)
            .attr("transform", "translate(0,0) rotate(-45)");

      this.append("g")
        .classed('y axis', true)
        .attr("transform", "translate(0,0)")
        .call(d3.axisLeft(y));

      this.select(".y.axis")
        .append("text")
        .classed('axisLabel', true)
        .attr("x", 0)
        .attr("y", 0)
        .style("text-anchor", "middle")
        .attr("transform", "translate(-50," + height/2 + ") rotate(-90)")
        .text("Units sold");

      this.select(".x.axis")
        .append("text")
        .classed('axisLabel', true)
        .attr("x", 0)
        .attr("y", 0)
        .style("text-anchor", "middle")
        .attr("transform", "translate(" + width/2 + ", 70)")
        .text("Donut type");
  }

  sort_btn.on("click", function(){
    var self = d3.select(this); //this is the sort_btn
    var ascending = function(a,b){
      return a.value - b.value;
    }
    var descending = function(a,b){
      return b.value - a.value;
    }
    var state = self.attr("state");
    var txt = "Sort sdata: ";
    if(state == 0){
      data.sort(ascending)
      state = 1;
      txt += "descending";
    } else if(state == 1){
      data.sort(descending)
      state = 0;
      txt += "ascending";
    }
    self.attr("state", state);
    self.html(txt);

    plot.call(chart, {
      data: data
    });
  }); //on method allows us to create event listener

  plot.call(chart, {
    data: data
  });
};

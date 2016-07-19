window.onload = function(){
  var w = 800;
  var h = 450;
  var margin = {
    top: 20,
    bottom: 20,
    left: 20,
    right: 20
  }
  var width = w - margin.left - margin.right;
  var height = h - margin.top - margin.bottom;

  var x = d3.scaleLinear()
          .domain([0,d3.max(data)]) //range of values, smallest and largest val
          .range([0,width]);//range is output values that we want to scale to
                        //scale to width of svg element
  var y = d3.scaleLinear()
          .domain([0,data.length])
          .range([0,height]);

  var svg = d3.select('body').append('svg') //select body text-align and append svg tag
              .attr('id', 'chart')
              .attr('width', w)
              .attr('height', h);

  var chart = svg.append('g') //great svg group
              .classed('display', true)
              .attr('transform','translate(' + margin.top + ',' + margin.left +')');

  function plot(params){
    console.log(this)
    this.selectAll('.bar')
      .data(params.data) //bind data array
      .enter() //in the enter phase
      .append('rect')
      .classed("bar", true)
      .attr('x', 0)
      .attr('y', function(d,i){
        //to stagger the bars
        return y(i);
        //use y scaling function
      })
      .attr('width', function(d,i){
        //d is data bound to element
        //i is index of the data
        return x(d);
        //use x scaling function
      })
      .attr('height', function(d,i){
        return y(1)-1;
        //use y scaling function on first element and subtract 1 to add whitespace b/w bars
      }); //height of each bar

      this.selectAll('.bar-label')
        .data(params.data)
        .enter()
          .append('text')
          .classed('bar-label', true)
          .attr('x', function(d,i){
            return x(d); // x(d) is width of bar
            //css used to adjust text position
          })
          .attr('dx', -4)
          .attr('y', function(d,i){
            return y(i);
          })
          .attr('dy', function(d,i){
            return y(1)/1.5+2; //dy used to nudge text position to halfway point
            // y(1) is height of one bar
          })
          .text(function(d,i){
            return d; //display value
          });
  }

  plot.call(chart, {
    data: data
  }); //use .call to change this to svg instead of window

};

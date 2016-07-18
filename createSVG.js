window.onload = function(){
  var w = 800;
  var h = 450;

  scaleData(w,h);
  console.log('x: ' + x);

  var svg = d3.select('body').append('svg') //select body text-align and append svg tag
              .attr('id', 'chart')
              .attr('width', w)
              .attr('height', h);

  svg.selectAll('.bar')
    .data(data) //bind data array
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
};

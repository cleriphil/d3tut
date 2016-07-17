window.onload = function(){
  var w = 800;
  var h = 450;
  var svg = d3.select('body').append('svg') //select body text-align and append svg tag
              .attr('id', 'chart')
              .attr('width', w)
              .attr('height', h);

  svg.selectAll('.bar')
    .data(data) //bind data array
    .enter() //in the enter phase
      .append('rect')
      .attr('class', 'bar')
      .attr('x', 0)
      .attr('y', function(d,i){
        //to stagger the bars
        return i * 20;
      })
      .attr('width', function(d,i){
        //d is data bound to element
        //i is index of the data
          return d;
      })
      .attr('height', 19); //height of each bar
};

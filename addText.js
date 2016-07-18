function addText(svg){
  svg.selectAll('.bar-label')
      .data(data)
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

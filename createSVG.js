window.onload = function(){
  var w = 800;
  var h = 450;
  var svg = d3.select('body').append('svg') //select body text-align and append svg tag
              .attr('id', 'chart')
              .attr('width', w)
              .attr('height', h);
};

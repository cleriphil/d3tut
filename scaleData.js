var x, y;
function scaleData(w,h) {
  x = d3.scaleLinear()
          .domain([0,d3.max(data)]) //range of values, smallest and largest val
          .range([0,w]);//range is output values that we want to scale to
                        //scale to width of svg element
  y = d3.scaleLinear()
          .domain([0,data.length])
          .range([0,h]);
};

// x and y scaling functions used in createSVG.js

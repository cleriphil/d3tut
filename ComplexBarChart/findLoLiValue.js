var data = [132,71,337,93,78,43,20,16,30,8,17,21];
var dataMinValue = d3.min(data);
var dataMaxValue = d3.max(data);
var dataLoHiValue = d3.extent(data);
//console.log(dataMinValue,dataMaxValue,dataLoHiValue);

var donuts = [
  {key: "Glazed", value: 132},
  {key: "Jelly", value: 71},
  {key: "Holes", value: 337},
  {key: "Sprinkles", value: 93},
  {key: "Crumb", value: 78},
  {key: "Chocolate", value: 43},
  {key: "Coconut", value: 20},
  {key: "Cream", value: 16},
  {key: "Eclair", value: 30},
  {key: "Fritter", value: 8},
  {key: "Bearclaw", value: 17},
  {key: "Strawberry", value: 21}
];

var donutsMinValue = d3.min(donuts, function(d){
  //second argument is accessor function
  return d.value;
});
var donutsMaxValue = d3.max(donuts, function(d){
  return d.value;
});
var donutsLoHiValue = d3.extent(donuts, function(d){
  return d.value;
});
console.log(donutsMinValue,donutsMaxValue,donutsLoHiValue);

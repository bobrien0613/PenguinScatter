var getHwGrades=function(penguin)
{
    return penguin.homework
}
var hwMean = function(penguin)
{
    var hwGrades = penguin.homework.map(getHwGrades)
    var hwMean = d3.mean(hwGrades)
    return hwMean
}

var drawPlot = function(penguins,screen,xScale,yScale)
{
    d3.select("#graph")
    .selectAll("circle")
    .data(penguins)
    .enter()
    .append("circle")
    .attr("cx",function(penguin)
         {
        return xScale(penguin.final[0].grade);
    })
    .attr("cy",function(penguin)
         {
        return yScale(hwMean(penguin));
    })
    .attr("r",2)
}


var setBanner=function(message)
{
    d3.select("#banner")
    .text(message);
}

var penguinPromise=d3.json("classData.json");

var initGraph = function(penguins)
{
    var screen = {width:500,height:500}
    
    d3.select("#graph")
    .attr("width",screen.width)
    .attr("height",screen.height)
    
    var xScale = d3.scaleLinear()
    .domain([0,100])
    .range([0,screen.width])
    
    var yScale = d3.scaleLinear()
    .domain([0,100])
    .range([screen.height,0])
    
    drawPlot(penguins,screen,xScale,yScale);
}


var successFCN= function(penguins)
{
    console.log("Penguins",penguins);
    setBanner("Penguins Found")
    initGraph(penguins)
}
var failureFCN= function(error)
{
    console.log("Error",error);
    setBanner("Penguins Not Found")
}
penguinPromise.then(successFCN,failureFCN)
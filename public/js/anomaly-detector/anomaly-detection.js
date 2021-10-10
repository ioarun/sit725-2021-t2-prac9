import { dataReference, dataTest, getStats, stringArray2FloatArray} from "/js/anomaly-detector/utils.js";
import { findAnomaly } from "/js/anomaly-detector/findAnomaly.js";

var mean, std;

const fileUploadBtn = document.getElementById('fileUploadBtn');
// const fileUploadBtnTest = document.getElementById('fileUploadBtnTest');

fileUploadBtn.addEventListener('click', () => {
  // var data = getDataFromCSV('referenceFile') // Here, referenceFile is the Id of element
  // Reference data is 20% of the full data
  console.log(dataReference);
  var data = stringArray2FloatArray(dataReference);
  // var normalData = data.slice(0, 0.20*data.length)
  console.log(data);
  var stats = getStats(data);
  console.log(stats);
  mean = stats[0];
  std = stats[1];
  // Plot data distribution
  plotDataTest(data);
})

fileUploadBtnTest.addEventListener('click', () => {
  console.log(dataTest);
  var data = stringArray2FloatArray(dataTest);
  var anomalyIndices = findAnomaly(data, mean, std);
  plotData(data, anomalyIndices);
})

const getProjects = () => {
  $.get('/api/projects', (response) => {
    if (response.statusCode == 200){
      console.log(response);
      addProjects(response.data);
    }
    else {
      console.log(response);
    }
  }
  )
}

const addProjects = (items) => {
  items.forEach(item => {
    let itemToAppend = 
    '<div class="col l4 s12 m7">'+
    '<div class="card">' +
      '<h1 class="card-title center">'+ item.title + '</h1>' +
      '<div class="card-image">' + 
        '<img src="'+ item.image + '" style="height: 50%; width: 50%; padding-right: 5px; padding-left: 5px;">' +
      '</div>' + 
      '<div class="card-content">' +
        '<p>' + item.description + '</p>' + 
      '</div>' + 
      '<div class="card-action">' + 
        '<a href="'+ item.link +'"><img src="assets/github.png" style="height: 20px; padding-right: 15px;"></i> Checkout the project !</a>' + 
      '</div>' + 
    '</div>' +
  '</div>' ;
  $("#projects").append(itemToAppend);
  });
}

const prepareDataToPlot = (data, anomalyIndices) => {
  var dataPoints = []
  for (let i = 0; i < data.length; i++){
    // console.log(data[i][0]);
    dataPoints.push({y : parseFloat(data[i][0])})
  }

  for (let i = 0; i < anomalyIndices.length; i++){
    dataPoints[anomalyIndices[i]].indexLabel = "";
    dataPoints[anomalyIndices[i]].markerColor = "red";
    dataPoints[anomalyIndices[i]].markerType = "circle";
    dataPoints[anomalyIndices[i]].markerSize = 10;
  }
  console.log(dataPoints);
  return dataPoints
}

const prepareDataToPlotTest = (data) => {
  var dataPoints = []
  for (let i = 0; i < data.length; i++){
    // console.log(data[i][0]);
    dataPoints.push({y : parseFloat(data[i][0])})
  }
  console.log(dataPoints);
  return dataPoints
}

// https://canvasjs.com/html5-javascript-line-chart/
const plotData = (data, anomalyIndices) => {
      console.log(anomalyIndices)
      var timeSeriesData = 
        [{
          type : 'line', 
          indexLabelFontSize : 16, 
          dataPoints: prepareDataToPlot(data, anomalyIndices)
        }];

        var chart = new CanvasJS.Chart("chartContainer", {
          animationEnabled: true,
          theme: "light1",
          title:{
            text: "Anomaly Detection"
          },
          data: timeSeriesData
        });
        
        chart.render();    
}

const plotDataTest = (data) => {
  var timeSeriesData = 
    [{
      type : 'bar', 
      indexLabelFontSize : 16, 
      dataPoints: prepareDataToPlotTest(data)
    }];

    var chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      theme: "light1",
      title:{
        text: "Data distribution"
      },
      data: timeSeriesData
    });
    
    chart.render();    
}
  
// let socket = io();

// socket.on('number', (msg)=>{
//   console.log(msg);
// })


$(document).ready(function(){
  // addProjects(projectList);
  getProjects();
  
  
});
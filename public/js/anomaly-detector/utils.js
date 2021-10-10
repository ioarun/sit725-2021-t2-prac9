var dataReference;
var dataTest;
    
var fileInput = document.getElementById('referenceFile');
var fileInputTest = document.getElementById('testFile');

fileInput.addEventListener('change', function (event) {
    var csvInput = event.target;
    var file = csvInput.files[0];
    Papa.parse(file, {
        complete: function (results) {
        // console.log(results.data); 
        // remove the header
        dataReference = results.data.splice(1, results.data.length);
        console.log(dataReference); 
        }
    });
});

fileInputTest.addEventListener('change', function (event) {
    var csvInput = event.target;
    var file = csvInput.files[0];
    Papa.parse(file, {
        complete: function (results) {
        // console.log(results.data); 
        // remove the header
        dataTest = results.data.splice(1, results.data.length);
        console.log(dataTest); 
        }
    });
});

function getStandardDeviation (array, mean) {
    const n = array.length
    var total = 0
    for (var i = 0; i < array.length; i++){
      total += Math.pow((array[i][0] - mean), 2);
    }
    var std = Math.sqrt(total / (n - 1));
    return std
  }
  
  function getMean(array){
    var total = 0;
    for(var i = 0; i < array.length; i++) {
        total += array[i][0];
    }
    var mean = total / (array.length);
    return mean
  }
  
  const getStats = (referenceData) => {
    var mean = getMean(referenceData);
    var std = getStandardDeviation(referenceData, mean);
    return [mean, std]
  }

  const stringArray2FloatArray = (stringArray) => {
    var floatArray = [];
    for (var i = 0; i < stringArray.length-1; i++){
        floatArray.push([parseFloat(stringArray[i][0])]);
    }
    return floatArray;
  }

const prepareDataToPlotDistribution = (data, mean, std) => {
    var distributionData = [];
    var bins = [mean - 4*std, mean - 3*std, mean - 2*std, mean - std, 
            mean + std, mean + 2*std, mean + 3*std, mean + 4*std];
    for (var i = 0; i < bins.length - 1; i++){
        var freq = 0;
        for (var j = 0; j < data.length; j++){
            if (data[j][0] > bins[i] && data[j][0] < bins[i+1]){
                freq += 1;
            }
        }
        distributionData.push(freq);
    }
    return distributionData;
  }
export { dataReference, dataTest, getStats, stringArray2FloatArray}

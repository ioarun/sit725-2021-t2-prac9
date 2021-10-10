export const findAnomaly = (data, mean, std) => {
    var threeStd = 3*std;
    var anomalyIndices = [];
    for (var i = 0; i < data.length; i++){
        if (data[i][0] > (mean + threeStd)){
            anomalyIndices.push(i);
        }
    }
    return anomalyIndices;
  }
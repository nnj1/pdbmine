var miner = require('./pdbmine');
var plotly = require('plotly')('nnj1', 'qNWRTvydjaDRDLUrXamR');

miner.describe_pdb(['100D','4OJI'], ['depositionDate', 'experimentalTechnique'], function(result){
  console.log(result);
});

miner.query('steitz joseph',function(result){
  console.log(result);
});

miner.query('ribosome', function(result){
  miner.describe_pdb(result, ['chainLength', 'resolution'], function(stats){
    console.log(stats.length);
    lens = [];
    reses = [];
    for(s of stats) {
      lens.push(s['chainLength']);
      reses.push(s['resolution']);
    }
    var trace1 = {
      x: lens,
      y: reses,
      mode: "markers",
      type: "scatter"
    };
    var data = [trace1];
    var layout = {
      title: "chainLength vs resolution",
      xaxis: {
        title: "chainLength",
        showgrid: false,
        zeroline: false
      },
      yaxis: {
        title: "resolution (angstroms)",
        showline: false
      }
    };
    var graphOptions = {layout: layout, filename: "residue_len_vs_resolution", fileopt: "overwrite"};
    plotly.plot(data, graphOptions, function (err, msg) {
        console.log(msg);
    });
  });
});
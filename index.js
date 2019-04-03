var miner = require('./pdbmine');
var plotly = require('plotly')('nnj1', 'qNWRTvydjaDRDLUrXamR');

/*
miner.describe_pdb('*', ['depositionDate', 'experimentalTechnique','macromoleculeType'])
	 .then(results => results.filter(obj => obj.macromoleculeType == 'Protein'))
	 .then(obj=> {
	 	console.log(obj);
	 });
*/	 

/*
miner.describe_pdb(['100D','4OJI'], ['depositionDate', 'experimentalTechnique'], function(result){
  console.log(result);
});
*/


/*miner.query('ribozyme',function(result){
	miner.describe_pdb(result, ['depositionDate', 'experimentalTechnique','structureId'], function(result){
		console.log(result);

	});
}); */

miner.query('ribozyme')
	 .then(results => miner.describe_pdb(results, ['macromoleculeType']))
	 .then(descriptions => descriptions.filter(obj => obj.macromoleculeType == 'RNA'))
	 .then(rnas => {
	 	console.log(rnas);
	 });

/*
miner.query('ribosome', function(result){
  miner.describe_pdb(result, ['chainLength', 'resolution', 'macromoleculeType'], function(stats){
    
    console.log(stats.length);

    proteins = stats.filter((thing => thing.macromoleculeType === 'Protein'))
    console.log(proteins.length);
    rnas = stats.filter((thing => thing.macromoleculeType === 'RNA'))
    console.log(rnas.length);
    dnas = stats.filter((thing => thing.macromoleculeType === 'DNA'))
    console.log(dnas.length);
    
    lens = [];
    reses = [];
    for(s of proteins) {
      lens.push(s['chainLength']);
      reses.push(s['resolution']);
    }
    var proteins = {
      x: lens,
      y: reses,
      mode: "markers",
      type: "scatter"
    };

    lens = [];
    reses = [];
    for(s of rnas) {
      lens.push(s['chainLength']);
      reses.push(s['resolution']);
    }
    var rnas = {
      x: lens,
      y: reses,
      mode: "markers",
      type: "scatter"
    };

    lens = [];
    reses = [];
    for(s of dnas) {
      lens.push(s['chainLength']);
      reses.push(s['resolution']);
    }
    var dnas = {
      x: lens,
      y: reses,
      mode: "markers",
      type: "scatter"
    };

    var data = [proteins, rnas, dnas];
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
*/
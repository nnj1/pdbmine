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

/*miner.query('ribozyme')
	 .then(results => miner.describe_pdb(results, ['macromoleculeType']))
	 .then(descriptions => descriptions.filter(obj => obj.macromoleculeType == 'RNA'))
	 .then(rnas => {
	 	console.log(rnas);
	 });
*/

miner.query('transmembrane protein', function(result){
  miner.describe_pdb(result, ['kabschSander'], function(stats){
    data = '';
    stats.forEach(function(struc){
    	data += struc.kabschSander;
    });

    console.log(data.length);

    // A map (in JavaScript, an object) for the character=>count mappings
	var counts = {};

	// Misc vars
	var ch, index, len, count;

	// Loop through the string...
	for (index = 0, len = data.length; index < len; ++index) {
	    // Get this character
	    ch = data.charAt(index); // Not all engines support [] on strings

	    // Get the count for it, if we have one; we'll get `undefined` if we
	    // don't know this character yet
	    count = counts[ch];

	    // If we have one, store that count plus one; if not, store one
	    // We can rely on `count` being falsey if we haven't seen it before,
	    // because we never store falsey numbers in the `counts` object.
	    counts[ch] = count ? count + 1 : 1;
	}

	var data = [
	  {
	    x: Object.keys(counts),
	    y: Object.values(counts),
	    type: "bar"
	  }
	];
	var graphOptions = {layout: {title: "Frequency of DSSP Assignments"}, filename: "basic-bar", fileopt: "overwrite"};
	plotly.plot(data, graphOptions, function (err, msg) {
	    console.log(msg);
	});

  });
});

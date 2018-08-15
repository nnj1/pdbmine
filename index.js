var miner = require('./pdbmine');

miner.describe_pdb(['100D','4OJI'], ['depositionDate', 'experimentalTechnique'], function(result){
  console.log(result);
});

miner.query('steitz joseph',function(result){
  console.log(result);
});
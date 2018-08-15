var request = require('request');

function csvTojs(csv) {
  var lines=csv.split("\n");
  var result = [];
  var headers = lines[0].split(",");

  for(var i=1; i<lines.length; i++) {
    var obj = {};

    var row = lines[i],
      queryIdx = 0,
      startValueIdx = 0,
      idx = 0;

    if (row.trim() === '') { continue; }

    while (idx < row.length) {
      /* if we meet a double quote we skip until the next one */
      var c = row[idx];

      if (c === '"') {
        do { c = row[++idx]; } while (c !== '"' && idx < row.length - 1);
      }

      if (c === ',' || /* handle end of line with no comma */ idx === row.length - 1) {
        /* we've got a value */
        var value = row.substr(startValueIdx, idx - startValueIdx).trim();

        /* skip first double quote */
        if (value[0] === '"') { value = value.substr(1); }
        /* skip last comma */
        if (value[value.length - 1] === ',') { value = value.substr(0, value.length - 1); }
        /* skip last double quote */
        if (value[value.length - 1] === '"') { value = value.substr(0, value.length - 1); }

        var key = headers[queryIdx++];
        obj[key] = value;
        startValueIdx = idx + 1;
      }

      ++idx;
    }

    result.push(obj);
  }
  return result;
}

// main class
function pdbmine() {
    this.fields = ['atomSiteCount', 'authors', 'classification', 'depositionDate', 'experimentalTechnique', 'macromoleculeType', 'ndbId', 'pdbDoi', 'releaseDate', 'residueCount', 'resolution', 'revisionDate', 'structureMolecularWeight', 'structureTitle', 'chainLength', 'db_code', 'db_name', 'entityId', 'entityMacromoleculeType', 'kabschSander', 'molecularWeight', 'sequence', 'InChI', 'InChIKey', 'ligandFormula', 'ligandId', 'ligandImage', 'ligandMolecularWeight', 'ligandName', 'ligandSmiles', 'EC50', 'IC50', 'Ka', 'Kd', 'Ki', 'deltaG', 'deltaH', 'deltaS', 'hetId', 'biologicalProcess', 'cellularComponent', 'compound', 'ecNo', 'expressionHost', 'molecularFunction', 'plasmid', 'source', 'taxonomyId', 'authorAssignedEntityName', 'clusterNumber100', 'clusterNumber30', 'clusterNumber40', 'clusterNumber50', 'clusterNumber70', 'clusterNumber90', 'clusterNumber95', 'entityId', 'geneName', 'idNum', 'rankNumber100', 'rankNumber30', 'rankNumber40', 'rankNumber50', 'rankNumber70', 'rankNumber90', 'rankNumber95', 'synonym', 'taxonomy', 'taxonomyId', 'uniprotAcc', 'uniprotAlternativeNames', 'uniprotRecommendedName', 'cathDescription', 'cathId', 'pfamAccession', 'pfamDescription', 'pfamId', 'scopDomain', 'scopFold', 'scopId', 'crystallizationMethod', 'crystallizationTempK', 'densityMatthews', 'densityPercentSol', 'pdbxDetails', 'phValue', 'Z_PDB', 'lengthOfUnitCellLatticeA', 'lengthOfUnitCellLatticeB', 'lengthOfUnitCellLatticeC', 'spaceGroup', 'unitCellAngleAlpha', 'unitCellAngleBeta', 'unitCellAngleGamma', 'collectionDate', 'collectionTemperature', 'device', 'diffractionSource', 'diffrnId', 'averageBFactor', 'rAll', 'rFree', 'rObserved', 'rWork', 'refinementResolution', 'highResolutionLimit', 'reflectionsForRefinement', 'structureDeterminationMethod', 'authors', 'name', 'version', 'fieldStrength', 'manufacturer', 'model', 'contents', 'ionicStrength', 'ph', 'pressure', 'pressureUnits', 'solventSystem', 'temperature', 'type', 'conformerId', 'selectionCriteria', 'details', 'method', 'conformerSelectionCriteria', 'totalConformersCalculated', 'totalConformersSubmitted', 'emResolution', 'emDiffractionResolution', 'reconstructionMethod', 'symmetryType', 'pointSymmetry', 'aggregationState', 'embedding', 'staining', 'vitrification', 'emdbMap', 'additionalMap', 'abstractTextShort', 'authors', 'doi', 'firstPage', 'journalName', 'lastPage', 'meshTerms', 'pmc', 'publicationYear', 'pubmedId', 'title', 'volumeId', 'authors', 'firstPage', 'journalName', 'pmc', 'publicationYear', 'pubmedId', 'title', 'volumeId', 'centerInitial', 'centerName', 'projectName'];
}
 
pdbmine.prototype.describe_pdb = function(id, params, cb) {
    var url = 'http://www.rcsb.org/pdb/rest/customReport.csv?pdbids=';
    if (id.constructor === Array){
      url = url + id.join();
    }else{
      url = url + id;
    }
    url = url + '&customReportColumns=';
    if (params.constructor === Array){
      url = url + params.join();
    }else{
      url = url + params;
    }
    url = url + '&service=wsfile&format=csv';
    request(url, function (error, response, body) {
      if (error){
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); 
      }else{
        //console.log(body)
        cb(csvTojs(body));
      }
      
    });
};

pdbmine.prototype.query = function(query, cb){
  var site = 'https://www.rcsb.org/pdb/rest/search';
  request.post(
    {url:site,
    body: '<orgPdbQuery><queryType>org.pdb.query.simple.AdvancedKeywordQuery</queryType><description>Text Search</description><keywords>'+ query+'</keywords></orgPdbQuery>',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    },
    function (error, response, body) {        
        if (!error && response.statusCode == 200) {
          ids = body.split('\n');
          ids.pop();
          cb(ids);
        }else{
          console.log(error);
        }
    }
  );
};

module.exports = new pdbmine()
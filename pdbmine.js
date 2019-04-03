var request = require('request');

/**
 * Represents a JSON representation of a CSV string
 * @param {string} csv - The title of the The CSV string.
 */
function csvTojs(csv) {
  var lines = csv.split("\n");
  var result = [];
  var headers = lines[0].split(",");

  for (var i = 1; i < lines.length; i++) {
    var obj = {};

    var row = lines[i],
      queryIdx = 0,
      startValueIdx = 0,
      idx = 0;

    if (row.trim() === '') {
      continue;
    }

    while (idx < row.length) {
      /* if we meet a double quote we skip until the next one */
      var c = row[idx];

      if (c === '"') {
        do {
          c = row[++idx];
        } while (c !== '"' && idx < row.length - 1);
      }

      if (c === ',' || /* handle end of line with no comma */ idx === row.length - 1) {
        /* we've got a value */
        var value = row.substr(startValueIdx, idx - startValueIdx).trim();

        /* skip first double quote */
        if (value[0] === '"') {
          value = value.substr(1);
        }
        /* skip last comma */
        if (value[value.length - 1] === ',') {
          value = value.substr(0, value.length - 1);
        }
        /* skip last double quote */
        if (value[value.length - 1] === '"') {
          value = value.substr(0, value.length - 1);
        }

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

/**
 * The main pdbmine object.
 * @constructor
 */
function pdbmine() {
  this.fields = ['atomSiteCount', 'authors', 'classification', 'depositionDate', 'experimentalTechnique', 'macromoleculeType', 'ndbId', 'pdbDoi', 'releaseDate', 'residueCount', 'resolution', 'revisionDate', 'structureMolecularWeight', 'structureTitle', 'chainLength', 'db_code', 'db_name', 'entityId', 'entityMacromoleculeType', 'kabschSander', 'molecularWeight', 'sequence', 'InChI', 'InChIKey', 'ligandFormula', 'ligandId', 'ligandImage', 'ligandMolecularWeight', 'ligandName', 'ligandSmiles', 'EC50', 'IC50', 'Ka', 'Kd', 'Ki', 'deltaG', 'deltaH', 'deltaS', 'hetId', 'biologicalProcess', 'cellularComponent', 'compound', 'ecNo', 'expressionHost', 'molecularFunction', 'plasmid', 'source', 'taxonomyId', 'authorAssignedEntityName', 'clusterNumber100', 'clusterNumber30', 'clusterNumber40', 'clusterNumber50', 'clusterNumber70', 'clusterNumber90', 'clusterNumber95', 'entityId', 'geneName', 'idNum', 'rankNumber100', 'rankNumber30', 'rankNumber40', 'rankNumber50', 'rankNumber70', 'rankNumber90', 'rankNumber95', 'synonym', 'taxonomy', 'taxonomyId', 'uniprotAcc', 'uniprotAlternativeNames', 'uniprotRecommendedName', 'cathDescription', 'cathId', 'pfamAccession', 'pfamDescription', 'pfamId', 'scopDomain', 'scopFold', 'scopId', 'crystallizationMethod', 'crystallizationTempK', 'densityMatthews', 'densityPercentSol', 'pdbxDetails', 'phValue', 'Z_PDB', 'lengthOfUnitCellLatticeA', 'lengthOfUnitCellLatticeB', 'lengthOfUnitCellLatticeC', 'spaceGroup', 'unitCellAngleAlpha', 'unitCellAngleBeta', 'unitCellAngleGamma', 'collectionDate', 'collectionTemperature', 'device', 'diffractionSource', 'diffrnId', 'averageBFactor', 'rAll', 'rFree', 'rObserved', 'rWork', 'refinementResolution', 'highResolutionLimit', 'reflectionsForRefinement', 'structureDeterminationMethod', 'authors', 'name', 'version', 'fieldStrength', 'manufacturer', 'model', 'contents', 'ionicStrength', 'ph', 'pressure', 'pressureUnits', 'solventSystem', 'temperature', 'type', 'conformerId', 'selectionCriteria', 'details', 'method', 'conformerSelectionCriteria', 'totalConformersCalculated', 'totalConformersSubmitted', 'emResolution', 'emDiffractionResolution', 'reconstructionMethod', 'symmetryType', 'pointSymmetry', 'aggregationState', 'embedding', 'staining', 'vitrification', 'emdbMap', 'additionalMap', 'abstractTextShort', 'authors', 'doi', 'firstPage', 'journalName', 'lastPage', 'meshTerms', 'pmc', 'publicationYear', 'pubmedId', 'title', 'volumeId', 'authors', 'firstPage', 'journalName', 'pmc', 'publicationYear', 'pubmedId', 'title', 'volumeId', 'centerInitial', 'centerName', 'projectName'];
}

/**
 * Represents a list of JSON documents describing the specified PDB IDs.
 * @param {list} id - List of PDB ID strings.
 * @param {list} params - Fields you would like in the returned JSON documents
 * @param {function} cb - Callback function that accepts one argument containing the returned data
 */
pdbmine.prototype.describe_pdb = function(id, params, cb=null) {
  if(cb){
    var url = 'http://www.rcsb.org/pdb/rest/customReport.csv?pdbids=';
      if (id.constructor === Array) {
        url = url + id.join();
      } else {
        url = url + id;
      }
      url = url + '&customReportColumns=';
      if (params.constructor === Array) {
        url = url + params.join();
      } else {
        url = url + params;
      }
      url = url + '&service=wsfile&format=csv';
      request(url, function(error, response, body) {
        if (error) {
          console.log('error:', error); // Print the error if one occurred
          console.log('statusCode:', response && response.statusCode);
        } else {
          returnthing = csvTojs(body);
          cb(returnthing);
        }

      });
  }
  // return a promise if no callback is specified
  else{
    return new Promise(function(resolve, reject){
      var url = 'http://www.rcsb.org/pdb/rest/customReport.csv?pdbids=';
      if (id.constructor === Array) {
        url = url + id.join();
      } else {
        url = url + id;
      }
      url = url + '&customReportColumns=';
      if (params.constructor === Array) {
        url = url + params.join();
      } else {
        url = url + params;
      }
      url = url + '&service=wsfile&format=csv';
      request(url, function(error, response, body) {
        if (error) {
          console.log('error:', error); // Print the error if one occurred
          console.log('statusCode:', response && response.statusCode);
          reject();
        } else {
          returnthing = csvTojs(body);
          resolve(returnthing);
        }

      });
    });
  }
};

/**
 * Queries the PDB and returns PDB IDs corresponding to a provided search query
 * @constructor
 * @param {string} query - The search query.
 * @param {function} cb - Callback function
 */
pdbmine.prototype.query = function(query, cb=null) {
  if (cb){
    var site = 'https://www.rcsb.org/pdb/rest/search';
    request.post({
        url: site,
        body: '<orgPdbQuery><queryType>org.pdb.query.simple.AdvancedKeywordQuery</queryType><description>Text Search</description><keywords>' + query + '</keywords></orgPdbQuery>',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      },
      function(error, response, body) {
        if (!error && response.statusCode == 200) {
          ids = body.split('\n');
          ids.pop();
          cb(ids);
        } else {
          console.log(error);
        }
      }
    );
  }
  else{
    return new Promise(function(resolve, reject){
      var site = 'https://www.rcsb.org/pdb/rest/search';
      request.post({
          url: site,
          body: '<orgPdbQuery><queryType>org.pdb.query.simple.AdvancedKeywordQuery</queryType><description>Text Search</description><keywords>' + query + '</keywords></orgPdbQuery>',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        },
        function(error, response, body) {
          if (!error && response.statusCode == 200) {
            ids = body.split('\n');
            ids.pop();
            resolve(ids);
          } else {
            reject(error);
          }
        }
      );
    });
  }
};

/**
 * Gets all current PDB IDs in the database.
 * @param {function} cb - Callback function.
 */
pdbmine.prototype.get_all_ids = function(cb) {
  if (cb){
    var site = 'https://www.rcsb.org/pdb/rest/customReport.csv?pdbids=*&customReportColumns=structureId&service=wsfile&format=csv';
    request.get(site,
      function(error, response, body) {
        if (error) {
          console.log(error);
        } else {
          ids = body.split('\n');
          ids.pop();
          cb(ids);
        }
      }
    );
  }
  else{
    return new Promise(function(resolve, reject){
      var site = 'https://www.rcsb.org/pdb/rest/customReport.csv?pdbids=*&customReportColumns=structureId&service=wsfile&format=csv';
      request.get(site,
        function(error, response, body) {
          if (error) {
            reject(error);
          } else {
            ids = body.split('\n');
            ids.pop();
            resolve(ids);
          }
        }
      );
    });
  }
  
};

/**
 * Returns a PDB file as a string
 * @constructor
 * @param {string} id - The title of the book.
 * @param {string} format - A string detailing the desired format of the file ('pdb' or 'cif').
 * @param {function} cb - The callback function
 */
pdbmine.prototype.download = function(id, format, cb) {
  if(cb){
    var site = 'https://files.rcsb.org/view/' + id + '.' + format;
    request.get(site,
      function(error, response, body) {
        if (!error && response.statusCode == 200) {
          cb(body);
        } else {
          console.log(error);
        }
      }
    );
  }
  else{
    return new Promise(function(resolve, reject){
      var site = 'https://files.rcsb.org/view/' + id + '.' + format;
      request.get(site,
        function(error, response, body) {
          if (!error && response.statusCode == 200) {
            resolve(body);
          } else {
            reject(error);
          }
        }
      );
    });
  }
  
};

module.exports = new pdbmine()
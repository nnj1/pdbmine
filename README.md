# pdbmine
A Node.js API for the RCSB Protein Data Bank (PDB)

## Installation
```bash
npm install pdbmine
```

## Usage

Just require the package.
```javascript
var miner = require('pdbmine');
```
You can query the PDB with a string, and a callback function:
```javascript
miner.query('ribozyme', function(result){
  console.log(result);
});
```
You can also get info on certain structures by calling the following function. You pass in either a single PDB-ID or a list, a single parameter or a list of parameters, and a callback function. 
```javascript
miner.describe_pdb(['100D','4OJI'], ['depositionDate', 'experimentalTechnique'], function(result){
  console.log(result);
});
```
Valid parameters can be accessed via ```miner.fields```. They are as follows:

| Report Name | Field Name |
|--------------------------------------------------------------------------|------------------------------|
| Structure Summary Report (StructureSummary) | atomSiteCount |
|  | authors |
|  | classification |
|  | depositionDate |
|  | experimentalTechnique |
|  | macromoleculeType |
|  | ndbId |
|  | pdbDoi |
|  | releaseDate |
|  | residueCount |
|  | resolution |
|  | revisionDate |
|  | structureMolecularWeight |
|  | structureTitle |
| Sequence Report (Sequence) | chainLength |
|  | db_code |
|  | db_name |
|  | entityId |
|  | entityMacromoleculeType |
|  | kabschSander |
|  | molecularWeight |
|  | sequence |
| Ligand Report (Ligands) | InChI |
|  | InChIKey |
|  | ligandFormula |
|  | ligandId |
|  | ligandImage |
|  | ligandMolecularWeight |
|  | ligandName |
|  | ligandSmiles |
| Binding Affinity Report (BindingAffinity) | EC50 |
|  | IC50 |
|  | Ka |
|  | Kd |
|  | Ki |
|  | deltaG |
|  | deltaH |
|  | deltaS |
|  | hetId |
| Biological Detail Report (BiologicalDetails) | biologicalProcess |
|  | cellularComponent |
|  | compound |
|  | ecNo |
|  | expressionHost |
|  | molecularFunction |
|  | plasmid |
|  | source |
|  | taxonomyId |
| Cluster Entity Report (ClusterEntity) | authorAssignedEntityName |
|  | clusterNumber100 |
|  | clusterNumber30 |
|  | clusterNumber40 |
|  | clusterNumber50 |
|  | clusterNumber70 |
|  | clusterNumber90 |
|  | clusterNumber95 |
|  | entityId |
|  | geneName |
|  | idNum |
|  | rankNumber100 |
|  | rankNumber30 |
|  | rankNumber40 |
|  | rankNumber50 |
|  | rankNumber70 |
|  | rankNumber90 |
|  | rankNumber95 |
|  | synonym |
|  | taxonomy |
|  | taxonomyId |
|  | uniprotAcc |
|  | uniprotAlternativeNames |
|  | uniprotRecommendedName |
| Domains Report (Domains) | cathDescription |
|  | cathId |
|  | pfamAccession |
|  | pfamDescription |
|  | pfamId |
|  | scopDomain |
|  | scopFold |
|  | scopId |
| Crystallization Report (Crystallization) | crystallizationMethod |
|  | crystallizationTempK |
|  | densityMatthews |
|  | densityPercentSol |
|  | pdbxDetails |
|  | phValue |
| Unit Cell Dimension Report (UnitCellDimensions) | Z_PDB |
|  | lengthOfUnitCellLatticeA |
|  | lengthOfUnitCellLatticeB |
|  | lengthOfUnitCellLatticeC |
|  | spaceGroup |
|  | unitCellAngleAlpha |
|  | unitCellAngleBeta |
|  | unitCellAngleGamma |
| Data Collection Detail Report (DataCollectionDetails) | collectionDate |
|  | collectionTemperature |
|  | device |
|  | diffractionSource |
|  | diffrnId |
| Refinement Detail Report (RefinementDetails) | averageBFactor |
|  | rAll |
|  | rFree |
|  | rObserved |
|  | rWork |
|  | refinementResolution |
| Refinement Parameter Report (refinementParameters) | highResolutionLimit |
|  | reflectionsForRefinement |
|  | structureDeterminationMethod |
| Software Report (NmrSoftware) | authors |
|  | name |
|  | version |
| NMR Spectrometer Report (NmrSpectrometer) | fieldStrength |
|  | manufacturer |
|  | model |
| nmrExperimentalSampleConditions Report (NMRExperimentalSampleConditions) | contents |
|  | ionicStrength |
|  | ph |
|  | pressure |
|  | pressureUnits |
|  | solventSystem |
|  | temperature |
|  | type |
| NMR Representative Report (NmrRepresentative) | conformerId |
|  | selectionCriteria |
| NMR Refine Report (NMRRefinement) | details |
|  | method |
| NMR Ensemble Report (NmrEnsemble) | conformerSelectionCriteria |
|  | totalConformersCalculated |
|  | totalConformersSubmitted |
| EM Structure Report (EMStructure) | emResolution |
|  | emDiffractionResolution |
|  | reconstructionMethod |
|  | symmetryType |
|  | pointSymmetry |
|  | aggregationState |
|  | embedding |
|  | staining |
|  | vitrification |
|  | emdbMap |
|  | additionalMap |
| Citation Report (Citation) | abstractTextShort |
|  | authors |
|  | doi |
|  | firstPage |
|  | journalName |
|  | lastPage |
|  | meshTerms |
|  | pmc |
|  | publicationYear |
|  | pubmedId |
|  | title |
|  | volumeId |
| Other Citation Report (OtherCitations) | authors |
|  | firstPage |
|  | journalName |
|  | pmc |
|  | publicationYear |
|  | pubmedId |
|  | title |
|  | volumeId |
| Structural Genomics Centers Report (SGProject) | centerInitial |
|  | centerName |
|  | projectName |
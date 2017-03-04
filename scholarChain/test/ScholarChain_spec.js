var assert = require('assert');
var Embark = require('embark');
var EmbarkSpec = Embark.initTests();
var web3 = EmbarkSpec.web3;

describe("ScholarChain", function() {
  before(function(done) {
    var contractsConfig = {
      "ScholarChain": {
        args: ["hiMike"]
      }
    };
    EmbarkSpec.deployAll(contractsConfig, done);
  });

  it("Should get org name", function(done) {
    ScholarChain.getOrganizationName(function(err, result) {
      process.stdout.write(result);
      assert.equal(result, "hiMike");
      done();
    });
  });

  it("Should get org address", function(done) {
    ScholarChain.getOrganizationAddress(function(err, result) {
      process.stdout.write(result);
      assert.equal(typeof(result), 'string');
      done();
    });
  });

  let reviewer = '0x6115103D07F53cdC6bd6241c963f64C27Fe178CD';
  it("Should add a reviewer", function(done) {
    ScholarChain.addReviewer(reviewer, function(err,result){
      ScholarChain.getAllReviewers(function(err, result){
        process.stdout.write(JSON.stringify(result));
        assert.equal(typeof(result), 'object');
        done();
      });
    });
  });
});

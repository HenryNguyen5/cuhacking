var assert = require('assert');
var Embark = require('embark');
var EmbarkSpec = Embark.initTests();
var web3 = EmbarkSpec.web3;

describe("ScholarChain", function() {
	before(function(done) {
		var contractsConfig = {
      "default": {
        "gas": "3000000",
        "contracts": {
          "SimpleStorage": {
            "args": [
              100
            ]
          }
        }
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

	let testAddr = '0x5D3d173994718740A4E613Fe81E5d4583Ed84Ae1';

	it("Registering person then checking if they exist, should return true", function(done) {
		ScholarChain.registerPerson(testAddr, 'ipfsHash', function(err, result) {
			ScholarChain.isRegistered(testAddr, function(err, result) {
				console.log(result);
				assert.equal(result, true);
				done();
			});
		});
	});

	it("Checking recent added person to check if they are a reviewer, should return false", function(done) {
		ScholarChain.isReviewer(testAddr, function(err, result) {
			console.log(result);
			assert.equal(result, false);
			done();
		});
	});

  it("should have 0 scholarships in org", function(done){
    ScholarChain.getNumOfScholarships().then(function(res){
      assert.equal(res.toNumber(), 0);
      done();
    });
  });


  let scholarship = {hashval: 'ipfshashvalHere', value: 1092312310231};
  it("should added a scholarship", function(done){
    ScholarChain.addScholarship(scholarship.hashval, scholarship.value, function(err, res){
      console.log(res);
      done();
    });
  });


  it("should have 1 scholarships in org", function(done){
    ScholarChain.getNumOfScholarships(function(res){
      assert.equal(res.toNumber(), 1);
      done();
    });
  });

  it("should get the one scholarship", function(done){
    ScholarChain.getScholarship(0).then(function(res){
      console.log(res);
      assert.equal(typeof(res), 'string');
      done();
    });
  });

  it("should register person to the one scholarship", function(done){
    ScholarChain.addApplicantToScholarship(testAddr, 0, function(err,res){
      ScholarChain.getNumOfScholarshipStuAppedTo(testAddr, function (err,res){
        let index = res - 1;
        console.log(index);
        scholarChain.getScholarshipStuAppedTo(testAddr, index, function(err,res) {
          console.log(res);
          assert.equal(typeof(res), 'string');
          done();
        });
      });
    });
  });



});

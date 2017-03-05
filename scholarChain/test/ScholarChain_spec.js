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
			true
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
	it("Should return true", function(done) {
		ScholarChain.registerPerson(testAddr, 'ipfsHash', function(err, result) {
			ScholarChain.isRegistered(testAddr, function(err, result) {
				console.log(result);
				assert.equal(result, true);
				done();
			});
		});
	});

	it("Should return false", function(done) {
		ScholarChain.isReviewer(testAddr, function(err, result) {
			console.log(result);
			assert.equal(result, false);
			done();
		});
	});

});

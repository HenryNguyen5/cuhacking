pragma solidity ^0.4.7;
contract ScholarChain {

  struct Organization {
    string name;
    address orgAddress;
    uint numScholarships;

    mapping (address => Person) people;
    mapping (uint => scholarShip) scholarships;
  }

  struct Person {
    bool exists;
    string data;
    bool isReviewer;
  }

  struct scholarShipData {
    string dataHash;
    uint dollarValue;
  }

  struct scholarShip {
    scholarShipData data;
    uint numRegisterApplicants;
    mapping (uint => address) applicants;
  }

  Organization thisOrg;

  function ScholarChain(string name) {
    thisOrg.name = name;
    thisOrg.orgAddress = msg.sender;
    thisOrg.numScholarships = 0;
    addReviewer(msg.sender);
  }

  function addScholarship(string hashval, uint value) {
    thisOrg.scholarships[thisOrg.numScholarships++] = scholarShip(scholarShipData(hashval,value), 0);
  }

  function getNumOfScholarships() returns (uint numOfScholarships) {
      return thisOrg.numScholarships;
  }

  function registerPerson(address id, string ipfsHash) returns (bool registered){
    if(!thisOrg.people[id].exists){
      return false;
    }
     else {
      thisOrg.people[id] = Person(true, ipfsHash, false);
      return true;
    }
  }

  function addReviewer(address id)  returns (bool registered){
    if(!thisOrg.people[id].exists){
      return false;
    }
    else  {
      thisOrg.people[id].isReviewer = true;
      return true;
    }
  }


  function getOrganizationAddress() constant returns (address retVal) {
    return thisOrg.orgAddress;
  }

  function getOrganizationName() constant returns (string name){
    return thisOrg.name;
  }

}

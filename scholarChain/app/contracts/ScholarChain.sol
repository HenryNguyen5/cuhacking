pragma solidity ^0.4.7;
contract ScholarChain {

  struct Organization {
    string name;
    address orgAddress;
    uint numScholarships;

    mapping (address => Person) people;
    mapping (uint => scholarShip) scholarships;
  }

  struct Person  {
    string data;
    bool exists;
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

  function ScholarChain(string name)  {
    thisOrg.name = name;
    thisOrg.orgAddress = msg.sender;
    thisOrg.numScholarships = 0;
    addReviewer(msg.sender);
  }

  function getScholarship(uint index) constant returns (string){
      return thisOrg.scholarships[index].data.dataHash;
  }

  function addScholarship(string hashval, uint value) {
    thisOrg.scholarships[thisOrg.numScholarships++] = scholarShip(scholarShipData(hashval,value), 0);
  }

  function getNumOfScholarships() returns (uint numOfScholarships) {
      return thisOrg.numScholarships;
  }

  function isReviewer(address id) constant returns (bool){
    return thisOrg.people[id].isReviewer;
  }


  function isRegistered(address id) constant returns (bool exists){
      return thisOrg.people[id].exists;
  }

  function registerPerson(address id, string ipfsHash){
    if(!thisOrg.people[id].exists){
      thisOrg.people[id] = Person(ipfsHash, true, false);
    }
  }

  function returnAString() constant returns (string aStr){
    return thisOrg.name;
  }
  function addReviewer(address id)  returns (bool registered){
    if(!isRegistered(id)){
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

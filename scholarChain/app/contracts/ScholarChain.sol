pragma solidity ^0.4.7;
contract ScholarChain {

  struct Organization {
    string name;
    address orgAddress;
    address[] reviewers;
    uint numScholarships;
    mapping (uint => scholarShip) scholarships;
  }

  struct scholarShipData {
    string name;
    string dataHash;
    uint dollarValue;
  }

  struct scholarShip {
    scholarShipData data;
    uint numApplicants;
    mapping (uint => address) applicants;
  }

  Organization thisOrg;

  function ScholarChain(string name) {
    thisOrg.name = name;
    thisOrg.orgAddress = msg.sender;
    thisOrg.numScholarships = 0;
    addReviewer(msg.sender);
  }

  function addScholarship(string name, string hashval, uint value) {
    thisOrg.scholarships[thisOrg.numScholarships++] = scholarShip(scholarShipData(name,hashval,value), 0);

  }

  function addReviewer(address reviewer) {
    thisOrg.reviewers.push(reviewer);
  }


  function getAllReviewers() constant returns(address[] reviewerAddresses){
    return thisOrg.reviewers;
  }

  function getOrganizationAddress() constant returns (address retVal) {
    return thisOrg.orgAddress;
  }

  function getOrganizationName() constant returns (string name){
    return thisOrg.name;
  }

}

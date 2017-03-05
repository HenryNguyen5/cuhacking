pragma solidity ^0.4.7;
contract ScholarChain {

  struct Organization {
    string name;
    address orgAddress;
    uint numScholarships;

    mapping (address => Person) people;
    mapping (uint => Scholarship) scholarships;
  }

  struct Person  {
    string data;
    bool exists;
    bool isReviewer;
    uint numOfSAppedTo;
    mapping(uint => string) sAppedTo;
  }

  struct ScholarshipData {
    string dataHash;
    uint dollarValue;
  }

  struct Scholarship {
    ScholarshipData data;
    uint numRegisteredApplicants;
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
    thisOrg.scholarships[thisOrg.numScholarships++] = Scholarship(ScholarshipData(hashval,value), 0);
  }

  function getNumOfScholarships() constant returns (uint numOfScholarships) {
      return thisOrg.numScholarships;
  }

  
  function addApplicantToScholarship(address stuId, uint sIndex) {
    if(isRegistered(stuId) && !isReviewer(stuId)){
      Person stu = thisOrg.people[stuId];
      Scholarship s = thisOrg.scholarships[sIndex];
      s.applicants[s.numRegisteredApplicants++] = stuId;
      stu.sAppedTo[stu.numOfSAppedTo++] = s.data.dataHash;
    }
  }


  function getNumOfScholarshipStuAppedTo(address stuId) constant returns (uint) {
    if(isRegistered(stuId) && !isReviewer(stuId)){
      Person stu = thisOrg.people[stuId];
      return stu.numOfSAppedTo;

    }
  }

  function getScholarshipStuAppedTo(address stuId, uint scholIdx) constant returns (string){
      if(isRegistered(stuId) && !isReviewer(stuId)){
        Person stu = thisOrg.people[stuId];
        return stu.sAppedTo[scholIdx];
      }
  }

  function isRegistered(address id) constant returns (bool exists){
      return thisOrg.people[id].exists;
  }

  function registerPerson(address id, string ipfsHash){
    if(!isRegistered(id)){
      thisOrg.people[id] = Person(ipfsHash, true, false, 0);
    }
  }




  function isReviewer(address id) constant returns (bool){
    return thisOrg.people[id].isReviewer;
  }

  function addReviewer(address id)  returns (bool registered){
    if(isRegistered(id)){
      thisOrg.people[id].isReviewer = true;
    }
  }


  function getOrganizationAddress() constant returns (address retVal) {
    return thisOrg.orgAddress;
  }

  function getOrganizationName() constant returns (string name){
    return thisOrg.name;
  }

}

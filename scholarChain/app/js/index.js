/*globals $, SimpleStorage, document*/

var addToLog = function(id, txt) {
  $(id + " .logs").append("<br>" + txt);
};

// ===========================
// Register User
// ===========================

$(document).ready(function() {
  EmbarkJS.Storage.setProvider('ipfs',{server: 'localhost', port: '5001'});
  ScholarChain.getNumOfScholarships().then((num) => {
    num = num.toNumber()
    let scholarships = []

    for(let i = 0;i<num;i++){
      scholarships.append(ScholarChain.getScholarship(i))
    }
    var sList = $('ul.list-group')
    $.each(scholarships, function(i){
      var li = $('<li/>')
          .addClass('list-group-item')
          .appendTo(sList);
      var aaa = $('<a/>')
          .addClass('blah')
          .attr('href', '../scholarship/' + scholarships[i])
          .text(scholarships[i] + ' - $' + 'scholarships[i].value')
          .appendTo(li);
    });
  })

  $("#register button.submit").click(function() {
    let name = $("#register input.register-name").val();
    let wallet = $("#register input.register-id").val();
    let user = {name, wallet}

    EmbarkJS.Storage.saveText(JSON.stringify(user)).then((hash) => {
       console.log(JSON.stringify("User '" + name +  "' was saved with hash " + hash));
       ScholarChain.registerPerson(wallet, hash).then((result) => {
         console.log('Successful:'+ [Boolean(result),String(result),Number(result),Boolean(result)]);
       })
    });
  });

  $("#create button.submit").click(function() {
    let title = $("#create input.scholar-title").val();
    let description = $("#create input.scholar-description").val();
    let value = $("#create input.scholar-value").val();
    let release = $("#create input.scholar-release").val();
    let deadline = $("#create input.scholar-deadline").val();
    let scholarship = {title, description, value, release, deadline}
    EmbarkJS.Storage.saveText(JSON.stringify(scholarship)).then((hash) => {
       console.log("Scholarship '" + title +  "' was saved with hash " + hash);
       ScholarChain.addScholarship(hash, value*18.81*10000000000000000000).then((result) => {
         console.log('Successful:'+ [Boolean(result),String(result),Number(result),Boolean(result)]);
       })
    });
  });

  //Testing Buttons
  $("button.addScholarship").click(function() {
    let scholarship = {title:'title', description:'description', value:10, release:'release', deadline:'deadline'}
    EmbarkJS.Storage.saveText(JSON.stringify(scholarship)).then((hash) => {
       console.log("Scholarship was saved with hash " + hash);
       ScholarChain.addScholarship(hash, 10).then((result) => {
         console.log('Successful:'+ result);
       })
    });
  });
  $("button.addUser").click(function() {
    let user = {name:'name',wallet:0x21ca6c691355aac28a77b16f0e1d1f6c59973a8f053cdc64ab51c6aebd9db2d7}

    EmbarkJS.Storage.saveText(JSON.stringify(user)).then((hash) => {
       console.log(JSON.stringify("User was saved with hash " + hash));
       ScholarChain.registerPerson(0x21ca6c691355aac28a77b16f0e1d1f6c59973a8f053cdc64ab51c6aebd9db2d7, hash).then((result) => {
         console.log('Successful:'+ result);
       })
    });
  });
  $("button.getNumSchol").click(function() {
    ScholarChain.getNumOfScholarships().then((num) => {
      num = num.toNumber()
      console.log("Number of Scholarships:", num);
    })
  });

  $("button.isRegistered").click(function() {
    let user = 0x21ca6c691355aac28a77b16f0e1d1f6c59973a8f053cdc64ab51c6aebd9db2d7
    let user2 = 0x21ca6c691355aac28a77b16f0e1d1f6c59973a8f053cdc64ab51c6aebd9db2d8

    EmbarkJS.Storage.saveText(JSON.stringify(user)).then((hash) => {
       console.log(JSON.stringify("User was saved with hash " + hash));
       ScholarChain.isRegistered(user).then((result) => {
         console.log('Should be True:'+ result);
         ScholarChain.isRegistered(user2).then((result) => {
           console.log('Should be False:'+ result);
         })
       })
    });
  });
  $("button.getNumSchol").click(function() {
    ScholarChain.getNumOfScholarships().then((num) => {
      num = num.toNumber()
      console.log("Number of Scholarships:", num);
    })
  });

});

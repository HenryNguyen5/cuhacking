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
       console.log(JSON.stringify("Scholarship '" + title +  "' was saved with hash " + hash));
       ScholarChain.addScholarship(hash, value*18.81*10000000000000000000).then((result) => {
         console.log('Successful:'+ [Boolean(result),String(result),Number(result),Boolean(result)]);
       })
    });
  });

});

/*globals $, SimpleStorage, document*/

var addToLog = function(id, txt) {
  $(id + " .logs").append("<br>" + txt);
};

// ===========================
// Register User
// ===========================

$(document).ready(function() {
  EmbarkJS.Storage.setProvider('ipfs',{server: 'localhost', port: '5001'});

  $("#register button.submit").click(function() {
    //var value = $("#register input.bank").val();
    let s =  {
      "name": "Entrance Scholarship",
      "description": "Easy Money",
      "value": 1000,
      "releaseDate": "09/09/2017",
      "deadline": "09/01/2017"
    }
    s = JSON.stringify(s);
    console.log(s);
    EmbarkJS.Storage.saveText(s).then(function(err, hash) {
      console.log(err, hash);
      console.log("scholarship was saved with hash" + hash);
    });
    //addToLog("#register", "EmbarkJS.Storage.saveText('" + value + "').then(function(hash) { })");
  });

});

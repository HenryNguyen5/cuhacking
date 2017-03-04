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
    var value = $("#register input.bank").val();
    let s =  {
      "name": "Entrance Scholarship",
      "description": "Easy Money",
      "value": 1000,
      "releaseDate": "09/09/2017",
      "deadline": "09/01/2017"
    }
    EmbarkJS.Storage.saveText(JSON.stringify(s)).then((hash) => {
      console.log("scholarship was saved with hash" + hash);
    });
    addToLog("#storage", "EmbarkJS.Storage.saveText('" + value + "').then(function(hash) { })");
  });

  $("#storage button.loadIpfsHash").click(function() {
    var value = $("#storage input.textHash").val();
    EmbarkJS.Storage.get(value).then(function(content) {
      $("span.ipfsText").html(content);
    });
    addToLog("#storage", "EmbarkJS.Storage.get('" + value + "').then(function(content) { })");
  });

});

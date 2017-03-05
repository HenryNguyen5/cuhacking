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
    // let s =  {
    //   "name": "Entrance Scholarship",
    //   "description": "Easy Money",
    //   "value": 1000,
    //   "releaseDate": "09/09/2017",
    //   "deadline": "09/01/2017"
    // }
    let name = $("#register input.register-name").val();
    let wallet = $("#register input.register-id").val();
    let user = {name, wallet}

    EmbarkJS.Storage.saveText(JSON.stringify(user)).then((hash) => {
       console.log(JSON.stringify("User '" + name +  "' was saved with hash " hash));
       scholarChain.registerPerson(wallet, hash).then((result) => {
         console.log('Successful:'+ result);
       })
    });
    // EmbarkJS.Storage.get('QmYdC6dNLedu6m8Eri4HiVmQWvPmjeamfW4WLMAAJZGfPo').then((content) => {
    //   console.log(content.slice(4, -2));
    //   console.log(JSON.parse(content.slice(4, -2)).name)
    // });
    //addToLog("#register", "EmbarkJS.Storage.saveText('" + value + "').then(function(hash) { })");
  });

});

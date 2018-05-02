$('#login_btn').click(function() {
  var email = $('#login_email').val().trim();
  var pwd = $('#login_pwd').val().trim();

  $.ajax({
    type: "GET",
    url: 'http://192.168.43.242:3000/tesse/users',
    data:{
      'Access-Control-Allow-Credentials': true,
      'id': email,
      'pass': pwd,
    },
    dataType: 'json',
    success: function (data){
      if(data != ""){
        var usrss = data[0].FName;
        var usrid = data[0].IdUser;
        $.ajax({
          type: "GET",
          url: '/validate_login',
          data:{
            'usrss': usrss,
            'usrid': usrid,
          },
          dataType: 'json',
          success: function (data){
            if(data.is_success){
              location.reload(true);
            } else {
              alert('Log in failed!')
              location.reload(true);
            }
          }
        });
      } else {
        $('#loginalert').html("Incorrect username or password!");
      }
    }
  });

});

$('#logout_btn').click(function() {
  $.ajax({
    type: "GET",
    url: '/logout',
    data:{
      'check': 1,
    },
    dataType: 'json',
    success: function (data){
      if(data.is_success){
        window.location.replace('http://127.0.0.1:8000/');
      } else {
        alert('Log out failed!')
        location.reload(true);
      }
    }
  });
});

$('#avasl').change(function avaSelection(){
  var avasl = this.value;
  $('#avaSelect').attr("src", avasl);
});

$('#signup_email').change(function() {
  var email = this.value;

  $.ajax({
    type: "GET",
    url: '/validate_email',
    data:{
      'email': email,
    },
    dataType: 'json',
    success: function (data){
      if(data.is_taken){
        $('#signupalert').css('color', 'red');
        $('#signupalert').html("This email address has already been taken!");
        $('#signup_btn').addClass("disabled");
      } else {
        $('#signupalert').css('color', 'green');
        $('#signupalert').html("Available email address!");
        $('#signup_btn').removeClass("disabled");
      }
    }
  });

});

$('#signup_btn').click(function(){
  var email = $('#signup_email').val().trim();
  var fn = $('#signup_fn').val().trim();
  var ln = $('#signup_ln').val().trim();
  var pwd = $('#signup_pwd').val().trim();
  var avatar = $('#avasl').val().trim();
  $.ajax({
    type: "POST",
    url: 'http://192.168.43.242:3000/tesse/users',
    data:{
      'Access-Control-Allow-Credentials': true, 
      'IdUser': email,
      'Password': pwd,      
      'FName': fn,
      'LName': ln,
      'avatar': avatar,
      'isExpert': 0,
    },
    dataType: 'json',
    success: function (data){
      alert("Success! You can log in now.")
      location.reload(true);
    },
    error: function (xhr, status) {
      alert("Can't sign up!");
      location.reload(true);
    }
  });

});

$('#alreadyexpert').click(function(){
  alert('You are an expert already!')
});
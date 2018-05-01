$('#login_btn').click(function() {
  var email = $('#login_email')[0].value;
  var pwd = $('#login_pwd')[0].value;

  $.ajax({
    type: "GET",
    url: '/validate_login',
    data:{
      'email': email,
      'pwd': pwd,
    },
    dataType: 'json',
    success: function (data){
      if(data.is_correct){
        $('#loginalert').html(data.username);
        location.reload(true);
      } else {
        $('#loginalert').html("Incorrect username or password!");
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
      alert(data);
    },
    error: function (xhr, status) {
      alert("error");
    }
  });

});
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
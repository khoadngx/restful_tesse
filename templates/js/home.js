$('#login_email').change(function() {
  var email = this.value;

  $.ajax({
    type: "GET",
    url: '/validate_email',
    data:{
      'email': email,
    },
    dataType: 'json',
    success: function (data){
      alert(data.is_correct);
      // if(data.is_correct == 1){
      //   alert("Login success! " + data.is_correct);
      // } else {
      //   alert("Login failed!");
      // }
    }
  });

});
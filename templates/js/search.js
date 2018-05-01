$(function() {
    $('#appointmentdatetime').datepicker();
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
          alert('log out failed!')
          location.reload(true);
        }
      }
    });
});
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
        alert('Log out failed!')
        location.reload(true);
      }
    }
  });
});

$('#alreadyexpert').click(function(){
  alert('You are an expert already!')
});

function appointment(expid, usrid) {
  var date = document.getElementById("appointmentDate" + expid).value;
  var time = document.getElementById("appointmentTime" + expid).value;
  var mess = document.getElementById("appointmentMessage" + expid).value;
  var lat = document.getElementById("appointLocation_lat" + expid).value;
  var lng = document.getElementById("appointLocation_lng" + expid).value;
  $.ajax({
    type: "POST",
    url: 'http://192.168.43.242:3000/tesse/appointment',
    data:{
      'id_expert': expid,
      'id_user': usrid,
      'date': date,
      'time': time,
      'lat': lat,
      'lon': lng,
      'message': mess,
    },
    dataType: 'json',
    success: function (data){
      if(data){
        alert(data);
      } else {
        alert('Log out failed!');
      }
    }
  });
}
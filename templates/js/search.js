$(function() {
    $('#appointmentdatetime').datepicker();
});

$('#search_btn').click(function(){
  var keyword = $('#search_keyword').val().trim();
  if(keyword != ''){
    window.location.replace('http://127.0.0.1:8000/search/' + keyword);
  } else {
    alert('Please type in a keyword!')
  }
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
        location.reload(true);
      } else {
        alert('Log out failed!');
      }
    }
  });
}
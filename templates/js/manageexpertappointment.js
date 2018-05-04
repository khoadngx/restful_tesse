function confirmAppoint(appointId, status){

    $.ajax({
        type: "PUT",
        url: 'http://192.168.43.242:3000/tesse/appointment/commit/' + appointId,
        data:{
          'Access-Control-Allow-Credentials': true, 
          'isAccepted': status,
        },
        dataType: 'json',
        success: function (data){
          if(data){
            location.reload(true);
          }
        },
        error: function (xhr, status) {
          alert("Can't confirm!");
          location.reload(true);
        }
    });

}
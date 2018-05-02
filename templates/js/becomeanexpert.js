$(function() {
    $("#birthday").datepicker();
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

$('#careerlist').change(function() {
    var careerval = this.value;
    $.ajax({
      type: "GET",
      url: 'http://192.168.43.242:3000/tesse/skill/' + careerval,
      data:{},
      dataType: 'json',
      success: function (data){
        if(data){
            $('#skilllist').html('');
            for(var i=0; i < data.length; i++){
                $('#skilllist').append('<option value="'+ data[i].id +'">'+ data[i].name +'</option>');
            }
            $('#skilllist').attr('size', data.length);
        } else {
          alert('Load failed!');
        }
      }
    });
});

$('#expsignup_btn').click(function() {
    var email = $('#expsign_email').val().trim();
    var fn = $('#expsign_fn').val().trim();
    var ln = $('#expsign_ln').val().trim();
    var pwd = $('#expsign_pwd').val().trim();
    var career = $('#careerlist option:selected').text().trim();
    var skill = $('#skilllist').val();
    var country = $('#expsign_country').val().trim();
    var ava = $('#expsign_ava').attr('src').trim();
    var lat = parseFloat($('#expsign_lat').val());
    var lng = parseFloat($('#expsign_lng').val());
    var phone = $('#expsign_phone').val().trim();
    $.ajax({
        type: "POST",
        url: 'http://192.168.43.242:3000/tesse/expert',
        data:{
                'Access-Control-Allow-Credentials': true,
                'IdExpert': email,
                'Password': pwd,
                'LName': ln,
                'FName': fn,
                'career': career,
                'country': country,
                'image': ava,
                'isOnline': 0,
                'lat': lat,
                'lon': lng,
                'sdt': phone,
        },
        dataType: 'json',
        success: function (data){
            if(data){
                for(var i=0; i < skill.length; i++){
                    var separateskill = skill[i];
                    $.ajax({
                        type: "POST",
                        url: 'http://192.168.43.242:3000/tesse/expert_skill',
                        data:{
                            'Access-Control-Allow-Credentials': true,
                            'expert_id': email,
                            'skill_id': separateskill,
                        },
                        dataType: 'json',
                        success: function (data){
                            if(data){
                                continue;
                            } else {
                                alert('Load failed!');
                            }
                        }
                    });
                }
                $.ajax({
                    type: "PUT",
                    url: 'http://192.168.43.242:3000/tesse/users/' + email,
                    data:{
                        'Access-Control-Allow-Credentials': true,
                        'isExpert': 1,
                    },
                    dataType: 'json',
                    success: function (data){
                        if(data){
                            alert('You are an expert now!');
                            window.location.replace('http://127.0.0.1:8000/');
                        } else {
                            alert('Load failed!');
                        }
                    }
                });
            } else {
                alert('Load failed!');
            }
        }
    });
});
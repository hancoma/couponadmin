/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 var telephoneNumber = cordova.require("cordova/plugin/telephonenumber");



var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');

    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);

        
         app.onmain();
        //check_call();
         
    },
    onmain: function() {
       check_join();
       var reg_id=device.uuid;
       // 기기 번호 검출 
          console.log('Received Event: ' + reg_id);

          push = PushNotification.init({
    android: {
        senderID: "665522737095"
    },
    browser: {
        pushServiceURL: 'http://push.api.phonegap.com/v1/push'
    },
    ios: {
        alert: "true",
        badge: "true",
        sound: "true"
    },
    windows: {}
});
          PushNotification.hasPermission(function(data) {
    if (data.isEnabled) {
        console.log('isEnabled');
    }
});


push.on('registration', function(data) {
    console.log(data.registrationId);
    json_call(data.registrationId);
});

push.on('notification', function(data) {
 
  alert_msg("알람",data.message);
  
    display_call(data.message);
    
   
});

push.on('error', function(e) {
    // e.message
   alert_msg("경고",e.message);
});


    }
};

  function check_join() {
    var uuid=device.uuid;
       $.post("http://pataling.cafe24.com/app_test/check_join.php",
   {
    uuid:uuid
      },
   function(data){
     
        if (data=="no") {
          alert_msg("경고","회원 가입 정보가 없습니다. 회원가입해 주세요.");
      
       display_join();
     } else {
       display_call();
     }


      }
      );
    
  }
     function check_call() {
    var uuid=device.uuid;
     $.post("http://pataling.cafe24.com/app_test/check_call.php",
   {
    uuid:uuid
      },
   function(data){
     
      alert_msg("알림","콜 정보가 있습니다.");
      
       display_call();


      }
      );
  }

  function zzim_call(no) {
      var no=no;
      var uuid=device.uuid;
     $.post("http://pataling.cafe24.com/app_test/zzim_call.php",
   {
    uuid:uuid,
    no:no
      },
   function(data){
     
        alert_msg("알림","접수했습니다.");
     
   

      }
      );


  }
  function display_call(message) {
    var uuid=device.uuid;
    var message=message;
    console.log(message);
    var msg2=message.split('번콜');
    var no=msg2[0];
    console.log(no);
    var modal = UIkit.modal("#call_modal");

    modal.show();

     $.post("http://pataling.cafe24.com/app_test/call_info.php",
   {
    uuid:uuid,
    no:no
      },
   function(data){
       $("#call_contents").html(data);
      }
      );
  }

  function display_join() {
    var uuid=device.uuid;
    var modal = UIkit.modal("#join_modal");

if ( modal.isActive() ) {
    modal.hide();
} else {
    modal.show();
}
// 회원화면 가져오기 
     $.post("http://pataling.cafe24.com/app_test/join_form.php",
   {
    
      },
      function(data){
        $("#join_contents").html(data);
      });

     
  }

  function login_check() {
    var email=$("#email").val();
    var passwd=$("#passwd").val();
    if (!email) {
      alert_msg("경고","아이디를 입력하세요.");
      exit;
    }
    if (!passwd) {
      alert_msg("경고","비밀번호를 입력하세요.");
      exit;
    }
    check_id(email,passwd);
  }

function check_id(email,passwd) {
  var email=email;
  var passwd=passwd;
  var uuid=device.uuid;
     $.post("http://pataling.cafe24.com/app_test/check_login.php",
               {
                email:email,
                passwd:passwd,
                uuid:uuid
               },
               function(data){
                  var data=data;
               if (data=="yes"){
                  alert_msg("알림","정상적으로 등록되어습니다.");

                  
        var modal = UIkit.modal("#join_modal");

if ( modal.isActive() ) {
    modal.hide();
} else {
    modal.show();
}
                } else {
                  alert_msg("경고","아이디와 비밀번호가 맞지 않습니다. 고객센터 문의 바랍니다.");
                            
                  exit;
                }
              });
};

function json_call(reg_id) {
      var reg_id=reg_id;
      var deviceid=device.uuid;
       
         $.post("http://pataling.cafe24.com/app_test/gcm_reg_app.php",
   {
    reg_id:reg_id,
    deviceid:deviceid
   },
   function(data){
    var data;
    
   //  alert("ok");
   })
       } 



  var uuid=device.uuid;

  // 콜목록 보기 
  function call_list() {

      var uuid=device.uuid;
    
   
    var modal = UIkit.modal("#call_modal");

    modal.show();

     $.post("http://pataling.cafe24.com/app_test/call_list.php",
   {
    uuid:uuid,
    no:no
      },
   function(data){
       $("#call_contents").html(data);
      }
      );
  }


// msg 
function alertDismissed() {
    // do something
}

function alert_msg(title,msg) {
    var title=title;
    var msg=msg;
   navigator.notification.alert(
    msg,  // message
    alertDismissed,         // callback
    title,            // title
    '확인'                  // buttonName
);
}

 

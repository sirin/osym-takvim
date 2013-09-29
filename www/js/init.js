// JavaScript Document
// PROJECT: Phonegap LocalNotifications
// AUTHOR: Drew Dahlman ( www.drewdahlman.com )
// DATE: 1.26.2012

/*
 NOTES:
 We will be creating LocalNotifications that can be set to fire while app is inactive,
 and create a callback for the JS to know when the app has come back from a notification.
 
 One thing that is deceptive about the LocalNotifications plugin is that when it shows a notification
 has been created it shows it based on the timezone +0000 which can throw you off.
 
 in the call for setting the notification we simply call notification.local_timed("13:00") - note that I supplied a string.
 
 The ability to set repeating notifications has been added!
 - daily
 - weekly
 - monthly
 - yearly
 
 
 */


// NOTIFICATION CENTER
/*
 I like to set up one object that's only job is to manage notifications
 */
var notification = {
    init:function(){
    
    },

	// This will fire after 1 seconds
    local_min:function(notifText, year, month, day, notifId) {
        
        // TODO notifDate modify edilecek ve d parametresi haline getirilecek,
        // su anda kullanilmiyor.
        
        console.log("preparing notification.");
        var myText = notifText;
//        var d = new Date();
//        d = d.getTime() + 1000;
//        d = new Date(d);
        // example date creation: new Date(year, month, day, hours, minutes, seconds, milliseconds)
        
        year = 2013;
        month = 8;
        day = 29;
        hour = 16;
        minute = 07;
        
        
        
        var months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
        var gmtDate = new Date(months[month] + ' ' + day + ', ' + year + ' ' + hour + ':' + minute + ':00 GMT+0300');
        console.log("createdDate: " + gmtDate);
        console.log("year: " + year + " month: " + month + " day: " + day);
        console.log("notifId: " + notifId);
        
       
        
//        var d = new Date(Date.UTC(year, month, day, hour, minute, 0, 0));
//        console.log(d);
//        var current = new Date();
//        console.log("current: " + current);
        //console.log("window.addNotification" + window.addNotification);
        window.addNotification({
            fireDate        : gmtDate,
            alertBody       : myText, //"This is a local notification.",
            alertTitle      : "OSYM Takvim",
            repeatInterval  : "daily",
            soundName       : "horn.caf",
            badge           : 0,
            notificationId  : notifId,
            foreground      : function(notificationId){
                               
                function alertDismissed() {
                // do something
                }
                                   
                navigator.notification.alert(
                    myText,  // message
                    alertDismissed,         // callback
                    'OSYM Takvim',            // title
                    'Tamam'                  // buttonName
                );
            },
            background  : function(notificationId){
                function alertDismissed() {
                    // do something
                }
                               
                navigator.notification.alert(
                    myText,  // message
                    alertDismissed,         // callback
                    'OSYM Takvim',            // title
                    'Tamam'                  // buttonName
                );
            }
        });
        console.log("Notification registered.");
    }
};
//
//	// This will fire based on the time provided.
//	// Something to note is that the iPhone goes off of 24hr time
//	// it defaults to no timezone adjustment so +0000 !IMPORTANT
//local_timed:function(hh,mm){
//    // the example time we provide is 13:00
//    // This means the alarm will go off at 1pm +0000
//    // how does this translate to your time? While the phone schedules 1pm +0000
//    // it will still go off at your desired time base on your phones time.
//    
//   
//    // Now lets make a new date
//    var d = new Date();
//    d = d.setSeconds(00);
//    d = new Date(d);
//    d = d.setMinutes(mm);
//    d = new Date(d);
//    d = d.setHours(hh);
//    d = new Date(d);
//    plugins.localNotification.add({
//               date: d,
//               repeat:'daily',
//               message: 'This went off just as expected!',
//               hasAction: true,
//               badge: 1,
//               id: '2',
//               sound:'horn.caf',
//               background:'app.background',
//               foreground:'app.running'
//               });
//},
//clear:function(){
//    plugins.localNotification.cancelAll();
//},
//tomorrow:function(hh,mm,days){
//    // Now lets make a new date
//    var d = new Date();
//    d = d.setSeconds(00);
//    d = new Date(d);
//    d = d.setMinutes(mm);
//    d = new Date(d);
//    d = d.setHours(hh);
//    d = new Date(d);
//    
//    // add a day
//    d = d.setDate(d.getDate()+days);
//    d = new Date(d);
//    
//    plugins.localNotification.add({
//               date: d,
//               repeat:'daily',
//               message: 'This went off just as expected!',
//               hasAction: true,
//               badge: 1,
//               id: '3',
//               sound:'horn.caf',
//               background:'app.background',
//               foreground:'app.running'
//               });
//}
//	
//}
//
//
//


var app = {
bodyLoad:function(){
    document.addEventListener("deviceready", app.deviceReady, false);
},
deviceReady:function(){
    app.init();
},
init:function(){
    },
background:function(id){
    console.log("I was in the background but i'm back now! ID="+id);
},
running:function(id){
    console.log("I am currently running, what should I do? ID="+id);
}
};
// bind GA events
$('[id^=ga_event]').bind("click",function(e, data) {
   var event_name = e.currentTarget.id;
   ga('send', 'event', event_name, 'clicked');
});
      
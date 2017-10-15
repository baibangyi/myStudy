var EventEmitter = require ('events').EventEmitter;

var event = new EventEmitter();

event.on('some_event', function() {
	console.log('触发some_event成功')
});

setTimeout(function() {
	event.emit('some_event')
},1000);
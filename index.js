var express = require("express");
var events = require("events");
var oriento = require("oriento");
var config = require("./config.js");
var validate =  require("./lib/validate.js");
var v = new validate();
var eventEmitter = new events.EventEmitter();

var app = new express();

var register = require("./lib/registration.js");

app.set("port",process.env.port||3000);

function start(){
app.listen(app.get("port"),function(res,rep){
	console.log("Server started");
	app.post("/register",function(req,res){
	var reg = new register(req.body,app);
	reg.init();
	var ret = reg.insert();
	if(ret == false){console.log("Cannot Proceed further...")}
	else{
	eventEmitter.on("inserted",callMail);
	function callMail(){
		reg.sendMail();
	}
	eventEmitter.on("mlsnt",reg.sucess);
	}	
});
});
}

eventEmitter.on("appset",start);

function appset(){
app.set("oriento",oriento);
app.set("events",events);
app.set('eventEmitter',eventEmitter);
app.set('config',config);
app.set("validator",v);
app.use(require('body-parser')());
eventEmitter.emit("appset");
//1. validate data sent by post
}

appset();
var oriento = require("oriento");
var config = require("./config");
var dbClass = require("./lib/fetchQue.js");
var express = require("express");
var events = require("events");
var chkParamsSendRequest = require("./lib/checkParams.js");

var app = express();
var eventEmitter = new events.EventEmitter();

app.set("port",process.env.port||3000);
app.set("eventEmitter",eventEmitter);
//app.use(require('body-parser')());
app.listen(app.get("port"),function(req,res){
	console.log("server started");
	app.get('/',function(req,res){
		res.setHeader('Content-Type', 'application/json');
		var params = JSON.parse(req.query.data);
		var checkParams = new chkParamsSendRequest(params,app);
		checkParams.init(oriento,config,dbClass);
		eventEmitter.on("gtResponse",function(){
			var data = getData(params);
			printResponse(res,data);
		});
	})
});

function getData(params){
	var data =  app.get("jsonObj");
	return data;
}

/*
* Expected Params 
{"books":{"available":"1","name":"","authors":""}}
{"authors":{"name":"S.","books":"1"}}
{"members":{"name":"","authors":"1","books":""}}
{'fees':{"name":""}}
*/
function printResponse(res,data){
	res.end(JSON.stringify(data));
	return;
}
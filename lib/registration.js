function Registration(data,app){
	this.data = data;
	this.obj = app.get("oriento");
	this.config = app.get("config");
	this.app = app;
}

Registration.prototype.init = function(){
	var dbServer = this.obj({
	host:this.config.host,
	port:this.config.port,
	username:this.config.username,
	password:this.config.password
	});
	this.server = dbServer;
	this.selDb = this.server.use({name:this.config.dbname});
}

Registration.prototype.insert = function() {
	var app = this.app;
	var eventEmitter = app.get("eventEmitter");
	var v = app.get("validator");
	if(v.validateData(this.data) == false){
		return false;
	}
	//this.selDb.open();
	var que = "insert into users (name,phone,email) values ('"+this.data.name+"','"+this.data.phone+"','"+this.data.email+"')";
	this.selDb.query(que)
	.then(function(res){
			console.log("data inserted into db");
			eventEmitter.emit('inserted');
			//this.selDb.close();
	});

};

Registration.prototype.sendMail = function(){
	var app = this.app;
	var eventEmitter = app.get("eventEmitter");
	var emailer = require('./emailer.js');
	var email = new emailer();
	email.init();
	email.send();
	eventEmitter.emit('mlsnt');
}

Registration.prototype.sucess = function(){
	console.log("Registration Module Sucessfully executed...!!");
}

module.exports = Registration;
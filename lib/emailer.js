var emailer = function(){
	this.nodemailer = require('nodemailer');
	this.smtpTransport = require('nodemailer-smtp-transport');
}

emailer.prototype.init = function(first_argument) {
	this.mailer = this.nodemailer.createTransport(this.smtpTransport({
    	host: 'localhost',
    	port: 2525,
    	auth: {
        	user: 'username',
        	pass: 'password'
    	}
	}));
}

emailer.prototype.send = function(data,eventEmitter){
	this.mailer.sendMail({
		from: 'Test',
		to: data.email,
		subject: 'Test Email',
		text: "Hello "+data.name+" this is a test email sent with phone no:"+data.phone
	},
	function(err, info){
		if(err) {
			console.log("error==="+err); 
			eventEmitter.emit("mailNtSentEvnt");
			return false;
		}
		else {
			console.log(info);
			eventEmitter.emit("mailSentEvnt");
			return true;
		}
	});
}
module.exports = emailer;
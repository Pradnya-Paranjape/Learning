var emailer = function(){
	this.nodemailer = require('nodemailer');
}

emailer.prototype.init = function(first_argument) {
	this.mailer = this.nodemailer.createTransport('SMTP',{
	host: 'smtp.meadowlarktravel.com',
	secureConnection: true,
	port: 465,
	auth: {
	user: 'pradnya.paranjape',
	pass: '',
	}
	});
}

emailer.prototype.send = function(){
	this.mailer.sendMail({
		from: '"Meadowlark Travel" <info@meadowlarktravel.com>',
		to: 'pradnya.paranjape@gmail.com',
		subject: 'Test Email',
		text:"this is a test email sent"
	},
	function(err){
		if(err) console.error( 'Unable to send email: ');
	});
}

module.exports = emailer;
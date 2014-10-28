
function validate(){}

validate.prototype.validateData = function(data,error){
	this.data =  data;
	this.error = error;
	if(this.phoneVal() == false){
		return false;
	}
}

validate.prototype.phoneVal = function(){
	if(this.data.phone.length < 10 || this.data.phone.length > 10 ){
		this.error[this.error.length] = 'Phone Length max 10 digits';
		return false;
	}
	else{
		var phoneno = /^\d{10}$/;  
		var phone = new RegExp(phoneno);
		if(!this.data.phone.match(phone)){
			this.error[this.error.length] = 'Allows only digits in phone';
			return false;
		} 
	}
}

module.exports = validate;
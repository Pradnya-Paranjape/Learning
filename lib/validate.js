
function validate(){}

validate.prototype.validateData = function(data){
	console.log("data validated");
	this.data =  data;
	if(this.phoneVal() == false){
		return false;
	}
}

validate.prototype.phoneVal = function(){
	if(this.data.phone.length < 10 || this.data.phone.length > 10 ){
		console.log("Phone length 10 digits...");
		return false;
	}
	else{
		var phoneno = /^\d{10}$/;  
		var phone = new RegExp(phoneno);
		console.log(phone);
		if(!this.data.phone.match(phone)){
			console.log("allows only digits in phone");
			return false;
		} 
	}
}

module.exports = validate;
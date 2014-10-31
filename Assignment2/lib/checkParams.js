var checkParams = function(data,app){
	this.data = data;
	this.app = app;
}

checkParams.prototype.init = function(oriento,config,dbClass) {
	this.obj = new dbClass(oriento,config,this.app);
	if(this.data.books != undefined){
		return this.getBooks(this.data.books);
	}
	if(this.data.authors != undefined){
		return this.getAuthors(this.data.authors);
	}
	if(this.data.members != undefined){
		return this.getMemberBooksAuthors(this.data.members);	
	}
	if(this.data.fees != undefined){
		return this.getfeesForMember(this.data.fees);
	}
}

/*
*
*/
checkParams.prototype.getBooks = function(params){
	console.log("listing books");
	var app = this.app;
	var jsonArr = new Array();
	var jsonObj = {};
	var eventEmitter = app.get("eventEmitter");
	if(params.authors != undefined && params.name != ''){
		this.obj.listbooksAuthors(params,eventEmitter);
	}
	else{
	this.obj.searchAvailBooks(params,eventEmitter);
	}
	formJsonObj(app,eventEmitter);
}

checkParams.prototype.getAuthors = function(params){
	console.log("listing Authors");
	var app = this.app;
	var jsonArr = new Array();
	var jsonObj = {};
	var eventEmitter = app.get("eventEmitter");
	if(params.books != undefined && params.name != ''){
		this.obj.listAuthorsBooks(params,eventEmitter);
	}
	else{
		this.obj.searchAuthors(params,eventEmitter);
	}
	formJsonObj(app,eventEmitter);	
}

checkParams.prototype.getMemberBooksAuthors = function(params){
	var app = this.app;
	var eventEmitter = app.get("eventEmitter");
	if(params.name != undefined && params.name != "" && params.books != undefined){
		this.obj.booksByMember(params,eventEmitter);	
	}
	else if(params.name != undefined && params.name != "" && params.authors != undefined){
		this.obj.authorsbyMembers(params,eventEmitter);
	}
	formJsonObj(app,eventEmitter);
}

checkParams.prototype.getfeesForMember = function(params){
	var app = this.app;
	var eventEmitter = app.get("eventEmitter");
	if(params.name != undefined && params.name != ''){
		
	}
	else{
		
	}

}

var formJsonObj = function(app,eventEmitter){
	eventEmitter.on("gotrecords",function(ret){
	var jsonArr = new Array();
	var jsonObj = {};
	var recds = app.get("records");
		for(var i=0;i<recds.length;i++){
			jsonArr[i]= '{"'+i+'":"'+recds[i].name+'"}';
		}
		i=0;
		jsonObj.json = jsonArr;
		jsonArr = [];
		app.set("jsonObj",jsonObj);
		eventEmitter.emit("gtResponse");
	});
}

module.exports = checkParams;
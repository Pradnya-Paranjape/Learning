var databaseCls = function(obj,config,app){
	this.dbObj = obj({
		host:config.host,
		port:config.port,
		user:config.username,
		password:config.password
	});
	this.selDb = this.dbObj.use({name:config.dbname});
	this.app = app;
}

databaseCls.prototype.booksByMember = function(params,eventEmitter){
	var app = this.app;
	var que = "select name from books where @RID in ( select inV() from takes where out in (select @RID from members where name like '%"+params.name+"%'))";
	this.onQuerySucessThen(que,app,eventEmitter);
}

databaseCls.prototype.authorsbyMembers = function(params,eventEmitter){
	var app = this.app;
	var que = "select name from authors where @RID in (select inV() from has where out in ( select in from takes where out in ( select @RID from members where name like '%"+params.name+"%')))";	
	this.onQuerySucessThen(que,app,eventEmitter);
}

/*
* Search for available (in library) or not available books
*/
databaseCls.prototype.searchAvailBooks = function(params,eventEmitter){
	var where = " ";
	var app = this.app;
	if(params.available == 0){
		where = "where in_takes is not null";
	}
	else{
		if(params.available == 1){
			where = "where in_takes is null";
		}
	}
	if(params.name != undefined && params.name != ''){
		if(params.available == 'all' || params.available == undefined){
			where = " where name like '%"+params.name+"%'";
		}
		else{
		where += " and name like '%"+params.name+"%'";
		}
	}
	var que = "select name from books "+where+")";
	this.selDb.query(que)
	this.onQuerySucessThen(que,app,eventEmitter);
}

databaseCls.prototype.listbooksAuthors = function(params,eventEmitter){
	var app = this.app;
	var que = "select name from authors where @RID in (select in from (select expand(outE('has')). from books where name like '%"+params.name+"%'))";	
	this.onQuerySucessThen(que,app,eventEmitter);
}

/*
* List books for a author and the all the books of authors with greater than 1 book
*/
databaseCls.prototype.searchAuthors = function(params,eventEmitter){
	var where = "";
	var app = this.app;
	if(params.name != '' && params.name != undefined){
		where = " where name like '%"+params.name+"%'";
	}
	var que = "select name from authors "+where;
	this.onQuerySucessThen(que,app,eventEmitter);
}

/*
* List books of authors having multiple books
* List authors having multiple books
*/
databaseCls.prototype.listAuthorsBooks = function(params,eventEmitter){
	var app = this.app;
	var que = "select name from books where @RID in ( select inV() from owns where outV() in ( select @RID from authors where name like '%"+params.name+"%'))";
	this.onQuerySucessThen(que,app,eventEmitter);
}

databaseCls.prototype.onQuerySucessThen = function(que,app,eventEmitter){
	this.selDb.query(que)
	.then(function(recds){
		app.set("records",recds);
		eventEmitter.emit("gotrecords");
	});
	
}
module.exports = databaseCls;
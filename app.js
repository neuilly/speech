//..................initialize required modules
var express = require('express');
var app=express();
var http=require('http');

//map exrress default file folder to the subfolder /public under the folder that contains app.js [__dirname]
app.use(express.static(__dirname + '/public'));


//start the server listening at port 6789 when running locally or to the default remote port when deploying online
var server = app.listen(process.env.PORT || 6789, function() {
    console.log('Listening on port %d', server.address().port);
});

//................................Socket.io
var io = require('socket.io').listen(server);

var id=1;
var cubes={};//depository for cubes

io.sockets.on('connection', function (socket) {
  console.log("CONNECTION");

  socket.on('disconnect', function(){
  });
   /*
  socket.on("clicked", function(data){
  	console.log("clicked:");
  	console.log(data);
  	socket.emit("youClicked",data);
  })
  socket.on("addCube", function(data){
  	if(!socket.user){
  		socket.emit("pleaseLogin",{});
  		return;
  	}
  	console.log("addCube:");
  	console.log(data);

  	var cubepacket={point:data.point,id:id, color:socket.user.color, userid:socket.user.id};
  	cubes[id]=cubepacket;
  	console.log(cubes);
  	id++;

	io.sockets.emit("cubeAdded", cubepacket);
  });
*/
//....................................Users

  socket.on("login",function(data){
  	if(usersByName[data.name]){
  		//username exists
  		var u = usersByName[data.name];
  		if(u.password==data.password){
			u.color=data.color;
			var userpacket ={name:data.name,color:u.color,id:u.id};
			socket.user =u;
  			socket.emit("loggedin",userpacket);
	  	}else{
  			socket.emit("loginFailed",{error:"password mismatch"});
  		}
  	}else{
 		var u = new User(data.name, data.password, data.color);
 		socket.user =u;
 		var userpacket ={name:data.name,color:data.color,id:u.id};
  		socket.emit("loggedin",userpacket);
  	}

  	console.log(usersByName);
  });
});

var userid=1;
var usersByName ={};

function User(name,password,color){
	this.name=name;
	this.password=password;
	this.color=color;
	this.id=userid;
	userid++;
	usersByName[this.name]=this;
}
'use strict';

var fs = require('fs');
var path = require('path');
var spawn = require("child_process").spawn;

var filename = process.argv[2];
var method = process.argv[3];


console.log('filename: ', filename);
console.log('method: ', method);

fs.writeFile('./temp_2.txt', 'Create new temp.txt file ', function (err) {
	if (err) return console.log(err);
	console.log('create txt file');
});


var delFunction = function (curr, prev){
	fs.unwatchFile(filename, listener);
	console.log("unwatchFile");
	fs.unlinkSync(filename);
	console.log('successfully deleted ' + filename);
};

var copyFunction = function (curr, prev){
	var mtime =	fs.lstatSync(filename)['mtime'];
	try {
		fs.mkdirSync(path.dirname(filename) + "/Copy");
	} catch(e) {
		if (e.code != 'EEXIST' ) throw e;
	}

	console.log('stats mtime : ' + mtime);
	var tempfileName = path.dirname(filename) + "/Copy/" + (mtime.toLocaleDateString() + '/' + mtime.toLocaleTimeString() + '/' + filename).replace(new RegExp("/",'g'),"_").replace(new RegExp(":",'g'),'-');
	console.log("tempfileName:  " + tempfileName);

	fs.writeFile(tempfileName, fs.readFileSync(filename) + '\n' + tempfileName, function (err){
		if (err) return console.log("write file ", err);
		console.log('create copy txt file');
	});

	console.log('successfully copy file ' + filename);
}
var listener = function (curr, prev){
	console.log("File just changed!");

	var dir = spawn('cmd', ['/$', '/C', 'dir', filename]);
	dir.stdout.pipe(process.stdout);

	switch(method){
		case 'Del':{
			delFunction();
			break;
		}
		case 'Copy': {
			copyFunction();
			break;
		}
	};
};

if(fs.existsSync(filename)){
	fs.watchFile(filename, listener);
	console.log('Start watching file');
}
else{
	console.log(filename + " doesn't exist");
};


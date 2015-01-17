//http://ocsigen.org/js_of_ocaml/manual/

//ocamlfind ocamlc -package js_of_ocaml -package js_of_ocaml.syntax \ -syntax camlp4o -linkpkg -o cubes.byte cubes.ml

//js_of_ocaml cubes.byte
var path = require("path"),
	exec = require('child_process').exec,
	http = require('http');

function buildOCaml(filepath, targetPath, callback){



	//first convert ml code to bytecode
	var command = "ocamlfind ocamlc -package js_of_ocaml -package js_of_ocaml.syntax \
	 -syntax camlp4o -linkpkg -o ";
	
	
	var fileName = path.basename(filepath,'.ml'),
		filePath = path.dirname(filepath),
    	oCamlBuild,
    	js_of_ocamlBuild;

   	command+= " "+path.resolve(filePath,fileName+".byte");
   	command+= " "+path.resolve(filePath,fileName+".ml");
	
	oCamlBuild = exec(command,function (error, stdout, stderr) {
	    console.log('stdout: ' + stdout);
	    console.warn('stderr: ' + stderr);
	    if (error !== null) {
	      console.error('exec error: ' + error);
	    }
	    transformToJS(filepath,targetPath,callback);
	});
}

function transformToJS(filepath,targetPath,callback){
		var jsCommand = "js_of_ocaml";
		
		var fileName = path.basename(filepath,'.ml'),
			filePath = path.dirname(filepath);

		jsCommand += " "+path.resolve(filePath,fileName+".byte")+" -o "+path.resolve(targetPath+fileName+".js")	;
		//then transform the bytecode into JS
		js_of_ocamlBuild = exec(jsCommand,function (error, stdout, stderr) {
		    console.log('stdout: ' + stdout);
		    console.log('stderr: ' + stderr);
		    if (error !== null) {
		      console.log('exec error: ' + error);
		    }
		});

		if(callback && typeof(callback)==='function'){
			callback(null,filepath,targetPath);
		}
	}


buildOCaml("src/ocaml/test.ml","src/js/",null);

/**
* Local server, tied with livereload
*/

var connect = require('connect');
var serveStatic = require('serve-static');
var app= connect();

app.use(require('connect-livereload')({
    port: 35729
  }));
app.use(serveStatic(__dirname+'/src'));

http.createServer(app).listen(8080);


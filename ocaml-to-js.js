/**
 */
//http://ocsigen.org/js_of_ocaml/manual/

var path = require("path"),
    exec = require('child_process').exec;



var horseCaml = function horseCaml(filepath, targetPath, callback) {

    //first convert ml code to bytecode
    var command = "ocamlfind ocamlc -package js_of_ocaml,js_of_ocaml.syntax \
	 -syntax camlp4o -linkpkg -o ";


    var fileName = path.basename(filepath, '.ml'),
        filePath = path.dirname(filepath),
        oCamlBuild;

    command += " " + path.resolve(filePath, fileName + ".byte");
    command += " " + path.resolve(filePath, fileName + ".ml");

    oCamlBuild = exec(command, function(error, stdout, stderr) {
        console.log("\n--- OCaml compile to bytecode ---");
        console.log('stdout: ' + stdout);
        console.warn('stderr: ' + stderr);
        if (error !== null) {
            console.error('exec error: ' + error);
        } else {
            console.log('OK');
        }
        transformToJS(filepath, targetPath, callback);
    });
}

function transformToJS(filepath, targetPath, callback) {
    var jsCommand = "js_of_ocaml";

    var fileName = path.basename(filepath, '.ml'),
        filePath = path.dirname(filepath);

    jsCommand += " " + path.resolve(filePath, fileName + ".byte") + " -o " + path.resolve(targetPath + fileName + ".js");
    //then transform the bytecode into JS
    js_of_ocamlBuild = exec(jsCommand, function(error, stdout, stderr) {

        console.log("\n--- js_of_ocaml bytecode to javascript ---");
        stdout ? console.log('stdout: ' + stdout) : "";
        stderr ? console.log('stderr: ' + stderr) : "";
        if (error !== null) {
            console.log('exec error: ' + error);
        } else {
            console.log('OK');
        }

        if (callback && typeof(callback) === 'function') {
            callback(null, filepath, targetPath);
        }
    });


}

module.exports = horseCaml;

var BASE_DIRECTORY = "H:/eclipse/workspace/CreateJsTestByHaxe/haxelib/examples/box2d/haxe/";
var JSFL_MAIN_URI = BASE_DIRECTORY + "jsfl/FlashToHaxe.jsfl";
var FLA_FILE_URI = BASE_DIRECTORY + "fla/box2d.fla";
var PUBLISH_DIRECTORY = BASE_DIRECTORY;
var FLASH_HAXE_DIRECTORY = "swf_as3/";
var CREATEJS_HAXE_DIRECTORY = "swf_haxe/";
var SYMBOL_NAMESPACE = "lib";

var PRE_URI = "file:///";
fl.runScript(PRE_URI + JSFL_MAIN_URI);
new Main(
	PRE_URI + FLA_FILE_URI,
	PRE_URI + PUBLISH_DIRECTORY + FLASH_HAXE_DIRECTORY,
	PRE_URI + PUBLISH_DIRECTORY + CREATEJS_HAXE_DIRECTORY,
	SYMBOL_NAMESPACE,
	true
);

//publish swf
//fl.publishDocument(PRE_URI + FLA_FILE_URI);

//publish Toolkit for CreateJS
//fl.runScript(PRE_URI + "C:/Users/username/AppData/Local/Adobe/Flash CS6/ja_JP/Configuration/CreateJS/jsfl/Publish for CreateJS.jsfl");

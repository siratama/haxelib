package com.dango_itimi.toolkit_for_createjs;

class MaterialURI {
	
	private static var baseDirectory:String;
	private static var baseSoundsDirectory:String;
	public static var usedSoundOgg:Bool;
	
	public static inline var EXT_HTML = ".html";
	public static inline var EXT_MP3 = ".mp3";
	public static inline var EXT_OGG = ".ogg";

	public static function initialize(
		baseDirectoryName:String, usedSoundOgg:Bool, baseSoundsDirectoryName:String){
			
		MaterialURI.baseDirectory = baseDirectoryName + "/";
		MaterialURI.usedSoundOgg = usedSoundOgg;
		
		MaterialURI.baseSoundsDirectory = 
			(baseSoundsDirectoryName != "") ? baseSoundsDirectoryName + "/" : "";
	}
	public static function getTemplateHtmlUri(materialDirectoryName:String){
		
		return baseDirectory + materialDirectoryName + "/" + materialDirectoryName + EXT_HTML;
	}
	public static function getMaterialDirectory(materialDirectoryName:String){
		
		return baseDirectory + materialDirectoryName + "/";
	}
	public static function getSoundsDirectory(materialDirectoryName:String){
		
		var soundDirectory = (baseSoundsDirectory == "") ? baseDirectory : baseSoundsDirectory;
		return soundDirectory + materialDirectoryName + "/";
	}
}

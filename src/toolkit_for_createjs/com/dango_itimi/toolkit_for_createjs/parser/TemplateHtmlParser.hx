package com.dango_itimi.toolkit_for_createjs.parser;

import js.Lib;

class TemplateHtmlParser {

	private static inline var QUOTATION:String = "\"";
	
	public static function execute(loadedHtml:String, materialDirectoryName:String):Array<Dynamic>{

		var lineSet:Array<String> = loadedHtml.split("\n");
		
		var checkedFirstLineNum = getManifestVariablesLineNumber(lineSet) + 1;
		var checkedEndLineNum = getManifestVariablesEndLineNumber(lineSet, checkedFirstLineNum);
		 
		var manifest = getManifest(lineSet, checkedFirstLineNum, checkedEndLineNum);
		addUri(manifest, materialDirectoryName);
		
		return manifest;
	}
	private static function getManifestVariablesLineNumber(lineSet:Array<String>){
		
		for(i in 0...lineSet.length){
			if(lineSet[i].indexOf("manifest") != -1) return i;
		}
		//error
		return 0;
	}
	private static function getManifestVariablesEndLineNumber(lineSet:Array<String>, checkedFirstLineNum:Int){
		
		for(i in checkedFirstLineNum...lineSet.length){
			if(lineSet[i].indexOf("];") != -1) return i;
		}
		//error
		return 0;
	}
	private static function getManifest(
		lineSet:Array<String>, 
		checkedFirstLineNum:Int,
		checkedEndLineNum:Int
	):Array<Dynamic>{
		
		var list:Array<Dynamic> = [];

		for(i in checkedFirstLineNum...lineSet.length){
			
			if(i == checkedEndLineNum) break;

			var line:String = lineSet[i];
			var arr = line.split(QUOTATION);
			var src:String = arr[1];
			var id:String = arr[3];
			var data:Dynamic = {};
			data.src = src;
			data.id = id;
			list.push(data);
		}

		return list;
	}
	private static function addUri(manifest:Array<Dynamic>, materialDirectoryName:String){
			
		var materialDirectory = MaterialURI.getMaterialDirectory(materialDirectoryName);
		var soundsDirectory = MaterialURI.getSoundsDirectory(materialDirectoryName);

		for(i in 0...manifest.length){
			
			var src:String = manifest[i].src;
			
			if(src.indexOf(MaterialURI.EXT_MP3) == -1){
				
				manifest[i].src = materialDirectory + src;
			}
			else{
				
				var oggSrc:String = (MaterialURI.usedSoundOgg) ? 
					"|" + soundsDirectory + src.split(".")[0] + MaterialURI.EXT_OGG : 
					"";
				
				manifest[i].src = soundsDirectory + src + oggSrc;
			}
		}
	}
}

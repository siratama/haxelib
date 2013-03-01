package com.dango_itimi.toolkit_for_createjs;

import com.dango_itimi.toolkit_for_createjs.loader.TemplateHtmlLoader;
import com.dango_itimi.toolkit_for_createjs.loader.MaterialLoader;
import com.dango_itimi.toolkit_for_createjs.parser.TemplateHtmlParser;

/**
 * TFC: Toolkit For CreateJS
 */
class TFCLoader {
	
	private var mainFunction:Void->Void;
	private var materialURI:MaterialURI;
	private var materialDirectorySet:Array<String>;
	
	private var templateHtmlLoader:TemplateHtmlLoader;
	private var templateHtmlParser:TemplateHtmlParser;
	private var materialLoader:MaterialLoader;
	
	public function new(
		baseDirectoryName:String, 
		?baseSoundsDirectoryName:String = "",
		?usedSoundOgg:Bool = false
	){
		MaterialURI.initialize(baseDirectoryName, usedSoundOgg, baseSoundsDirectoryName);
		materialDirectorySet = [];
		
		mainFunction = initializeToLoadTemplateHtml;
	}
	public function addMaterialDirectory(materialDirectoryName:String){
		
		materialDirectorySet.push(materialDirectoryName);
	}
	public function run(){
		
		mainFunction();
	}
	private function initializeToLoadTemplateHtml(){

		templateHtmlLoader = new TemplateHtmlLoader(materialDirectorySet);
		templateHtmlLoader.load();
		mainFunction = loadTemplateHtml;
	}
	private function loadTemplateHtml(){
		
		templateHtmlLoader.run();
		if(templateHtmlLoader.isFinished())
			parseTemplateHtml();

		else if(templateHtmlLoader.getLoader().isError())
			mainFunction = error;
	}
	private function parseTemplateHtml(){
		
		var loader = templateHtmlLoader.getLoader();

		var manifest:Array<Dynamic> = [];
		for(i in 0...materialDirectorySet.length){
			
			var materialDirectoryName = materialDirectorySet[i];
			var templateHtmlUri = MaterialURI.getTemplateHtmlUri(materialDirectoryName);
			var loadedHtml = loader.getLoadQueue().getResult(templateHtmlUri);

			manifest = manifest.concat(TemplateHtmlParser.execute(
				loadedHtml, materialDirectoryName
			));
		}
		initializeToLoadMaterial(manifest);
	}
	private function initializeToLoadMaterial(manifest:Array<Dynamic>){

		materialLoader = new MaterialLoader(manifest);
		materialLoader.load();
		mainFunction = loadMaterial;
	}
	private function loadMaterial(){
		
		materialLoader.run();
		if(materialLoader.isFinished())
			mainFunction = finish;
	}
	private function finish(){
	}
	public function isFinished():Bool{
		return Reflect.compareMethods(mainFunction, finish);
	}
	private function error(){
	}
	public function isError():Bool{
		return Reflect.compareMethods(mainFunction, error);
	}
}

package com.dango_itimi.toolkit_for_createjs.loader;

import com.dango_itimi.createjs.net.LoaderWithLoadQueue;
import com.dango_itimi.createjs.net.manifest.ManifestItemSet;

class TemplateHtmlLoader {
	
	private var loader:LoaderWithLoadQueue;
	private var manifestItemSet:ManifestItemSet;
	private var mainFunction:Dynamic;

	public function new(materialDirectorySet:Array<String>, materialURI:MaterialURI){
		
		manifestItemSet = new ManifestItemSet();
		
		for(i in 0...materialDirectorySet.length){
			manifestItemSet.add(
				materialURI.getTemplateHtmlUri(materialDirectorySet[i])
			);
		}
		loader = new LoaderWithLoadQueue();
	}
	public function run(){
		
		mainFunction();
	}
	public function load(){
		
		loader.loadManifest(manifestItemSet.createManifest());
		mainFunction = waitToFinishLoaded;
	}
	private function waitToFinishLoaded(){

		if(loader.isFinished())
			mainFunction = finish;
	}
	private function finish(){
	}	
	public function isFinished():Bool{
		return Reflect.compareMethods(mainFunction, finish);
	}
	public function getLoader():LoaderWithLoadQueue{
		return loader;
	}
}

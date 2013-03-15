package com.dango_itimi.as3.net.core;
	
import flash.net.URLRequest;
import flash.net.URLLoader;

class TextLoader extends FileLoader{

	private var loader:URLLoader;

	public function TextLoader(request:URLRequest){

		super(request);

		loader = new URLLoader();
		ev = loader as URLLoader;
	}
	override public function execute(){
		super.execute();
		loader.load(request);
	}
	override public function getLoadData():Dynamic {

		return loader.data;
	}
	override private function closeLoader(){

		loader.close();
	}
	override private function unloadLoader(){

		state = STATE_UNLOAD;
	}
}


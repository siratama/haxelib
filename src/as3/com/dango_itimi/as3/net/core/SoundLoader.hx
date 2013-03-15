package com.dango_itimi.as3.net.core;

import flash.media.Sound;
import flash.net.URLRequest;

class SoundLoader extends FileLoader {

	private var loader:Sound;

	public function new(request:URLRequest) {

		super(request);

		loader = new Sound();
		ev = loader;
	}
	override public function execute(){

		super.execute();
		loader.load(request);
	}
	override public function getLoadData():Dynamic{

		return loader;
	}
	override private function closeLoader(){

		loader.close();
	}
	override private function unloadLoader(){

		state = STATE_UNLOAD;
	}
}


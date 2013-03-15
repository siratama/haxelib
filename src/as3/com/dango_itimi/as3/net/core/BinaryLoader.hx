package com.dango_itimi.as3.net.core;
	
import flash.display.Loader;
import flash.net.URLRequest;
import flash.system.ApplicationDomain;
import flash.system.LoaderContext;

/**
 * バイナリデータ読み込み : swf, 画像ファイル
 */
class BinaryLoader extends FileLoader{

	private var loader:Loader;
	private var context:LoaderContext;

	public function new(
		urlRequest:URLRequest,
		?applicationDomain:ApplicationDomain = null
	) {
		super(urlRequest);

		loader = new Loader();

		context = new LoaderContext();
		context.applicationDomain = (applicationDomain != null) ?
			ApplicationDomain.currentDomain : applicationDomain;

		ev = loader.contentLoaderInfo;
	}
	override public function execute(){

		super.execute();
		loader.load(urlRequest, context);
	}
	override public function getLoadData():Dynamic {

		return loader.content;
	}
	override private function closeLoader(){

		loader.close();
	}
	override private function unloadLoader(){

		loader.unload();

		//Error #2044 : IOError
		//Flash CS4 ムービープレビュー用 Flash Player で発生
		//loader.unloadAndStop();
	}
}

package com.dango_itimi.as3.net.core;
import flash.errors.Error;
import flash.events.IOErrorEvent;
import flash.events.Event;
import flash.events.ProgressEvent;
import flash.events.EventDispatcher;
import flash.net.URLRequest;
class FileLoader {

	public static inline var STATE_NON:Int = 0;
	public static inline var STATE_LOADING:Int = 1;
	public static inline var STATE_SUC:Int = 2;
	public static inline var STATE_ERR:Int = 3;
	public static inline var STATE_UNLOAD:Int = 4;
	private var state:Int;

	private var urlRequest:URLRequest;
	private var ev:EventDispatcher;
	private var bytesLoaded:Float = 0;
	private var bytesTotal:Float = 0;

	public static inline var LOADER_KIND_FILE:Int = 1;
	public static inline var LOADER_KIND_TEXT:Int = 2;
	private var loaderKind:Int;

	public function new(urlRequest:URLRequest) {
		this.urlRequest = urlRequest;
		state = STATE_NON;
	}

	public function execute() {
		state = STATE_LOADING;
		setEventListener();
	}
	private function setEventListener() {

		ev.addEventListener(Event.COMPLETE, loadComplete);
		ev.addEventListener(ProgressEvent.PROGRESS, progressed);
		ev.addEventListener(IOErrorEvent.IO_ERROR, loadError);
	}
	public function finishLoading(){

		releaseEventListener();
	}
	private function releaseEventListener(){

		if(ev.hasEventListener(Event.COMPLETE))
			ev.removeEventListener(Event.COMPLETE, loadComplete);

		if(ev.hasEventListener(ProgressEvent.PROGRESS))
			ev.removeEventListener(ProgressEvent.PROGRESS, progressed);

		if(ev.hasEventListener(IOErrorEvent.IO_ERROR))
			ev.removeEventListener(IOErrorEvent.IO_ERROR, loadError);
	}

	private function progressed(ev:ProgressEvent){

		bytesLoaded = ev.bytesLoaded;
		bytesTotal = ev.bytesTotal;
	}
	private function loadComplete(ev:Event){

		state = STATE_SUC;
	}
	private function loadError(ev:IOErrorEvent){

		state = STATE_ERR;
		trace(this, ev);
	}

	public function checkLoading():Bool {

		return state == STATE_LOADING;
	}
	public function checkLoadingError():Bool {

		return state == STATE_ERR;
	}

	//complete イベント発生前に
	//対象ファイルの読み込みが完了しているかどうか調査
	public function isLoadingComplete():Bool{

		return state == STATE_SUC || isLoadBytesComplete();
	}
	private function isLoadBytesComplete():Bool{

		if(bytesLoaded == 0) return false;
		return bytesLoaded == bytesTotal;
	}
	public function getProgressPersentage():Int{

		if(bytesLoaded == 0) return -1;
		return Math.floor(bytesLoaded / bytesTotal * 100);
	}
	//override
	public function getLoadData():Dynamic {
		return null;
	}

	/**
	 * close
	 */
	public function close(){

		//読み込み途中での 読み込み中断処理の場合 ストリームクローズ
		if(state == STATE_LOADING && !isLoadBytesComplete()){

			trace(this, "close");

			try{
				closeLoader();

			//読み込みが開始していない場合の close 呼び出し
			}catch(e:Error){

				//trace(ClassCreator.getClassName(this), e);
			}
		}
	}
	//override
	private function closeLoader(){}

	/**
	 * unload
	 */
	public function executeUnloading(){

		close();
		ev.addEventListener(Event.UNLOAD, unloadListener);
		unloadLoader();

		if(state != STATE_SUC || !isLoadBytesComplete()) state = STATE_UNLOAD;
	}
	//override
	private function unloadLoader(){}

	private function unloadListener(ev:Event){

		state = STATE_UNLOAD;
	}
	public function finishUnloading(){

		releaseEventListener();

		if(ev.hasEventListener(Event.UNLOAD))
			ev.removeEventListener(Event.UNLOAD, unloadListener);
	}
	public function getState():Int {
		return state;
	}
}

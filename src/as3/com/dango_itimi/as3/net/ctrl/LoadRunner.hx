package com.dango_itimi.as3.net.ctrl;

import Reflect;
import com.dango_itimi.as3.net.action.ILoadAction;
import com.dango_itimi.as3.net.core.FileLoader;

class LoadRunner {

	private var loader:FileLoader;
	private var action:ILoadAction;
	private var mainFunction:Void->Void;

	public function new(loader:FileLoader, action:ILoadAction = null) {

		this.action = action;
		this.loader = loader;
	}
	public function run(){

		mainFunction();
	}
	public function destroy(){

		if(action != null) action.destroy();
	}

	/**
	 * load
	 */
	public function execute(){

		loader.execute();
		if(action != null) action.loadStart();
		mainFunction = watchLoading;
	}
	private function watchLoading(){

		if(action != null) action.watchProgress(loader.getProgressPersentage());
		if(loader.getState() != FileLoader.STATE_LOADING) destroyLoading();
	}
	private function destroyLoading(){

		loader.finishLoading();

		if(action == null){
			mainFunction = finishLoading;
			return;
		}

		if(loader.getState() == FileLoader.STATE_ERR) action.loadError();
		else action.loadSuccess();

		mainFunction = (action.viewRest()) ? finishLoading : runRestProgress;
	}
	private function runRestProgress(){

		if(action.viewRest()) mainFunction = finishLoading;
	}
	private function finishLoading() {
	}
	public function isLoadFinished():Bool {
		return Reflect.compareMethods(mainFunction, finishLoading);
	}
	public function getLoadData():Dynamic{

		return loader.getLoadData();
	}


	/**
	 * close or unload
	 */
	public function close(){

		loader.close();
		mainFunction = finishUnloading;
	}
	public function executeUnloaded(){

		loader.executeUnloading();
		mainFunction = watchUnloading;
	}
	private function watchUnloading(){

		if(loader.getState() != FileLoader.STATE_UNLOAD) return;

		loader.finishUnloading();
		mainFunction = finishUnloading;
	}
	private function finishUnloading() {
	}
	public function isUnloadFinished():Bool {
		return Reflect.compareMethods(mainFunction, finishUnloading);
	}

}


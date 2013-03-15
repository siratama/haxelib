package com.dango_itimi.as3.net.ctrl;

import Reflect;
import flash.errors.Error;

class LoadRunnerMap {

	private var mainFunction:Void->Void;
	private var loadRunnerMap:Hash<LoadRunner>;
	private var loadRunnerSet:Array<LoadRunner>;
	private var loadingRunner:LoadRunner;
	private var unloadRunner:LoadRunner;
	private var loadCompleteCount:Int;
	private var unfinishedLoadRunnerSet:Array<LoadRunner>;
	private var unloadedRunnerSet:Array<LoadRunner>;
	private var calledChangePriorityMethod:Bool;

	public function new() {

		loadCompleteCount = 0;
		loadRunnerMap = new Hash();
		loadRunnerSet = new Array<LoadRunner>();
	}
	public function add(loadRunner:LoadRunner, url:String){

		loadRunnerSet.push(loadRunner);
		loadRunnerMap.set(url, loadRunner);
	}
	public function checkAddedLoadRunner():Bool {

		return loadRunnerSet.length > 0;
	}

	public function run(){

		mainFunction();
	}

	/**
	 * load
	 */
	public function execute(){

		unfinishedLoadRunnerSet = loadRunnerSet.slice(loadCompleteCount);
		setLoadingRunner();
	}
	private function setLoadingRunner(){

		loadingRunner = unfinishedLoadRunnerSet.shift();
		loadingRunner.execute();
		mainFunction = watchLoading;
	}
	private function watchLoading(){

		loadingRunner.run();
		if(loadingRunner.isLoadFinished())
			destroyLoading();
	}
	private function destroyLoading(){

		loadCompleteCount++;

		if(unfinishedLoadRunnerSet.length > 0) setLoadingRunner();

		else
			mainFunction = finishLoading;
	}
	private function finishLoading() {
	}
	public function isLoadFinished():Bool {
		return Reflect.compareMethods(mainFunction, finishLoading);
	}




	/**
	 * change priority
	 */
	/*
	public function checkLoadedCompleted(checkedUrl:String):Bool{

		var loadRunner:LoadRunner = loadRunnerMap.get(checkedUrl);
		var index:Int = loadRunnerSet.indexOf(loadRunner);

		return index < loadCompleteCount;
	}
	public function changePriority(priorityUrl:String):Bool{

		calledChangePriorityMethod = true;

		var loadRunner:LoadRunner = loadRunnerMap.get(priorityUrl);
		var index:Int = loadRunnerSet.indexOf(loadRunner);

		//読み込みは完了している or 最優先読み込み対象となっている
		if(index <= loadCompleteCount) return false;

		loadRunnerSet.splice(index, 1);
		loadRunnerSet.splice(loadCompleteCount, 0, loadRunner);

		loadingRunner.close();
		execute();
		return true;
	}
	// priorityUrlSet 内に現在読み込み中の URL が含まれている場合
	// その読み込みは一旦キャンセルされる
	public function changePluralPriority(priorityUrlSet:Array<String>):Bool {

		calledChangePriorityMethod = true;

		var changed:Bool = false;
		var setTotal:Int = priorityUrlSet.length;
		//for (var i:Number = setTotal - 1; i >= 0; i--) {

		var i:Int = setTotal - 1;
		while(i >= 0){

			var priorityUrl:String = priorityUrlSet[i];
			var loadRunner:LoadRunner = loadRunnerMap.get(priorityUrl);
			var index:Int = loadRunnerSet.indexOf(loadRunner);

			if(index < loadCompleteCount) break;

			changed = true;
			loadRunnerSet.splice(index, 1);
			loadRunnerSet.splice(loadCompleteCount, 0, loadRunner);
			i--;
		}
		if(!changed) return false;

		loadingRunner.close();
		execute();

		return true;
	}
	*/


	/**
	 *
	 */
	public function getLoadData(url:String):Dynamic {

		return loadRunnerMap.get(url).getLoadData();
	}
	public function getLoadDataFromId(id:Int):Dynamic{

		//読み込み順の変更を試みた場合 このメソッドを呼び出すとエラーとする
		if(calledChangePriorityMethod) throw new Error("don't use this method");

		return loadRunnerSet[id].getLoadData();
	}


	/**
	 * close or unload
	 */
	public function close(){

		for(loadRunner in loadRunnerSet) loadRunner.close();
	}

	public function initializeUnloaded(){

		for(loadRunner in loadRunnerSet) loadRunner.destroy();

		loadCompleteCount = 0;
		unloadedRunnerSet = loadRunnerSet.concat([]);
		setUnloadRunner();
	}
	private function setUnloadRunner(){

		unloadRunner = unloadedRunnerSet.shift();
		unloadRunner.executeUnloaded();
		mainFunction = unload;
	}
	private function unload(){

		unloadRunner.run();
		if(!unloadRunner.isUnloadFinished()) return;

		if(unloadedRunnerSet.length > 0) setUnloadRunner();
		else mainFunction = finishUnloading;
	}
	private function finishUnloading() {
	}
	public function isUnloadFinished():Bool {
		return Reflect.compareMethods(mainFunction, finishUnloading);
	}
}


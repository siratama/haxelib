package com.dango_itimi.as3.net.action;

interface ILoadAction {

	function destroy():Void;

	function loadStart():Void;
	function loadError():Void;
	function loadSuccess():Void;

	function watchProgress(progressPercentage:Int):Void;
	function viewRest():Bool;
}


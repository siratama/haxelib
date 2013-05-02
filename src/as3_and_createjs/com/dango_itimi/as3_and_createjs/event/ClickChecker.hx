package com.dango_itimi.as3_and_createjs.event;
class ClickChecker {

	private var mouseEventChecker:MouseEventChecker;
	private var mainFunction:Void->Void;
	private var count:Int;
	private var interval:Int;
	public var clicked(default, null):Bool;

	public function new(mouseEventChecker:MouseEventChecker, interval:Int = 5){

		this.mouseEventChecker = mouseEventChecker;
		this.interval = interval;
		clicked = false;
		mainFunction = waitDowned;
	}
	public function run(){

		mainFunction();
	}
	private function waitDowned(){

		if(mouseEventChecker.downed){
			count = 0;
			mainFunction = countInterval;
		}
	}
	private function countInterval(){

		count++;
		if(!mouseEventChecker.upped) return;
		clicked = count < interval;
		mainFunction = waitDowned;
	}
	public function removeClicked():Bool{
		var n = clicked;
		clicked = false;
		return n;
	}
}

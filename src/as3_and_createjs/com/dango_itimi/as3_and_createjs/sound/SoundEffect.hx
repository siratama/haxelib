package com.dango_itimi.as3_and_createjs.sound;
class SoundEffect {

	private var mainFunction:Void->Void;
	private var interval:Int;
	private var intervalFrame:Int;
	private var volume:Float;
	private var pan:Float;
	private var loop:Int;
	public var id(default, null):String;

	public function new(id:String, intervalFrame:Int, volume:Float, pan:Float, loop:Int){

		this.id = id;
		this.intervalFrame = intervalFrame;
		this.volume = volume;
		this.pan = pan;
		this.loop = loop;

		interval = 0;
		mainFunction = finish;
	}
	public function run() {
		mainFunction();
	}
	private function finish() {}
	public function isFinished():Bool {
		return Reflect.compareMethods(mainFunction, finish);
	}

	public function play() {

		if(interval > 0) return;

		playChild();
		interval = intervalFrame;
		mainFunction = decrementInterval;
	}
	private function playChild() {
	}
	private function decrementInterval() {

		if(interval > 0)
			interval--;
		else
			mainFunction = finish;
	}

	public function stop(){
		interval = 0;
		mainFunction = finish;
	}
}

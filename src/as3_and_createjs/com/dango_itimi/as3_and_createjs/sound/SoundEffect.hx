package com.dango_itimi.as3_and_createjs.sound;
class SoundEffect {

	private var mainFunction:Void->Void;
	private var interval:uint = 0;
	private var intervalFrame:Int;
	private var volume:Int;

	public function new(intervalFrame:Int, volume:Int){

		this.intervalFrame = intervalFrame;
		this.volume = volume;
		mainFunction = finish;
	}
	public function run() {
		mainFunction();
	}
	private function finish() {}
	public function isFinished():Bool {
		return mainFunction == finish;
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
}

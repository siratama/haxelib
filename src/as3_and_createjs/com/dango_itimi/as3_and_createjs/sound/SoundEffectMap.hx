package com.dango_itimi.as3_and_createjs.sound;
class SoundEffectMap {

	public var mute:Bool;
	private var soundEffectMap:Map<String, SoundEffect>;
	private var playingSoundEffectMap:Map<String, SoundEffect>;

	public function new(){

		playingSoundEffectMap = new Map();
		soundEffectMap = new Map();
		mute = false;
	}
	public function registerDynamic(soundClass:Dynamic, ?intervalFrame:Int = 5, ?volume:Float = 1.0, ?pan:Float = 0, ?interrupt:String = "", ?delay:Int = 0, ?offset:Int = 0, ?loop:Int = 0):String{
		return null;
	}
	public function run() {

		for(key in playingSoundEffectMap.keys()) {

			var soundEffect:SoundEffect = playingSoundEffectMap.get(key);
			soundEffect.run();

			if(soundEffect.isFinished())
				playingSoundEffectMap.remove(key);
		}
	}
	public function play(soundEffectId:String) {

		if(mute) return;
		if(playingSoundEffectMap.exists(soundEffectId)) return;

		var soundEffect = soundEffectMap.get(soundEffectId);

		soundEffect.play();
		playingSoundEffectMap.set(soundEffectId, soundEffect);
	}
	/*
	public function play(soundEffect:SoundEffect) {

		if(mute) return;
		if(playingSoundEffectMap.exists(soundEffect.id)) return;

		soundEffect.play();
		playingSoundEffectMap.set(soundEffect.id, soundEffect);
	}
	*/
}

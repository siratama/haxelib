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
	public function stop(soundEffectId:String) {

		var soundEffect = soundEffectMap.get(soundEffectId);
		soundEffect.stop();

		if(playingSoundEffectMap.exists(soundEffectId))
			playingSoundEffectMap.remove(soundEffectId);
	}
}

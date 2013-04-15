package com.dango_itimi.as3_and_createjs.sound;
class SoundEffectMap {

	public var mute:Bool;
	private var soundEffectMap:Hash<SoundEffect>;
	private var playingSoundEffectMap:Hash<SoundEffect>;

	public function new(){

		playingSoundEffectMap = new Hash();
		soundEffectMap = new Hash();
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
	public function play(soundEffect:SoundEffect) {

		if(mute) return;
		if(playingSoundEffectMap.exists(soundEffect.id)) return;

		soundEffect.play();
		playingSoundEffectMap.set(soundEffect.id, soundEffect);
	}
}

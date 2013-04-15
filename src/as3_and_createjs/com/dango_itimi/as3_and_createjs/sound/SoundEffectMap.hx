package com.dango_itimi.as3_and_createjs.sound;
class SoundEffectMap {

	public var mute:Bool;
	private var soundEffectSet:Array<SoundEffect>;
	private var playingSoundEffectMap:Hash;

	public function new(){

		playingSoundEffectMap = new Hash();
		soundEffectSet = [];
		mute = false;
	}
	public function run():void {

		for(key in playingSoundEffectMap.keys()) {

			var soundEffect:SoundEffect = playingSoundEffectMap.get(key);
			soundEffect.run();

			if(soundEffect.isFinished())
				playingSoundEffectMap.remove(key);
		}
	}
	public function play(soundEffect:SoundEffect) {

		if(mute) return;

		var key = Type.getClassName(soundEffect);
		if(playingSoundEffectMap.exists(key)) return;

		soundEffect.play();
		playingSoundEffectMap.set(key, soundEffect);
	}
}

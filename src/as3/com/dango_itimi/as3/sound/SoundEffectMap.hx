package com.dango_itimi.as3.sound;

import flash.media.Sound;
class SoundEffectMap extends com.dango_itimi.as3_and_createjs.sound.SoundEffectMap{

	public function new(){

		super();
	}
	public function register(cls:Class<Sound>, ?intervalFrame:Int = 5, ?volume:Int = 1.0):SoundEffect {

		var soundEffect:SoundEffect = new SoundEffect(cls, intervalFrame, volume);
		soundEffectSet.push(soundEffect);
		return soundEffect;
	}
}

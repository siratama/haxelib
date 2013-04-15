package com.dango_itimi.as3.sound;

import com.dango_itimi.as3_and_createjs.sound.SoundEffectMap;
import flash.media.Sound;
class SoundEffectMapForFlash extends SoundEffectMap{

	public function new(){

		super();
	}
	public function register(cls:Class<Sound>, ?intervalFrame:Int = 5, ?volume:Int = 1.0):SoundEffectForFlash {

		var soundEffect:SoundEffectForFlash = new SoundEffectForFlash(cls, intervalFrame, volume);
		soundEffectSet.push(soundEffect);
		return soundEffect;
	}
}

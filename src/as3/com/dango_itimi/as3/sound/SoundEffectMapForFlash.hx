package com.dango_itimi.as3.sound;

import com.dango_itimi.as3_and_createjs.sound.SoundEffectMap;
import flash.media.Sound;
class SoundEffectMapForFlash extends SoundEffectMap{

	public function new(){

		super();
	}
	public function register(cls:Class<Sound>, ?intervalFrame:Int = 5, ?volume:Float = 1.0, ?pan:Float = 0):SoundEffectForFlash {

		var id = Type.getClassName(cls);

		var soundEffect:SoundEffectForFlash = new SoundEffectForFlash(cls, id, intervalFrame, volume, pan);
		soundEffectMap.set(id, soundEffect);
		return soundEffect;
	}
}

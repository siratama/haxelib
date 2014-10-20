package com.dango_itimi.as3.sound;

import com.dango_itimi.utils.TypeUtil;
import Lambda;
import com.dango_itimi.as3_and_createjs.sound.SoundEffect;
import com.dango_itimi.as3_and_createjs.sound.SoundEffectMap;
import flash.media.Sound;
class SoundEffectMapForFlash extends SoundEffectMap{

	public function new(){

		super();
	}
	public function register(cls:Class<Sound>, ?intervalFrame:Int = 5, ?volume:Float = 1.0, ?pan:Float = 0, ?loop:Int):String {

		var id = Type.getClassName(cls);

		var soundEffect:SoundEffectForFlash = new SoundEffectForFlash(id, intervalFrame, volume, pan, loop);
		soundEffect.sound = TypeUtil.createInstance(cls, []);
		soundEffectMap.set(id, soundEffect);
		return id;
	}

	public function registerInstance(id:String, soundInstance:Sound, ?intervalFrame:Int = 5, ?volume:Float = 1.0, ?pan:Float = 0, ?loop:Int):String {

		var soundEffect:SoundEffectForFlash = new SoundEffectForFlash(id, intervalFrame, volume, pan, loop);
		soundEffect.sound = soundInstance;

		soundEffectMap.set(id, soundEffect);
		return id;
	}
}

package com.dango_itimi.as3.sound;

import com.dango_itimi.as3_and_createjs.sound.SoundEffect;
import com.dango_itimi.as3_and_createjs.sound.SoundEffectMap;
import flash.media.Sound;
class SoundEffectMapForFlash extends SoundEffectMap{

	public function new(){

		super();
	}
	override public function registerDynamic(soundClass:Dynamic, ?intervalFrame:Int = 5, ?volume:Float = 1.0, ?pan:Float = 0, ?interrupt:String = "", ?delay:Int = 0, ?offset:Int = 0, ?loop:Int = 0):String{

		return register(soundClass, intervalFrame, volume, pan);
	}
	public function register(cls:Class<Sound>, ?intervalFrame:Int = 5, ?volume:Float = 1.0, ?pan:Float = 0):String {

		var id = Type.getClassName(cls);

		var soundEffect:SoundEffectForFlash = new SoundEffectForFlash(cls, id, intervalFrame, volume, pan);
		soundEffectMap.set(id, soundEffect);
		return id;
	}
}

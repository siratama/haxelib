package com.dango_itimi.toolkit_for_createjs;

import createjs.soundjs.Sound;
import com.dango_itimi.utils.ClassUtil;
import com.dango_itimi.createjs.sound.SoundEffectMap;

class SoundPlayer {

	public static var soundEffectMap(default, null):SoundEffectMap;

	public static function initialize(){

		soundEffectMap = new SoundEffectMap();

		var className = Type.getClassName(SoundPlayer);
		js.Lib.eval("window.playSound = function(name, loop){ " + className + ".playForFrameSound(name, loop); }");
	}
	private static function playForFrameSound(soundId:String, ?loop:Int = 0){

		soundEffectMap.play(soundId, Sound.INTERRUPT_EARLY, 0, 0, loop);
	}
}

package com.dango_itimi.toolkit_for_createjs;

import createjs.soundjs.Sound;
import com.dango_itimi.utils.ClassUtil;
import com.dango_itimi.createjs.sound.SoundEffectMapForJS;

class SoundPlayer {

	public static var soundEffectMap(default, null):SoundEffectMapForJS;

	public static function initialize():SoundEffectMapForJS{

		soundEffectMap = new SoundEffectMapForJS();

		var className = Type.getClassName(SoundPlayer);
		js.Lib.eval("window.playSound = function(name, loop){ " + className + ".playForFrameSound(name, loop); }");

		return soundEffectMap;
	}
	private static function playForFrameSound(soundId:String, ?loop:Int = 0){

		soundEffectMap.playForFrameSound(soundId, loop);
	}
}

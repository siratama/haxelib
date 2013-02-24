package shooting.se;

import com.dango_itimi.toolkit_for_createjs.SoundPlayer;
import createjs.soundjs.Sound;
import com.dango_itimi.utils.ClassUtil;
import com.dango_itimi.createjs.sound.SoundEffectMap;
import js.Lib;

class SoundMixer {

	private static var SOUND_PACKAGE:String;

	public static function initialize(){

		SOUND_PACKAGE = ClassUtil.getPackageNamesWithClass(SoundMixer).join("");
	}
	private static function play(
		soundClassName:String, ?volume:Float = 1, ?delay:Int = 0, ?offset:Int = 0, ?loop:Int = 0){

		SoundPlayer.getSoundEffectMap().play(SOUND_PACKAGE + soundClassName, Sound.INTERRUPT_EARLY, delay, offset, loop, volume);
	}
	public static function playForBgm(){
		play("Bgm", 1, 0, 0, -1);
	}
}

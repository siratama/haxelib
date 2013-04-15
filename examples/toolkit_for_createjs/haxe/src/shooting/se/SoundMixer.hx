package shooting.se;

import com.dango_itimi.as3_and_createjs.sound.SoundEffect;
import com.dango_itimi.toolkit_for_createjs.SoundPlayer;
import createjs.soundjs.Sound;
import com.dango_itimi.utils.ClassUtil;
import com.dango_itimi.createjs.sound.SoundEffectMapForJS;
import js.Lib;

class SoundMixer {

	private static var SOUND_PACKAGE:String;
	private static var bgmSoundEffect:SoundEffect;

	public static function initialize(){

		SOUND_PACKAGE = ClassUtil.getPackageNamesWithClass(SoundMixer).join("");
		bgmSoundEffect = register("Bgm", 1, 0, 0, -1);
	}
	private static function register(
		soundClassName:String, ?volume:Float = 1, ?delay:Int = 0, ?offset:Int = 0, ?loop:Int = 0){

		return SoundPlayer.soundEffectMap.register(SOUND_PACKAGE + soundClassName, 0, Sound.INTERRUPT_EARLY, delay, offset, loop, volume);
	}
	public static function playForBgm(){
		SoundPlayer.soundEffectMap.play(bgmSoundEffect);
	}
}

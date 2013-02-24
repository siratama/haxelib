package com.dango_itimi.createjs.sound;

import createjs.soundjs.Sound;
import createjs.soundjs.SoundInstance;

class SoundEffectMap {

	private var map:Hash<SoundInstance>;
	
	public function new(){
		
		map = new Hash();
	}
	public function play(
		soundId:String, interrupt:String, ?delay:Int = 0, ?offset:Int = 0, ?loop:Int = 0, ?volume:Float = 1, ?pan:Float = 0){

		var soundInstance:SoundInstance = map.get(soundId);
		if(soundInstance == null){
			
			soundInstance = Sound.play(soundId, interrupt, delay, offset, loop);
			map.set(soundId, soundInstance);
		}
		else
			soundInstance.play();
			
		soundInstance.setVolume(volume);
		soundInstance.setPan(pan);
	}
}

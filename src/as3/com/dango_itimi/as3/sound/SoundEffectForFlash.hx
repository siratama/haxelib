package com.dango_itimi.as3.sound;

import com.dango_itimi.as3_and_createjs.sound.SoundEffect;
import flash.media.SoundTransform;
import flash.media.SoundChannel;
import flash.media.Sound;

class SoundEffectForFlash extends SoundEffect {

	public var sound(null, default):Sound;
	private var soundChannel:SoundChannel;

	public function new(id:String, intervalFrame:Int, volume:Float, pan:Float, loop:Int) {

		super(id, intervalFrame, volume, pan, loop);
	}
	public function setSound(sound:Sound){
		this.sound = sound;
	}
	override private function playChild() {

		soundChannel = sound.play(0, loop);
		soundChannel.soundTransform = new SoundTransform(volume, pan);
	}
	override public function stop(){

		soundChannel.stop();
		super.stop();
	}
}

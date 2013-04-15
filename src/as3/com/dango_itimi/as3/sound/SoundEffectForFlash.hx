package com.dango_itimi.as3.sound;

import com.dango_itimi.as3_and_createjs.sound.SoundEffect;
import flash.media.SoundTransform;
import flash.media.SoundChannel;
import flash.media.Sound;

class SoundEffectForFlash extends SoundEffect {

	private var sound:Sound;

	public function new(soundClass:Class<Sound>, id:String, intervalFrame:Int, volume:Float, pan:Float) {

		sound = Type.createInstance(soundClass, []);
		super(id, intervalFrame, volume, pan);
	}
	override private function playChild() {

		var soundChannel:SoundChannel = sound.play();
		soundChannel.soundTransform = new SoundTransform(volume, pan);
	}
}

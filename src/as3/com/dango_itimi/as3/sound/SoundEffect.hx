package com.dango_itimi.as3.sound;

import com.dango_itimi.as3_and_createjs.sound.SoundEffect;
import flash.media.SoundTransform;
import flash.media.SoundChannel;
import flash.media.Sound;

class SoundEffect extends com.dango_itimi.as3_and_createjs.sound.SoundEffect {

	private var sound:Sound;

	public function new(soundClass:Class<Sound>, intervalFrame:Int, volume:Int) {

		sound = Type.createInstance(soundClass, []);
		super(intervalFrame, volume);
	}
	override private function playChild() {

		var soundChannel:SoundChannel = sound.play();
		soundChannel.soundTransform = new SoundTransform(volume);
	}
}

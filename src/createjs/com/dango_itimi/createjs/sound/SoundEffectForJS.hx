package com.dango_itimi.createjs.sound;
import createjs.soundjs.SoundInstance;
import createjs.soundjs.Sound;
import com.dango_itimi.as3_and_createjs.sound.SoundEffect;

class SoundEffectForJS extends SoundEffect{

	private var soundInstance:SoundInstance;
	private var interrupt:String;
	private var delay:Int;
	private var offset:Int;
	private var loop:Int;

	public function new(
		id:String, intervalFrame:Int, interrupt:String, delay:Int, offset:Int, loop:Int, volume:Float, pan:Float){

		this.interrupt = interrupt;
		this.delay = delay;
		this.offset = offset;
		this.loop = loop;

		super(id, intervalFrame, volume, pan);
	}
	override private function playChild() {

		if(soundInstance == null)
			soundInstance = Sound.play(id, interrupt, delay, offset, loop);
		else
			soundInstance.play();

		soundInstance.setVolume(volume);
		soundInstance.setPan(pan);
	}

	override public function stop(){
		if(soundInstance != null)
			soundInstance.stop();
	}
}

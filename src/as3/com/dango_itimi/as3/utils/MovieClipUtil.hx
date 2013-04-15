package com.dango_itimi.as3.utils;

import flash.display.MovieClip;

class MovieClipUtil extends com.dango_itimi.as3_and_createjs.utils.MovieClipUtil{

	public function new(mc:MovieClip){
		super(mc);
	}
	override public function gotoFirstFrame(){
		mc.gotoAndStop(1);
	}
	override public function nextFrame(){
		mc.nextFrame();
	}
	override public function prevFrame(){
		mc.prevFrame();
	}
	override public function loopFrame(){

		if(mc.currentFrame < mc.totalFrames)
			nextFrame();
		else
			gotoFirstFrame();
	}
}

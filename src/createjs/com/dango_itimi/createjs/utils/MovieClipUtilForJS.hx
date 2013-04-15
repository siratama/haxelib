package com.dango_itimi.createjs.utils;

import com.dango_itimi.as3_and_createjs.utils.MovieClipUtil;
import createjs.tweenjs.Timeline;
import createjs.easeljs.MovieClip;
class MovieClipUtilForJS extends MovieClipUtil{

	public var totalFrames(default, null):Int;
	public var timeline(default, null):Timeline;

	public function new(mc:MovieClip){

		super(mc);
		timeline = mc.timeline;
		totalFrames = timeline.duration - 1;
	}
	override public function gotoFirstFrame(){
		mc.gotoAndStop(0);
	}
	override public function nextFrame(){
		mc.gotoAndStop(timeline.position + 1);
	}
	override public function prevFrame(){
		mc.gotoAndStop(timeline.position - 1);
	}
	override public function loopFrame(){

		if(timeline.position < totalFrames)
			nextFrame();
		else
			gotoFirstFrame();
	}
}

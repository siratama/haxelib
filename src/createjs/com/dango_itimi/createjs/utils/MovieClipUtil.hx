package com.dango_itimi.createjs.utils;

import com.dango_itimi.as3_and_createjs.utils.IMovieClipUtil;
import createjs.tweenjs.Timeline;
import createjs.easeljs.MovieClip;

class MovieClipUtil implements IMovieClipUtil{

	public var mc(default, null):MovieClip;
	public var totalFrames(default, null):Int;
	public var timeline(default, null):Timeline;

	public function new(mc:MovieClip){

		this.mc = mc;
		timeline = mc.timeline;
		totalFrames = timeline.duration - 1;
	}
	public function gotoFirstFrame(){
		mc.gotoAndStop(0);
	}
	public function nextFrame(){
		mc.gotoAndStop(timeline.position + 1);
	}
	public function prevFrame(){
		mc.gotoAndStop(timeline.position - 1);
	}
	public function loopFrame(){

		if(timeline.position < totalFrames)
			nextFrame();
		else
			gotoFirstFrame();
	}
	public function getCurrentFrameBaseCreateJS():Int{
		return timeline.position;
	}
}

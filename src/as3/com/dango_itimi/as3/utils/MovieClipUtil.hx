package com.dango_itimi.as3.utils;

import com.dango_itimi.as3_and_createjs.utils.IMovieClipUtil;
import flash.display.MovieClip;

class MovieClipUtil implements IMovieClipUtil{

	public var mc(default, null):MovieClip;

	public function new(mc:MovieClip){
		this.mc = mc;
	}
	public function gotoFirstFrame(){
		mc.gotoAndStop(1);
	}
	public function gotoLastFrame(){
		mc.gotoAndStop(mc.totalFrames);
	}
	public function gotoAndStop(frame:Int){
		mc.gotoAndStop(frame);
	}
	public function nextFrame(){
		mc.nextFrame();
	}
	public function prevFrame(){
		mc.prevFrame();
	}
	public function loopFrame(){

		if(mc.currentFrame < mc.totalFrames)
			nextFrame();
		else
			gotoFirstFrame();
	}
	public function getCurrentFrame():Int{
		return mc.currentFrame;
	}
	public function getCurrentFrameBaseCreateJS():Int{
		return cast mc.currentFrame - 1;
	}
	public function getTotalFrames():Int{
		return mc.totalFrames;
	}
	public function isCurrentLabel(label:String):Bool{
		return #if flash mc.currentLabel == label #else false #end;
	}
	public function isLastFrame():Bool{
		return mc.currentFrame == mc.totalFrames;
	}
}

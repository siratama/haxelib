package com.dango_itimi.as3_and_createjs.utils;

#if js
import createjs.easeljs.MovieClip;

#elseif flash
import flash.display.MovieClip;

#end

class MovieClipUtil {

	public var mc(default, null):MovieClip;
	public function new(mc:MovieClip){

		this.mc = mc;
	}
	public function gotoFirstFrame(){
	}
	public function nextFrame(){
	}
	public function prevFrame(){
	}
	public function loopFrame(){
	}
}

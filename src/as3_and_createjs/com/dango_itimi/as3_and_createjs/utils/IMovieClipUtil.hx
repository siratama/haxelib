package com.dango_itimi.as3_and_createjs.utils;

#if js
import createjs.easeljs.MovieClip;

#elseif flash
import flash.display.MovieClip;

#end

interface IMovieClipUtil {

	public var mc(default, null):MovieClip;

	public function gotoFirstFrame():Void;
	public function nextFrame():Void;
	public function prevFrame():Void;
	public function loopFrame():Void;
	public function getCurrentFrameBaseCreateJS():Int;
}

package com.dango_itimi.as3_and_createjs.utils;

#if js
import createjs.easeljs.MovieClip;

#else
import flash.display.MovieClip;

#end

interface IMovieClipUtil {

	public var mc(default, null):MovieClip;

	public function gotoFirstFrame():Void;
	public function gotoLastFrame():Void;
	public function gotoAndStop(frame:Int):Void;
	public function nextFrame():Void;
	public function prevFrame():Void;
	public function loopFrame():Void;
	public function getCurrentFrame():Int;
	public function getCurrentFrameBaseCreateJS():Int;
	public function getTotalFrames():Int;
	public function isCurrentLabel(label:String):Bool;
	public function isLastFrame():Bool;
	public function setPosition(position:MovieClip):Void;
}

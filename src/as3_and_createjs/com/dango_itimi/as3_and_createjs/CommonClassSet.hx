package com.dango_itimi.as3_and_createjs;

#if js
import createjs.easeljs.DisplayObject;
import createjs.easeljs.Container;
import createjs.easeljs.MovieClip;

#else
import flash.display.DisplayObject;
import flash.display.DisplayObjectContainer;
import flash.display.MovieClip;

#end

import com.dango_itimi.as3_and_createjs.utils.IContainerUtil;
import com.dango_itimi.as3_and_createjs.display.IDisplayObjectContainer;
import com.dango_itimi.as3_and_createjs.utils.IMovieClipUtil;
import com.dango_itimi.as3_and_createjs.event.MouseEventChecker;

class CommonClassSet {

	public static var mouseEventCheckerClass:Class<MouseEventChecker>;
	public static var movieClipUtilClass:Class<IMovieClipUtil>;
	public static var containerUtilClass:Class<IContainerUtil>;
	public static var defaultLayerClass:Class<IDisplayObjectContainer>;

	public static function createLayer():IDisplayObjectContainer{
		return Type.createInstance(defaultLayerClass, []);
	}
	public static function createContainerUtil(container:#if js Container #else DisplayObjectContainer #end):IContainerUtil{
		return Type.createInstance(containerUtilClass, [container]);
	}
	public static function createMovieClipUtil(mc:MovieClip):IMovieClipUtil{
		return Type.createInstance(movieClipUtilClass, [mc]);
	}
	public static function createMouseEventChecker(displayObject:DisplayObject){
		return Type.createInstance(mouseEventCheckerClass, [displayObject]);
	}
}

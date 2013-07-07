package com.dango_itimi.as3_and_createjs.utils;

#if js
import createjs.easeljs.DisplayObject;

#else
import flash.display.DisplayObject;

#end

import com.dango_itimi.as3_and_createjs.display.IDisplayObjectContainer;
interface IContainerUtil {
	public function addChild(child:IDisplayObjectContainer):DisplayObject;
}

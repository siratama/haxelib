package com.dango_itimi.as3_and_createjs.display;

#if js
import createjs.easeljs.DisplayObject;

#elseif flash
import flash.display.DisplayObject;

#end

interface IDisplayObjectContainer {

	public function addChild(child:DisplayObject):DisplayObject;
	public function removeChild(child:DisplayObject):#if js Bool #elseif flash DisplayObject #end;
}

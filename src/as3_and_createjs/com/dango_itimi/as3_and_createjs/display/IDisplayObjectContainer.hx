package com.dango_itimi.as3_and_createjs.display;

#if js
import createjs.easeljs.DisplayObject;

#else
import flash.display.DisplayObject;

#end

interface IDisplayObjectContainer extends IDisplayObject{

	public function addChild(child:DisplayObject):DisplayObject;
	public function removeChild(child:DisplayObject):#if js Bool #else DisplayObject #end;
	public function contains(child:DisplayObject):Bool;
}

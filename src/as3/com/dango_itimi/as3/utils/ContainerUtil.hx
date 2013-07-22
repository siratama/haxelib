package com.dango_itimi.as3.utils;
import com.dango_itimi.as3_and_createjs.display.IDisplayObjectContainer;
import flash.display.DisplayObject;
import flash.display.DisplayObjectContainer;
import com.dango_itimi.as3_and_createjs.utils.IContainerUtil;
class ContainerUtil implements IContainerUtil{

	private var displayObjectContainer:DisplayObjectContainer;

	public function new(displayObjectContainer:DisplayObjectContainer){
		this.displayObjectContainer = displayObjectContainer;
	}
	public function addChild(child:IDisplayObjectContainer):DisplayObject{
		return displayObjectContainer.addChild(cast child);
	}
	public function removeChild(child:IDisplayObjectContainer):DisplayObject{
		return displayObjectContainer.removeChild(cast child);
	}
}

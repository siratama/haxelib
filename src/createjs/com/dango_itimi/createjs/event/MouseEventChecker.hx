package com.dango_itimi.createjs.event;

import createjs.easeljs.DisplayObject;
import com.dango_itimi.as3_and_createjs.event.MouseEventChecker;
import createjs.easeljs.MouseEvent;

class MouseEventChecker extends com.dango_itimi.as3_and_createjs.event.MouseEventChecker{

	private var displayObject:DisplayObject;

	public function new(displayObject:DisplayObject){

		this.displayObject = displayObject;
		super();
	}
	override public function addEventListener(){
		displayObject.addEventListener("click", onClick);
		displayObject.addEventListener("mousedown", onMouseDown);
	}
	override public function removeEventListener(){
		displayObject.removeEventListener("click", onClick);
		displayObject.removeEventListener("mousedown", onMouseDown);
	}
	override private function onMouseDown(event:MouseEvent){
		super.onMouseDown(event);
		event.addEventListener("mouseup", onMouseUp);
		event.addEventListener("mousemove", onMouseMove);
	}
	override private function onMouseUp(event:MouseEvent){
		super.onMouseUp(event);
		downedEvent.addEventListener("mouseup", onMouseUp);
		downedEvent.addEventListener("mousemove", onMouseMove);
	}
}

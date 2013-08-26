package com.dango_itimi.createjs.event;

import com.dango_itimi.as3_and_createjs.event.MouseEventChecker;
import createjs.easeljs.DisplayObject;
import createjs.easeljs.MouseEvent;

class MouseEventCheckerForJS extends MouseEventChecker{

	private var displayObject:DisplayObject;
	public var touchEventMap(default, null):Map<Int, Touch>;

	public function new(displayObject:DisplayObject){

		this.displayObject = displayObject;
		touchEventMap = new Map();
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

		if(event.nativeEvent.type == "touchstart"){
			touchEventMap[event.pointerID] = Touch.DOWN(event);
		}
		super.onMouseDown(event);

		event.addEventListener("mouseup", onMouseUp);
		event.addEventListener("mousemove", onMouseMove);
	}
	override private function onMouseMove(event:MouseEvent){

		if(event.nativeEvent.type == "touchmove"){
			touchEventMap[event.pointerID] = Touch.MOVE(event);
		}
		super.onMouseMove(event);
	}
	override private function onMouseUp(event:MouseEvent){

		if(event.nativeEvent.type == "touchend" || event.nativeEvent.type == "touchcancel"){

			var touchEvent = switch(touchEventMap[event.pointerID]){
				case Touch.DOWN(touchEvent): touchEvent;
				case Touch.MOVE(touchEvent): touchEvent;
				case Touch.UP(touchEvent): null;
			}
			touchEvent.removeEventListener("mouseup", onMouseUp);
			touchEvent.removeEventListener("mousemove", onMouseMove);

			touchEventMap[event.pointerID] = Touch.UP(event);
		}
		else{
			downedEvent.removeEventListener("mouseup", onMouseUp);
			downedEvent.removeEventListener("mousemove", onMouseMove);
		}
		super.onMouseUp(event);
	}
	override public function reset(){

		super.reset();

		for(key in touchEventMap.keys()){

			switch(touchEventMap[key]){
				case Touch.DOWN(touchEvent): continue;
				case Touch.MOVE(touchEvent): touchEventMap[key] = Touch.DOWN(touchEvent);
				case Touch.UP(touchEvent): touchEventMap.remove(key);
			}
		}
	}
}

enum Touch{
	DOWN(touchEvent:MouseEvent);
	MOVE(touchEvent:MouseEvent);
	UP(touchEvent:MouseEvent);
}

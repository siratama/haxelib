package com.dango_itimi.createjs.event;

import com.dango_itimi.as3_and_createjs.event.MouseEventChecker;
import createjs.easeljs.DisplayObject;
import createjs.easeljs.MouseEvent;

class MouseEventCheckerForJS extends MouseEventChecker{

	private var displayObject:DisplayObject;
	public var startedTouchEvent(default, null):MouseEvent;
	public var startedTouch(default, null):Bool;
	public var endedTouchEvent(default, null):MouseEvent;
	public var endedTouch(default, null):Bool;
	public var movedTouchEvent(default, null):MouseEvent;
	public var movedTouch(default, null):Bool;

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

		if(event.nativeEvent.type == "touchstart"){
			startedTouchEvent = event;
			startedTouch = true;
		}
		super.onMouseDown(event);

		event.addEventListener("mouseup", onMouseUp);
		event.addEventListener("mousemove", onMouseMove);
	}
	override private function onMouseMove(event:MouseEvent){

		if(event.nativeEvent.type == "touchmove"){
			movedTouchEvent = event;
			movedTouch = true;
		}
		super.onMouseMove(event);
	}
	override private function onMouseUp(event:MouseEvent){

		if(event.nativeEvent.type == "touchend"){
			endedTouchEvent = event;
			endedTouch = true;
			startedTouchEvent.removeEventListener("mouseup", onMouseUp);
			startedTouchEvent.removeEventListener("mousemove", onMouseMove);
		}
		else{
			downedEvent.removeEventListener("mouseup", onMouseUp);
			downedEvent.removeEventListener("mousemove", onMouseMove);
		}
		super.onMouseUp(event);
	}
	override public function reset(){

		super.reset();
		movedTouch = false;
		startedTouch = false;
		endedTouch = false;
	}

	/*
	public function removeStartedTouch():Bool{
		var n = startedTouch;
		startedTouch = false;
		return n;
	}
	public function removeMovedTouch():Bool{
		var n = movedTouch;
		movedTouch = false;
		return n;
	}
	public function removeEndedTouch():Bool{
		var n = endedTouch;
		endedTouch = false;
		return n;
	}
	*/
}

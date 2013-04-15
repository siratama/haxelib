package com.dango_itimi.as3.event;
import com.dango_itimi.as3_and_createjs.event.MouseEventChecker;
import flash.events.MouseEvent;
import flash.display.DisplayObject;

class MouseEventChecker extends com.dango_itimi.as3_and_createjs.event.MouseEventChecker{

	private var displayObject:DisplayObject;

	public function new(displayObject:DisplayObject){

		this.displayObject = displayObject;
		super();
	}
	override public function addEventListener(){
		displayObject.addEventListener(MouseEvent.CLICK, onClick);
		displayObject.addEventListener(MouseEvent.MOUSE_DOWN, onMouseDown);
		displayObject.addEventListener(MouseEvent.MOUSE_UP, onMouseUp);
		displayObject.addEventListener(MouseEvent.MOUSE_MOVE, onMouseMove);
	}
	override public function removeEventListener(){
		displayObject.removeEventListener(MouseEvent.CLICK, onClick);
		displayObject.removeEventListener(MouseEvent.MOUSE_DOWN, onMouseDown);
		displayObject.removeEventListener(MouseEvent.MOUSE_UP, onMouseUp);
		displayObject.removeEventListener(MouseEvent.MOUSE_MOVE, onMouseMove);
	}
}

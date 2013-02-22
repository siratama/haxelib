package com.dango_itimi.createjs.event;

import createjs.easeljs.DisplayObject;
import createjs.easeljs.MouseEvent;

class MouseEventChecker {

	private var container:DisplayObject;

	private var clickedEvent:MouseEvent;
	private var pressedEvent:MouseEvent;
	private var uppedEvent:MouseEvent;
	private var movedEvent:MouseEvent;

	private var clicked:Bool;
	private var pressed:Bool;
	private var upped:Bool;
	private var moved:Bool;

	public function new(container:DisplayObject){

		this.container = container;
		container.addEventListener("click", onClick);
		container.addEventListener("mousedown", onPress);
	}
	public function removeEventListener(){

		container.removeEventListener("click", onClick);
		container.removeEventListener("mousedown", onPress);
	}
	private function onClick(event:MouseEvent){

		clickedEvent = event;
		clicked = true;
	}
	private function onPress(event:MouseEvent){

		pressedEvent = event;
		pressed = true;

		event.addEventListener("mouseup", onMouseUp);
		event.addEventListener("mousemove", onMouseMove);
	}
	private function onMouseUp(event:MouseEvent){

		uppedEvent = event;
		upped = true;

		pressedEvent.addEventListener("mouseup", onMouseUp);
		pressedEvent.addEventListener("mousemove", onMouseMove);
	}
	private function onMouseMove(event:MouseEvent){

		movedEvent = event;
		moved = true;
	}
	public function reset(){

		clicked = false;
		pressed = false;
		upped = false;
		moved = false;
	}

	public function isClicked():Bool{
		return clicked;
	}
	public function isPressed():Bool{
		return pressed;
	}
	public function isUpped():Bool{
		return upped;
	}
	public function isMoved():Bool{
		return moved;
	}
	public function getClickedEvent():MouseEvent{
		return clickedEvent;
	}
	public function getPressedEvent():MouseEvent{
		return pressedEvent;
	}
	public function getUppedEvent():MouseEvent{
		return uppedEvent;
	}
	public function getMovedEvent():MouseEvent{
		return movedEvent;
	}
}

package com.dango_itimi.as3_and_createjs.event;

import com.dango_itimi.utils.PointUtil;

#if js
import createjs.easeljs.MouseEvent;

#elseif flash
import flash.events.MouseEvent;

#end

class MouseEventChecker {

	private var clickedEvent:MouseEvent;
	private var downedEvent:MouseEvent;
	private var uppedEvent:MouseEvent;
	private var movedEvent:MouseEvent;

	private var clicked:Bool;
	private var downed:Bool;
	private var upped:Bool;
	private var moved:Bool;

	public function new(){
		addEventListener();
	}
	public function addEventListener(){
	}
	public function removeEventListener(){
	}
	private function onClick(event:MouseEvent){
		clickedEvent = event;
		clicked = true;
	}
	private function onMouseDown(event:MouseEvent){
		downedEvent = event;
		downed = true;
	}
	private function onMouseUp(event:MouseEvent){
		uppedEvent = event;
		upped = true;
	}
	private function onMouseMove(event:MouseEvent){
		movedEvent = event;
		moved = true;
	}
	public function reset(){

		clicked = false;
		downed = false;
		upped = false;
		moved = false;
	}
	public function isClicked():Bool{
		return clicked;
	}
	public function isDowned():Bool{
		return downed;
	}
	public function isUpped():Bool{
		return upped;
	}
	public function isMoved():Bool{
		return moved;
	}

	public function getClickedStagePoint():Point {
		return {x:clickedEvent.stageX, y:clickedEvent.stageY};
	}
	public function getDownedStagePoint():Point {
		return {x:downedEvent.stageX, y:downedEvent.stageY};
	}
	public function getUppedStagePoint():Point {
		return {x:uppedEvent.stageX, y:uppedEvent.stageY};
	}
	public function getMovedStagePoint():Point {
		return {x:movedEvent.stageX, y:movedEvent.stageY};
	}

	public function getClickedEvent():MouseEvent{
		return clickedEvent;
	}
	public function getDownedEvent():MouseEvent{
		return downedEvent;
	}
	public function getUppedEvent():MouseEvent{
		return uppedEvent;
	}
	public function getMovedEvent():MouseEvent{
		return movedEvent;
	}
}

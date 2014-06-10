package com.dango_itimi.as3_and_createjs.event;

import com.dango_itimi.utils.PointUtil;

#if js
import createjs.easeljs.MouseEvent;

#else
import flash.events.MouseEvent;

#end

class MouseEventChecker {

	public var clickedEvent(default, null):MouseEvent;
	public var downedEvent(default, null):MouseEvent;
	public var uppedEvent(default, null):MouseEvent;
	public var movedEvent(default, null):MouseEvent;
	public var rollOutedEvent(default, null):MouseEvent;

	public var clicked(default, null):Bool;
	public var downed(default, null):Bool;
	public var upped(default, null):Bool;
	public var moved(default, null):Bool;
	public var rollOuted(default, null):Bool;

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
	private function onRollOut(event:MouseEvent){
		rollOutedEvent = event;
		rollOuted = true;
	}
	public function reset(){

		clicked = false;
		downed = false;
		upped = false;
		moved = false;
		rollOuted = false;
	}

	public function getClickedStagePoint():Point {
		return PointUtil.create(clickedEvent.stageX, clickedEvent.stageY);
	}
	public function getDownedStagePoint():Point {
		return PointUtil.create(downedEvent.stageX, downedEvent.stageY);
	}
	public function getUppedStagePoint():Point {
		return PointUtil.create(uppedEvent.stageX, uppedEvent.stageY);
	}
	public function getMovedStagePoint():Point {
		return PointUtil.create(movedEvent.stageX, movedEvent.stageY);
	}
	public function getRollOutedStagePoint():Point {
		return PointUtil.create(rollOutedEvent.stageX, rollOutedEvent.stageY);
	}

	public function getClickedLocalPoint():Point {
		return PointUtil.create(clickedEvent.localX, clickedEvent.localY);
	}
	public function getDownedLocalPoint():Point {
		return PointUtil.create(downedEvent.localX, downedEvent.localY);
	}
	public function getUppedLocalPoint():Point {
		return PointUtil.create(uppedEvent.localX, uppedEvent.localY);
	}
	public function getMovedLocalPoint():Point {
		return PointUtil.create(movedEvent.localX, movedEvent.localY);
	}
	public function getRollOutedLocalPoint():Point {
		return PointUtil.create(rollOutedEvent.localX, rollOutedEvent.localY);
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
	public function isRollOuted():Bool{
		return rollOuted;
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
	public function getRollOutedEvent():MouseEvent{
		return rollOutedEvent;
	}

	public function destroy(){
	}
}

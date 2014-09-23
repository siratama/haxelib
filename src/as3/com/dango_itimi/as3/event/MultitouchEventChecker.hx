package com.dango_itimi.as3.event;

import flash.events.TouchEvent;
import flash.display.DisplayObject;

class MultitouchEventChecker {

	private var displayObject:DisplayObject;
	public var touchMap(default, null):Map<Int, Touch>;

	public var tapped(default, null):Bool;

	public function new(displayObject:DisplayObject){

		this.displayObject = displayObject;
		touchMap = new Map();
		addEventListener();
	}
	public function addEventListener(){

		displayObject.addEventListener(TouchEvent.TOUCH_TAP, onTouchTap);
		displayObject.addEventListener(TouchEvent.TOUCH_BEGIN, onTouchBegin);
		displayObject.addEventListener(TouchEvent.TOUCH_MOVE, onTouchMove);
		displayObject.addEventListener(TouchEvent.TOUCH_END, onTouchEnd);
	}
	public function removeEventListener(){

		displayObject.removeEventListener(TouchEvent.TOUCH_TAP, onTouchTap);
		displayObject.removeEventListener(TouchEvent.TOUCH_BEGIN, onTouchBegin);
		displayObject.removeEventListener(TouchEvent.TOUCH_MOVE, onTouchMove);
		displayObject.removeEventListener(TouchEvent.TOUCH_END, onTouchEnd);
	}
	private function onTouchTap(event:TouchEvent){
		tapped = true;
	}
	private function onTouchBegin(event:TouchEvent){
//trace("begin", event.touchPointID);
		touchMap[event.touchPointID] = Touch.DOWN(event);
	}
	private function onTouchMove(event:TouchEvent){
//trace("move", event.touchPointID);
		touchMap[event.touchPointID] = Touch.MOVE(event);
	}
	private function onTouchEnd(event:TouchEvent){
//trace("end", event.touchPointID);
		touchMap[event.touchPointID] = Touch.UP(event);
	}
	public function reset(){

		tapped = false;

		for(key in touchMap.keys()){

			if(touchMap[key] == null) continue;

			switch(touchMap[key]){
				case Touch.DOWN(touchEvent): continue;
				case Touch.MOVE(touchEvent): touchMap[key] = Touch.DOWN(touchEvent);
				case Touch.UP(touchEvent): touchMap.remove(key);
			}
		}
	}
	public function destroy(){

		touchMap = new Map();
	}
}


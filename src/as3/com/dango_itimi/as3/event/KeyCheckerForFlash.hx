package com.dango_itimi.as3.event;

import flash.events.KeyboardEvent;
import flash.display.DisplayObject;
import com.dango_itimi.event.KeyChecker;

class KeyCheckerForFlash extends KeyChecker{

	public function new(stage:DisplayObject){

		stage.addEventListener(KeyboardEvent.KEY_DOWN, onKeyDown);
		stage.addEventListener(KeyboardEvent.KEY_UP, onKeyUp);

		super();
	}
	private function onKeyDown(event:KeyboardEvent){
		down(event.keyCode);
	}
	private function onKeyUp(event:KeyboardEvent){
		up(event.keyCode);
	}
}

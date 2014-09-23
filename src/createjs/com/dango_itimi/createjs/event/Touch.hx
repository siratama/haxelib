package com.dango_itimi.createjs.event;

#if js
import createjs.easeljs.MouseEvent;
#else
import flash.events.MouseEvent;
#end

enum Touch{
	DOWN(touchEvent:MouseEvent);
	MOVE(touchEvent:MouseEvent);
	UP(touchEvent:MouseEvent);
}

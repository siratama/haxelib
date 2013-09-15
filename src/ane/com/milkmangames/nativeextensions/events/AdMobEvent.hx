package com.milkmangames.nativeextensions.events;
import flash.events.Event;
import flash.geom.Rectangle;
extern class AdMobEvent extends Event{

	public static inline var RECEIVED_AD:String = "RECEIVED_AD";
	public static inline var SCREEN_PRESENTED:String = "SCREEN_PRESENTED";
	public static inline var SCREEN_DISMISSED:String = "SCREEN_DISMISSED";
	public static inline var LEAVE_APPLICATION:String = "LEAVE_APPLICATION";

	function new(type:String, dimensions:Rectangle = null, bubbles:Bool = false, cancelable:Bool = false);
	public var dimensions(default, null):Rectangle;
}

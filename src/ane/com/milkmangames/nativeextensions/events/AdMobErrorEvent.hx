package com.milkmangames.nativeextensions.events;
import flash.events.ErrorEvent;
extern class AdMobErrorEvent extends ErrorEvent{

	public static inline var FAILED_TO_RECEIVE_AD:String = "FAILED_TO_RECEIVE_AD";
	function AdMobErrorEvent(type:String, bubbles:Bool = false, cancelable:Bool = false, text:String = "", id:Int = 0):Void;
}

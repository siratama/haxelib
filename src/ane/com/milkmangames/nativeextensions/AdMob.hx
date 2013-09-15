package com.milkmangames.nativeextensions;
import flash.Vector;
import flash.events.Event;
extern class AdMob {

	public static var VERSION:String;
	public static var isSupported(default, null):Bool;

	public static function addEventListener(type:String, listener:Event->Void, useCapture:Bool = false, priority:Int = 0, useWeakReference:Bool = false):Void;
	public static function destroyAd():Void;
	public static function getTestDeviceIDs():Vector<String>;
	public static function init(publisherId:String, secondPublisherId:String = null):Void;
	public static function refreshAd():Void;
	public static function removeEventListener(type:String, listener:Event->Void, useCapture:Bool = false):Void;
	public static function setVisibility(visible:Bool):Void;
	public static function showAd(type:String, horizontalAlign:String, verticalAlign:String, testDevices:Vector<String> = null, offsetX:Int = 0, offsetY:Int = 0):Void;
}

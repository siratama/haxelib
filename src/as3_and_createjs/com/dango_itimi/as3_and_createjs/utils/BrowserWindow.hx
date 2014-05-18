package com.dango_itimi.as3_and_createjs.utils;

#if js
import js.Browser;
#else
import flash.Lib;
import flash.net.URLRequest;
#end

class BrowserWindow {
	public static inline function open(uri:String){

		#if js
		js.Browser.window.open(uri, null);
		#else
		Lib.getURL(new URLRequest(uri), "_blank");
		#end

	}
}
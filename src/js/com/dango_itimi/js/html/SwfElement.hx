package com.dango_itimi.js.html;
class SwfElement {
	public static function get(swfObjectId:String):Dynamic{

		var element:Dynamic =
			(Browser.navigator.appName.indexOf("Microsoft") != -1) ?
				untyped window[swfObjectId] : untyped document[swfObjectId];

		return (element.constructor == HTMLCollection) ? element[0] : element;
	}
}

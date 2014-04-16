package com.dango_itimi.as3_and_createjs.utils;

import com.dango_itimi.utils.RectangleUtil;

#if js
import createjs.easeljs.DisplayObject;
#else
import flash.display.DisplayObject;
#end

class RectangleUtil {

	public static function convert(displayObject:DisplayObject):com.dango_itimi.utils.RectangleUtil{

		//getBounds is for openfl
		var rectangle = com.dango_itimi.utils.RectangleUtil.convert(
			#if js untyped displayObject.nominalBounds #else displayObject.getBounds(displayObject.parent) #end
		);
		#if js
		rectangle.setPosition(displayObject.x, displayObject.y); //for CreateJS
		#end
		return rectangle;
	}
}
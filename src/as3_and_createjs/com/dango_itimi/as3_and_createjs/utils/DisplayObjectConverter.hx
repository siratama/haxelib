package com.dango_itimi.as3_and_createjs.utils;

import com.dango_itimi.utils.RectangleUtil;

#if js
import createjs.easeljs.DisplayObject;
#else
import flash.display.DisplayObject;
#end

class DisplayObjectConverter {

	public static function toRectangleUtil(displayObject:DisplayObject):RectangleUtil{

		var rectangle = RectangleUtil.convert(
			#if js
				untyped displayObject.nominalBounds
			#elseif flash
				displayObject
			#else
				displayObject.getBounds(displayObject)
			#end
		);
		#if !flash
		rectangle.setPosition(displayObject.x, displayObject.y);
		#end
		return rectangle;
	}
}
package com.dango_itimi.toolkit_for_createjs.utils;

import createjs.easeljs.Rectangle;
import com.dango_itimi.utils.RectangleUtil;

class ContainerUtil {

	public static function getNominalBounds(container:Dynamic):RectangleUtil{
		
		var rect:Rectangle = container.nominalBounds;
		return RectangleUtil.convert(rect);
	}
}

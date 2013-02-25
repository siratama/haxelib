package com.dango_itimi.toolkit_for_createjs.utils;

import createjs.easeljs.Rectangle;
import com.dango_itimi.utils.RectangleUtil;

class ContainerUtil {

	public static function getNominalBounds(container:Dynamic):RectangleUtil{
		
		var rect:Rectangle = container.nominalBounds;
		return RectangleUtil.convert(rect);
	}
	public static function getProperty(container:Dynamic, propertyStr:String):Dynamic{

		var property = Reflect.field(container, propertyStr);
		if(property != null)
			return property;

		var fields = Reflect.fields(container);
		for(prop in fields){

			if(prop.indexOf(propertyStr) == -1) continue;

			var arr = prop.split("_");
			var checkedStr = arr[arr.length - 1];

			if(!Math.isNaN(cast checkedStr))
				return Reflect.field(container, prop);
		}
		return null;
	}
}

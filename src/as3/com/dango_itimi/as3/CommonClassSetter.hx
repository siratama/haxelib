package com.dango_itimi.as3;

import com.dango_itimi.as3.utils.ContainerUtil;
import com.dango_itimi.as3_and_createjs.CommonClassSet;
import com.dango_itimi.as3.utils.MovieClipUtil;
import com.dango_itimi.as3.event.MouseEventCheckerForFlash;
import com.dango_itimi.as3_and_createjs.display.as3.Sprite;

class CommonClassSetter {

	public static function initialize(){

		CommonClassSet.mouseEventCheckerClass = MouseEventCheckerForFlash;
		CommonClassSet.movieClipUtilClass = MovieClipUtil;
		CommonClassSet.containerUtilClass = ContainerUtil;
		CommonClassSet.defaultLayerClass = Sprite;
	}
}

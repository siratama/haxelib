package com.dango_itimi.createjs;
import com.dango_itimi.createjs.utils.ContainerUtil;
import com.dango_itimi.as3_and_createjs.display.createjs.Container;
import com.dango_itimi.as3_and_createjs.CommonClassSet;
import com.dango_itimi.createjs.utils.MovieClipUtil;
import com.dango_itimi.createjs.event.MouseEventCheckerForJS;
class CommonClassSetter {
	public static function initialize(){

		CommonClassSet.mouseEventCheckerClass = MouseEventCheckerForJS;
		CommonClassSet.movieClipUtilClass = MovieClipUtil;
		CommonClassSet.containerUtilClass = ContainerUtil;
		CommonClassSet.defaultLayerClass = Container;
	}
}

package com.dango_itimi.as3_and_createjs.layout;

#if js
import createjs.easeljs.MovieClip;

#else
import flash.display.MovieClip;

#end

import com.dango_itimi.as3_and_createjs.utils.IMovieClipUtil;
import com.dango_itimi.as3_and_createjs.display.IDisplayObjectContainer;
class NumericLine {

	private var movieClipUtilClass:Class<IMovieClipUtil>;
	private var layer:IDisplayObjectContainer;
	private var intervalPixel:Int;
	private var baseClass:Class<MovieClip>;
	private var graphicsSet:Array<MovieClip>;
	private var positionX:Float;
	private var positionY:Float;
	private var baseWidth:Int;

	public function new(
		movieClipUtilClass:Class<IMovieClipUtil>,
		layer:IDisplayObjectContainer,
		baseClass:Class<MovieClip>,
		positionX:Float, positionY:Float, intervalPixel:Int, baseWidth:Int
	) {
		this.movieClipUtilClass = movieClipUtilClass;
		this.positionY = positionY;
		this.positionX = positionX;
		this.baseClass = baseClass;
		this.intervalPixel = intervalPixel;
		this.layer = layer;
		this.baseWidth = baseWidth;

		graphicsSet = [];
	}
	public function create(number:Int) {

		graphicsSet = [];

		var numberStr:String = '$number';
		var px = positionX;
		var length:Int = numberStr.length;
		for (i in 0...length){

			var graphics:MovieClip = Type.createInstance(baseClass, []);
			var movieClipUtil:IMovieClipUtil = Type.createInstance(movieClipUtilClass, [graphics]);

			var num:Int = Std.parseInt(numberStr.charAt(i));
			movieClipUtil.gotoAndStop(num + 1);

			graphics.x = px;
			graphics.y = positionY;
			graphicsSet.push(graphics);

			px += baseWidth + intervalPixel;
		}
	}
	public function show() {

		for(graphics in graphicsSet)
			layer.addChild(graphics);
	}
	public function hide() {

		for(graphics in graphicsSet)
			layer.removeChild(graphics);
	}
}

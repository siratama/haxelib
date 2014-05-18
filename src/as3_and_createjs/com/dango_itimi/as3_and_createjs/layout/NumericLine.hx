package com.dango_itimi.as3_and_createjs.layout;

import com.dango_itimi.as3_and_createjs.layout.NumericLineAligh;
import com.dango_itimi.as3_and_createjs.utils.IMovieClipUtil;
import com.dango_itimi.as3_and_createjs.display.IDisplayObjectContainer;

#if js
import createjs.easeljs.MovieClip;
import createjs.easeljs.DisplayObject;
#else
import flash.display.DisplayObject;
import flash.display.MovieClip;
#end

class NumericLine {

	private var layer:IDisplayObjectContainer;
	private var intervalPixel:Int;
	private var baseClass:Class<MovieClip>;
	private var graphicsSet:Array<MovieClip>;
	private var positionX:Float;
	private var positionY:Float;
	private var numericGraphicsWidth:Int;
	private var align:NumericLineAligh;
	private var testDisplayObject:DisplayObject;

	//for OpenFL
	public var baseClassCreateFunction(null, default):Void->MovieClip;

	public function new(
		layer:IDisplayObjectContainer,
		baseClass:Class<MovieClip>,
		positionX:Float, positionY:Float, intervalPixel:Int, numericGraphicsWidth:Int,
		align:NumericLineAligh
	) {
		this.positionY = positionY;
		this.positionX = positionX;
		this.baseClass = baseClass;
		this.intervalPixel = intervalPixel;
		this.layer = layer;
		this.numericGraphicsWidth = numericGraphicsWidth;
		this.align = align;

		graphicsSet = [];

		baseClassCreateFunction = function(){
			return Type.createInstance(baseClass, []);
		};
	}
	public function create(number:Float) {

		createFromString(Std.string(number));
	}
	public function createFromString(numberStr:String) {

		var place:Int = numberStr.length;

		var px:Float = switch(align){
			case NumericLineAligh.LEFT:
				positionX;

			case NumericLineAligh.RIGHT:
				positionX - (place * numericGraphicsWidth);

			case NumericLineAligh.CENTER:
				positionX - Math.floor((place * numericGraphicsWidth) / 2);
		}
		createGraphics(numberStr, place, px);
	}
	private function createGraphics(numberStr:String, place:Int, px:Float) {

		graphicsSet = [];

		for (i in 0...place){

			var graphics:MovieClip = baseClassCreateFunction();
			var movieClipUtil:IMovieClipUtil = Type.createInstance(CommonClassSet.movieClipUtilClass, [graphics]);

			var character = numberStr.charAt(i);
			if(character == "."){
				movieClipUtil.gotoAndStop(movieClipUtil.getTotalFrames());
			}
			else{
				var num:Int = Std.parseInt(numberStr.charAt(i));
				movieClipUtil.gotoAndStop(num + 1);
			}

			graphics.x = px;
			graphics.y = positionY;
			graphicsSet.push(graphics);

			px += numericGraphicsWidth + intervalPixel;
		}
	}
	public inline function show() {

		for(graphics in graphicsSet)
			layer.addChild(graphics);
	}
	public inline function hide() {

		for(graphics in graphicsSet)
			layer.removeChild(graphics);
	}
}

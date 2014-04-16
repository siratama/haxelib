package com.dango_itimi.as3_and_createjs.layout;

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

	private var movieClipUtilClass:Class<IMovieClipUtil>;
	private var layer:IDisplayObjectContainer;
	private var intervalPixel:Int;
	private var baseClass:Class<MovieClip>;
	private var graphicsSet:Array<MovieClip>;
	private var positionX:Float;
	private var positionY:Float;
	private var baseWidth:Int;
	private var textAlignToRight:Bool;
	private var testDisplayObject:DisplayObject;

	//for OpenFL
	public var baseClassCreateFunction(null, default):Void->MovieClip;

	public function new(
		movieClipUtilClass:Class<IMovieClipUtil>,
		layer:IDisplayObjectContainer,
		baseClass:Class<MovieClip>,
		positionX:Float, positionY:Float, intervalPixel:Int, baseWidth:Int,
		textAlignToRight:Bool = false
	) {
		this.movieClipUtilClass = movieClipUtilClass;
		this.positionY = positionY;
		this.positionX = positionX;
		this.baseClass = baseClass;
		this.intervalPixel = intervalPixel;
		this.layer = layer;
		this.baseWidth = baseWidth;
		this.textAlignToRight = textAlignToRight;

		graphicsSet = [];

		baseClassCreateFunction = function(){
			return Type.createInstance(baseClass, []);
		};
	}
	public function create(number:Float) {

		graphicsSet = [];

		var numberStr:String = Std.string(number);
		var length:Int = numberStr.length;
		var px:Float = (!textAlignToRight) ? positionX : positionX - (numberStr.length * baseWidth);

		for (i in 0...length){

			var graphics:MovieClip = baseClassCreateFunction();
			var movieClipUtil:IMovieClipUtil = Type.createInstance(movieClipUtilClass, [graphics]);

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
	public function alignRight(positionX:Float){

		var px = positionX - (graphicsSet.length * baseWidth);
		for(graphics in graphicsSet){
			graphics.x = px;
			px += baseWidth;
		}
	}
}

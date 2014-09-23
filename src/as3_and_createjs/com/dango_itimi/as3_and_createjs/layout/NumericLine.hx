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

	private var parentLayer:IDisplayObjectContainer;
	private var layer:IDisplayObjectContainer;
	private var intervalPixel:Int;
	private var baseClass:Class<MovieClip>;
	private var graphicsSet:Array<MovieClip>;
	private var basePositionX:Float;
	private var basePositionY:Float;
	private var numericGraphicsWidth:Int;
	private var align:NumericLineAligh;

	//for OpenFL
	public var baseClassCreateFunction(null, default):Void->MovieClip;

	public function new(
		parentLayer:IDisplayObjectContainer,
		baseClass:Class<MovieClip>,
		basePositionX:Float, basePositionY:Float, intervalPixel:Int, numericGraphicsWidth:Int,
		align:NumericLineAligh
	) {
		this.basePositionY = basePositionY;
		this.basePositionX = basePositionX;
		this.baseClass = baseClass;
		this.intervalPixel = intervalPixel;
		this.parentLayer = parentLayer;
		this.numericGraphicsWidth = numericGraphicsWidth;
		this.align = align;

		graphicsSet = [];

		baseClassCreateFunction = function(){
			return Type.createInstance(baseClass, []);
		};

		layer = CommonClassSet.createLayer();
		parentLayer.addChild(cast layer);
		changeLayerPosition(basePositionX, basePositionY);
	}
	public function create(number:Float) {

		createFromString(Std.string(number));
	}
	public function createFromString(numberString:String) {

		var place:Int = numberString.length;
		var numericPositionX:Float =  switch(align){
			case NumericLineAligh.LEFT:
				0;

			case NumericLineAligh.RIGHT:
				-(place * numericGraphicsWidth);

			case NumericLineAligh.CENTER:
				-Math.floor((place * numericGraphicsWidth) / 2);
		}
		createGraphics(numberString, place, numericPositionX);
	}
	private function createGraphics(numberString:String, place:Int, numericPositionX:Float) {

		graphicsSet = [];

		for (i in 0...place){

			var graphics:MovieClip = baseClassCreateFunction();
			setCharacter(graphics, numberString, i);

			graphics.x = numericPositionX;
			graphicsSet.push(graphics);

			numericPositionX += numericGraphicsWidth + intervalPixel;
		}
	}
	private function setCharacter(graphics:MovieClip, numberString:String, index:Int)
	{
		//var movieClipUtil:IMovieClipUtil = Type.createInstance(CommonClassSet.movieClipUtilClass, [graphics]);
		var movieClipUtil = CommonClassSet.createMovieClipUtil(graphics);

		var character = numberString.charAt(index);
		if(character == "."){
			movieClipUtil.gotoAndStop(movieClipUtil.getTotalFrames());
		}
		else{
			var num:Int = Std.parseInt(character);
			movieClipUtil.gotoAndStop(num + 1);
		}
	}

	//
	public inline function show() {

		for(graphics in graphicsSet)
			layer.addChild(graphics);
	}
	public inline function hide() {

		for(graphics in graphicsSet)
			layer.removeChild(graphics);
	}
	public function showing():Bool
	{
		return layer.contains(graphicsSet[0]);
	}

	//
	public function changeFromString(numberString:String)
	{
		if(numberString.length != graphicsSet.length)
			throw "length error";

		for(index in 0...graphicsSet.length){
			setCharacter(graphicsSet[index], numberString, index);
		}
	}

	//
	public function changeLayerPosition(positionX:Float, positionY:Float){
		changeLayerPositionX(positionX);
		changeLayerPositionY(positionY);
	}
	public function changeLayerPositionX(positionX:Float){
		cast(layer).x = positionX;
	}
	public function changeLayerPositionY(positionY:Float){
		cast(layer).y = positionY;
	}
}

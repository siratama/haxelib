package com.dango_itimi.as3_and_createjs;

#if js
import createjs.easeljs.DisplayObject;
import createjs.easeljs.Container;
import createjs.easeljs.MovieClip;
import createjs.easeljs.Bitmap;

#else
import flash.display.DisplayObject;
import flash.display.DisplayObjectContainer;
import flash.display.MovieClip;
import flash.display.BitmapData;

#end

import com.dango_itimi.event.KeyChecker;
import com.dango_itimi.font.FontSpriteSheet;
import com.dango_itimi.as3_and_createjs.utils.IContainerUtil;
import com.dango_itimi.as3_and_createjs.utils.IMovieClipUtil;
import com.dango_itimi.as3_and_createjs.display.IDisplayObjectContainer;
import com.dango_itimi.as3_and_createjs.event.MouseEventChecker;
import com.dango_itimi.as3_and_createjs.font.TextToBitmapFontConverter;

class CommonClassSet {

	public static var keyCheckerClass:Class<KeyChecker>;
	public static var mouseEventCheckerClass:Class<MouseEventChecker>;
	public static var movieClipUtilClass:Class<IMovieClipUtil>;
	public static var containerUtilClass:Class<IContainerUtil>;
	public static var defaultLayerClass:Class<IDisplayObjectContainer>;
	public static var textToBitmapFontConverterClass:Class<TextToBitmapFontConverter>;

	public static function createLayer():IDisplayObjectContainer{
		return Type.createInstance(defaultLayerClass, []);
	}
	public static function createContainerUtil(container:#if js Container #else DisplayObjectContainer #end):IContainerUtil{
		return Type.createInstance(containerUtilClass, [container]);
	}
	public static function createMovieClipUtil(mc:MovieClip):IMovieClipUtil{
		return Type.createInstance(movieClipUtilClass, [mc]);
	}
	public static function createMouseEventChecker(displayObject:DisplayObject){
		return Type.createInstance(mouseEventCheckerClass, [displayObject]);
	}
	public static function createKeyChecker(param:#if js Bool = false #else DisplayObject #end):KeyChecker{
		return Type.createInstance(keyCheckerClass, [param]);
	}
	public static function createTextToBitmapFontConverter(
		fontSpriteSheetScale:Int,
		twoByteFontSpriteSheetClass:Class<FontSpriteSheet>, twoByteFontBitmapClass:Class<#if js Bitmap #else BitmapData #end>,
		oneByteFontSpriteSheetClass:Class<FontSpriteSheet> = null, oneByteFontBitmapClass:Class<#if js Bitmap #else BitmapData #end> = null
	):TextToBitmapFontConverter{
		return Type.createInstance(textToBitmapFontConverterClass, [fontSpriteSheetScale, twoByteFontSpriteSheetClass, twoByteFontBitmapClass, oneByteFontSpriteSheetClass, oneByteFontBitmapClass]);
	}
}

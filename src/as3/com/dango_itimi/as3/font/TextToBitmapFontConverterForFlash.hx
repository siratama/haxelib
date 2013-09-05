package com.dango_itimi.as3.font;

import com.dango_itimi.as3_and_createjs.font.TextToBitmapFontConverter;
import flash.geom.Rectangle;
import flash.geom.Point;
import flash.display.Bitmap;
import flash.display.BitmapData;
import com.dango_itimi.font.FontSpriteSheet;

class TextToBitmapFontConverterForFlash extends TextToBitmapFontConverter{

	private var twoByteBaseFontBitmapData:BitmapData;
	private var oneByteBaseFontBitmapData:BitmapData;

	public function new(
		fontSpriteSheetScale:Int,
		twoByteFontSpriteSheetClass:Class<FontSpriteSheet>, twoByteFontBitmapDataClass:Class<BitmapData>,
		oneByteFontSpriteSheetClass:Class<FontSpriteSheet> = null, oneByteFontBitmapDataClass:Class<BitmapData> = null
	){
		twoByteBaseFontBitmapData = Type.createInstance(twoByteFontBitmapDataClass, []);

		if(oneByteFontBitmapDataClass != null)
			oneByteBaseFontBitmapData = Type.createInstance(oneByteFontBitmapDataClass, []);

		super(fontSpriteSheetScale, twoByteFontSpriteSheetClass, oneByteFontSpriteSheetClass);
	}
	override private function createTwoByteFont(cropRectangle:Rectangle):Bitmap {

		return createFont(cropRectangle, twoByteFontSpriteSheet.fontWidth, twoByteFontSpriteSheet.fontHeight, twoByteBaseFontBitmapData);
	}
	override private function createOneByteFont(cropRectangle:Rectangle):Bitmap {

		return createFont(cropRectangle, oneByteFontSpriteSheet.fontWidth, oneByteFontSpriteSheet.fontHeight, oneByteBaseFontBitmapData);
	}
	private function createFont(cropRectangle:Rectangle, fontWidth:Int, fontHeight:Int, baseFontBitmapData:BitmapData):Bitmap {

		var fontBitmapData = new BitmapData(fontWidth, fontHeight);
		fontBitmapData.copyPixels(baseFontBitmapData, cropRectangle, new Point());
		var fontBitmap = new Bitmap(fontBitmapData);
		return fontBitmap;
	}
}

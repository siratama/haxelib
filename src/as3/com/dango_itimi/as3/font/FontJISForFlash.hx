package com.dango_itimi.as3.font;

import flash.geom.Rectangle;
import flash.geom.Point;
import flash.display.Bitmap;
import flash.display.BitmapData;
import com.dango_itimi.as3_and_createjs.font.FontJIS;
import com.dango_itimi.font.FontSpriteSheet;

class FontJISForFlash extends FontJIS{

	private var baseFontBitmapData:BitmapData;

	public function new(fontSpriteSheetClass:Class<FontSpriteSheet>, fontSpriteSheetScale:Int, fontBitmapDataClass:Class<BitmapData>){

		baseFontBitmapData = Type.createInstance(fontBitmapDataClass, []);
		super(fontSpriteSheetClass, fontSpriteSheetScale);
	}
	override private function createFont(cropRectangle:Rectangle):Bitmap {

		var fontBitmapData = new BitmapData(fontSpriteSheet.fontWidth, fontSpriteSheet.fontHeight);
		fontBitmapData.copyPixels(baseFontBitmapData, cropRectangle, new Point());
		var fontBitmap = new Bitmap(fontBitmapData);
		return fontBitmap;
	}
}

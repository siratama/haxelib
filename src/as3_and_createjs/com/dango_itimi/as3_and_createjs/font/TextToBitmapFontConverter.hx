package com.dango_itimi.as3_and_createjs.font;

#if js
import createjs.easeljs.Bitmap;
import createjs.easeljs.Rectangle;

#else
import flash.display.Bitmap;
import flash.geom.Rectangle;

#end

import com.dango_itimi.font.FontSpriteSheet;
import com.dango_itimi.font.JISFont;
import com.dango_itimi.font.JIS0208;
import com.dango_itimi.font.JIS0201;
import com.dango_itimi.utils.StringUtil;

class TextToBitmapFontConverter {

	public var twoByteFontSpriteSheet(default, null):FontSpriteSheet;
	public var oneByteFontSpriteSheet(default, null):FontSpriteSheet;
	private var jis0208:JIS0208;
	private var jis0201:JIS0201;
	private static var JIS_0201_EReg:EReg = ~/[ -~｡-ﾟ]/;

	public function new(scale:Int, twoByteFontSpriteSheetClass:Class<FontSpriteSheet>, oneByteFontSpriteSheetClass:Class<FontSpriteSheet>){

		twoByteFontSpriteSheet = Type.createInstance(twoByteFontSpriteSheetClass, [scale]);

		if(oneByteFontSpriteSheetClass != null)
			oneByteFontSpriteSheet = Type.createInstance(oneByteFontSpriteSheetClass, [scale]);

		jis0208 = new JIS0208();
		jis0201 = new JIS0201();
	}
	public function execute(text:String):Array<FontData> {

		return (oneByteFontSpriteSheet == null) ? convertTwoByteOnly(text) : convert(text);
	}
	private function convertTwoByteOnly(text:String):Array<FontData>{

		var indexSet = jis0208.getIndexSet(StringUtil.convertOneByteToTwoByte(text));
		var fontDataSet = new Array<FontData>();
		for(index in indexSet){

			var cropRectangle = getCropRectangle(index, twoByteFontSpriteSheet);
			var fontBitmap:Bitmap = createTwoByteFont(cropRectangle);
			fontDataSet.push(new FontData(fontBitmap, twoByteFontSpriteSheet.fontWidth));
		}
		return fontDataSet;
	}
	private function convert(text:String):Array<FontData>{

		var fontDataSet = new Array<FontData>();

		var textLength = text.length;
		for(i in 0...textLength){

			var character = text.charAt(i);
			var width:Int;
			var jisFont:JISFont;
			var fontSpriteSheet:FontSpriteSheet;
			var createFunction:Rectangle->Bitmap;

			if(JIS_0201_EReg.match(character)){
				width = oneByteFontSpriteSheet.fontWidth;
				jisFont = jis0201;
				fontSpriteSheet = oneByteFontSpriteSheet;
				createFunction = createOneByteFont;
			}
			else{
				width = twoByteFontSpriteSheet.fontWidth;
				jisFont = jis0208;
				fontSpriteSheet = twoByteFontSpriteSheet;
				createFunction = createTwoByteFont;
			}

			var index = jisFont.getIndex(character);
			var cropRectangle = getCropRectangle(index, fontSpriteSheet);
			var fontBitmap = createFunction(cropRectangle);
			fontDataSet.push(new FontData(fontBitmap, width));
		}
		return fontDataSet;
	}
	private function getCropRectangle(index:Int, fontSpriteSheet:FontSpriteSheet):Rectangle{

		var cropPoint = fontSpriteSheet.getCropPoint(index);
		return new Rectangle(cropPoint.x, cropPoint.y, fontSpriteSheet.fontWidth, fontSpriteSheet.fontHeight);
	}

	private function createTwoByteFont(cropRectangle:Rectangle):Bitmap {
		return null;
	}
	private function createOneByteFont(cropRectangle:Rectangle):Bitmap {
		return null;
	}
}

class FontData{

	public var bitmap(default, null):Bitmap;
	public var width(default, null):Int;

	public function new(bitmap:Bitmap, width:Int){
		this.bitmap = bitmap;
		this.width = width;
	}
}

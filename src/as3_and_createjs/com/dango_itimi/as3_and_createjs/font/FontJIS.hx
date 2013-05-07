package com.dango_itimi.as3_and_createjs.font;

#if js
import createjs.easeljs.Bitmap;
import createjs.easeljs.Rectangle;

#elseif flash
import flash.display.Bitmap;
import flash.geom.Rectangle;

#end

import com.dango_itimi.font.FontSpriteSheet;
import com.dango_itimi.font.JIS0208;
import com.dango_itimi.utils.StringUtil;

class FontJIS {

	public var fontSpriteSheet(default, null):FontSpriteSheet;
	private var jis:JIS0208;

	public function new(fontSpriteSheetClass:Class<FontSpriteSheet>, scale:Int){

		fontSpriteSheet = Type.createInstance(fontSpriteSheetClass, [scale]);
		jis = new JIS0208();
	}
	public function createFontSet(text:String):Array<Bitmap> {

		var indexSet = jis.getIndexSet(StringUtil.convertOneByteToTwoByte(text));

		var fontSet = new Array<Bitmap>();
		for(index in indexSet){

			var cropPoint = fontSpriteSheet.getCropPoint(index);
			var cropRectangle = new Rectangle(
				cropPoint.x, cropPoint.y, fontSpriteSheet.fontWidth, fontSpriteSheet.fontHeight);

			var font:Bitmap = createFont(cropRectangle);
			fontSet.push(font);
		}
		return fontSet;
	}
	private function createFont(cropRectangle:Rectangle):Bitmap {
		return null;
	}
}

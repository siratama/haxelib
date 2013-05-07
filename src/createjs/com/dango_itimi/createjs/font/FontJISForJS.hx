package com.dango_itimi.createjs.font;
import createjs.easeljs.Bitmap;
import createjs.easeljs.Rectangle;
import com.dango_itimi.font.FontSpriteSheet;
import com.dango_itimi.as3_and_createjs.font.FontJIS;

class FontJISForJS extends FontJIS{

	private var fontBitmapClass:Class<Bitmap>;

	public function new(fontSpriteSheetClass:Class<FontSpriteSheet>, fontSpriteSheetScale:Int, fontBitmapClass:Class<Bitmap>){

		this.fontBitmapClass = fontBitmapClass;

		super(fontSpriteSheetClass, fontSpriteSheetScale);
	}
	override private function createFont(cropRectangle:Rectangle):Bitmap {

		var fontBitmap = Type.createInstance(fontBitmapClass, []);
		fontBitmap.sourceRect = cropRectangle;
		fontBitmap.cache(0, 0, fontSpriteSheet.fontWidth, fontSpriteSheet.fontHeight);
		return fontBitmap;
	}
}

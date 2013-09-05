package com.dango_itimi.createjs.font;
import com.dango_itimi.as3_and_createjs.font.TextToBitmapFontConverter;
import createjs.easeljs.Bitmap;
import createjs.easeljs.Rectangle;
import com.dango_itimi.font.FontSpriteSheet;

class TextToBitmapFontConverterForJS extends TextToBitmapFontConverter{

	private var twoByteFontBitmapClass:Class<Bitmap>;
	private var oneByteFontBitmapClass:Class<Bitmap>;

	public function new(
		fontSpriteSheetScale:Int,
		twoByteFontSpriteSheetClass:Class<FontSpriteSheet>, twoByteFontBitmapClass:Class<Bitmap>,
		oneByteFontSpriteSheetClass:Class<FontSpriteSheet> = null, oneByteFontBitmapClass:Class<Bitmap> = null
	){
		this.twoByteFontBitmapClass = twoByteFontBitmapClass;
		this.oneByteFontBitmapClass = oneByteFontBitmapClass;

		super(fontSpriteSheetScale, twoByteFontSpriteSheetClass, oneByteFontSpriteSheetClass);
	}

	override private function createTwoByteFont(cropRectangle:Rectangle):Bitmap {

		return createFont(cropRectangle, twoByteFontSpriteSheet.fontWidth, twoByteFontSpriteSheet.fontHeight, twoByteFontBitmapClass);
	}
	override private function createOneByteFont(cropRectangle:Rectangle):Bitmap {

		return createFont(cropRectangle, oneByteFontSpriteSheet.fontWidth, oneByteFontSpriteSheet.fontHeight, oneByteFontBitmapClass);
	}
	private function createFont(cropRectangle:Rectangle, fontWidth:Int, fontHeight:Int, fontBitmapClass:Class<Bitmap>):Bitmap {

		var fontBitmap = Type.createInstance(fontBitmapClass, []);
		fontBitmap.sourceRect = cropRectangle;
		fontBitmap.cache(0, 0, fontWidth, fontHeight);
		return fontBitmap;
	}
}

package com.dango_itimi.font;
import com.dango_itimi.utils.RectangleUtil;
import com.dango_itimi.utils.PointUtil;
class FontSpriteSheet {

	public var width(default, null):Int;
	public var fontWidth(default, null):Int;
	public var fontHeight(default, null):Int;

	public function new(scale:Int){

		width *= scale;
		fontHeight *= scale;
		fontWidth *= scale;
	}
	public function getCropPoint(fontIndex:Int):Point{

		var totalWidth = fontIndex * fontWidth;

		var x = totalWidth % width / fontWidth;
		var y = Math.floor(totalWidth / width);

		return {x:x * fontWidth, y:y * fontHeight};
	}
}

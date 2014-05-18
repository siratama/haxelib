package com.dango_itimi.utils;
class StringUtil {

	public static function convertOneByteToTwoByte(before:String):String{

		var after = "";
		for(i in 0...before.length){

			after += ~/[!-~]/g.replace(
				before.charAt(i),
				String.fromCharCode(before.charCodeAt(i) + 0xFEE0)
			);
		}
		return after;
	}

	public static function addZeroToHeadOfNumber(number:Int, addedNum:Int):String{

		var numStr:String = Std.string(number);
		var len:Int = addedNum - numStr.length;
		for(i in 0...len) numStr = "0" + numStr;
		return numStr;
	}

	public static inline var CR = String.fromCharCode(13);
	public static inline var LF = String.fromCharCode(10);

	public static function splitWithNewline(text:String):Array<String>{

		text = replaceNewline(text, CR + LF, CR);
		text = replaceNewline(text, LF, CR);
		return text.split(CR);
	}
	public static function replaceNewline(original:String, fromText:String, toText:String):String{
		var arr = original.split(fromText);
		return arr.join(toText);
	}
}

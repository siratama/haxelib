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

	public static function addZeroToHeadOfNumber(number:Int, place:Int):String{

		var numberString:String = Std.string(number);
		var zeroTotal:Int = place - numberString.length;
		for(i in 0...zeroTotal) numberString = "0" + numberString;
		return numberString;
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

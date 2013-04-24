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

		var numStr:String = cast number;
		var len:Int = addedNum - numStr.length;
		for(i in 0...len) numStr = "0" + numStr;
		return numStr;
	}
}

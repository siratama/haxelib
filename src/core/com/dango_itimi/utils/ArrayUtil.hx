package com.dango_itimi.utils;

class ArrayUtil {

	public static function shuffle<T>(arr:Array<T>){
		var n = arr.length;
		while (n > 1){
			var k = Std.random(n);
			n--;
			var temp = arr[n];
			arr[n] = arr[k];
			arr[k]= temp;
		}
	}
}

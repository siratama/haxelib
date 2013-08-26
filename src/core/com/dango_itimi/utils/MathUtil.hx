package com.dango_itimi.utils;
class MathUtil {
	/**
	* Converts specified angle in radians to degrees.
	* @return angle in degrees (not normalized to 0...360)
	*/
	public inline static function changeRadianToDegree(radian:Float):Float
	{
		return 180 / Math.PI * radian;
	}
	/**
	* Converts specified angle in degrees to radians.
	* @return angle in radians (not normalized to 0...Math.PI*2)
	*/
	public inline static function changeDegreeToRadian(degree:Float):Float
	{
		return Math.PI / 180 * degree;
	}
	/**
	* "Clamps" a value to boundaries [min, max].
	* Example:
	* clamp(2, 1, 5) == 2;
	* clamp(0, 1, 5) == 1;
	* clamp(6, 1, 5) == 5;
	*/
	public inline static function clamp(value:Float, min:Float, max:Float):Float
	{
		if (value < min)
			return min;
		else if (value > max)
			return max;
		else
			return value;
	}
}

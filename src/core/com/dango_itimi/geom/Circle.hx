package com.dango_itimi.geom;

class Circle
{
	public static function isHitCircle(
		circleX1:Float, circleY1:Float, circleRadius1:Float,
		circleX2:Float, circleY2:Float, circleRadius2:Float
	):Bool
	{
		var sx = circleX2 - circleX1;
		var sy = circleY2 - circleY1;
		var length = Math.sqrt(sx * sx + sy * sy);
		return (length < (circleRadius1 + circleRadius2));
	}
}

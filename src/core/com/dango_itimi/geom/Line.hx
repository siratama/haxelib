package com.dango_itimi.geom;

import com.dango_itimi.utils.MathUtil;
import com.dango_itimi.utils.PointUtil;
import com.dango_itimi.utils.PointUtil.Point;

class Line {

	public var firstPoint(default, null):Point;
	public var endPoint(default, null):Point;

	public function new(firstPoint:Point, endPoint:Point){

		this.endPoint = endPoint;
		this.firstPoint = firstPoint;
	}
	public static inline function create(
		firstPointX:Float, firstPointY:Float, endPointX:Float, endPointY:Float):Line{

		return new Line(PointUtil.create(firstPointX, firstPointY), PointUtil.create(endPointX, endPointY));
	}
	public static inline function convert(firstPoint:Dynamic, endPoint:Dynamic):Line{
		return new Line(PointUtil.convert(firstPoint), PointUtil.convert(endPoint));
	}

	//
	public function isCrossing(checkedLine:Line):Bool {

		var n1:Float = 0;
		var n2:Float = 0;

		//this が checkedLine をまたいでいるかどうか調査
		n1 = checkCrossCmn(checkedLine.firstPoint.x, checkedLine.firstPoint.y, this);
		n2 = checkCrossCmn(checkedLine.endPoint.x, checkedLine.endPoint.y, this);
		var ret1:Float = n1 * n2;

		//checkedLine が this をまたいでいるかどうか調査
		n1 = checkCrossCmn(firstPoint.x, firstPoint.y, checkedLine);
		n2 = checkCrossCmn(endPoint.x, endPoint.y, checkedLine);
		var ret2:Float = n1 * n2;

		return ((ret1 <= 0) && (ret2 <= 0));
	}
	private function checkCrossCmn(x:Float, y:Float, line:Line):Float {

		return (
			(x - line.firstPoint.x) * (y - line.endPoint.y) -
			(y - line.firstPoint.y) * (x - line.endPoint.x)
		);
	}

	//
	public function getCrossPoint(checkedLine:Line):Point {

		var param1:CrossCheckParameter = new CrossCheckParameter(this);
		if(!param1.create()) return null;

		var param2:CrossCheckParameter = new CrossCheckParameter(checkedLine);
		if(!param2.create()) return null;

		var det:Float = (param1.a * param2.b) - (param2.a * param1.b);

		if(Math.abs(det) < MathUtil.ACCY) return null;

		var dinv:Float = 1.0 / det;

		return PointUtil.create(
			(((param1.b * param2.c) - (param2.b * param1.c)) * dinv),
			(((param2.a * param1.c) - (param1.a * param2.c)) * dinv)
		);
	}

}
private class CrossCheckParameter {

	// ax + by + c = 0
	public var a(default, null):Float;
	public var b(default, null):Float;
	public var c(default, null):Float;

	private var line:Line;
	public function new(line:Line) {
		this.line = line;
	}

	/**
	 * @return false 直線ではない
	 */
	public function create():Bool {

		var xx:Float = line.endPoint.x - line.firstPoint.x;
		var yy:Float = line.endPoint.y - line.firstPoint.y;

		var rsq:Float = Math.pow(xx, 2) + Math.pow(yy, 2);

		if(rsq < MathUtil.ACCY) return false;

		var r:Float = 1 / Math.sqrt(rsq);

		a = -yy * r;
		b = xx * r;
		c = ((line.firstPoint.x * line.endPoint.y) - (line.endPoint.x * line.firstPoint.y)) * r;

		return true;
	}
}

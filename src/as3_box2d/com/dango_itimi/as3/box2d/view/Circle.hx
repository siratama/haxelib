package com.dango_itimi.as3.box2d.view;
import box2D.collision.shapes.B2CircleShape;
class Circle extends ViewForFlash{

	override private function createShape(scale:Float) {

		var bounds = cast(baseShape, BaseShapeForFlash).bounds;
		shape = new B2CircleShape(bounds.width / 2 / scale);
	}
}

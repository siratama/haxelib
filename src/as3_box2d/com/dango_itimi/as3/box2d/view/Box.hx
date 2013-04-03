package com.dango_itimi.as3.box2d.view;
import box2D.collision.shapes.B2PolygonShape;
class Box extends ViewForFlash{

	override private function createShape(scale:Float) {

		shape = new B2PolygonShape();

		var bounds = cast(baseShape, BaseShapeForFlash).getBounds();
		cast(shape, B2PolygonShape).setAsBox(
			bounds.width / 2 / scale,
			bounds.height / 2 / scale
		);
	}
}

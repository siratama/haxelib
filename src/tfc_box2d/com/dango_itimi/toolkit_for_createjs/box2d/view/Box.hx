package com.dango_itimi.toolkit_for_createjs.box2d.view;
import box2D.collision.shapes.B2PolygonShape;
class Box extends ViewForJS{

	override private function createShape(scale:Float) {

		shape = new B2PolygonShape();

		var bounds = cast(baseShape, BaseShapeForJS).bounds;
		cast(shape, B2PolygonShape).setAsBox(
			bounds.width / 2 / scale,
			bounds.height / 2 / scale
		);
	}
}

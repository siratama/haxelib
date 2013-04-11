package com.dango_itimi.toolkit_for_createjs.box2d.view;
import box2D.collision.shapes.B2CircleShape;
class Circle extends ViewForJS{

	override private function createShape(scale:Float) {

		var bounds = cast(baseShape, BaseShapeForJS).bounds;
		shape = new B2CircleShape(bounds.width / 2 / scale);
	}
}

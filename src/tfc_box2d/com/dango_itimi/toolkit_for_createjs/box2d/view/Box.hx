package com.dango_itimi.toolkit_for_createjs.box2d.view;
import box2D.collision.shapes.B2PolygonShape;
class Box extends View{

	override private function createShape(scale:Float) {

		shape = new B2PolygonShape();

		cast(shape,  B2PolygonShape).setAsBox(
			baseShape.getBounds().width / 2 / scale,
			baseShape.getBounds().height / 2 / scale
		);
	}
}

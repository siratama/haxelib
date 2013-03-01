package com.dango_itimi.toolkit_for_createjs.box2d.view;
import box2D.collision.shapes.B2CircleShape;
class Circle extends View{

	override private function createShape(scale:Float) {
		shape = new B2CircleShape(baseShape.getBounds().width / 2 / scale);
	}
}

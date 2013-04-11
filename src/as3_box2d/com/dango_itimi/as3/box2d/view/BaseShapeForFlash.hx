package com.dango_itimi.as3.box2d.view;

import flash.geom.Rectangle;
import flash.display.MovieClip;
import com.dango_itimi.box2d.view.BaseShape;

class BaseShapeForFlash extends BaseShape{

	public var bounds(default, null):Rectangle;

	public function setShapeSprite(shapeSprite:MovieClip) {

		var rotation:Float = shapeSprite.rotation;
		shapeSprite.rotation = 0;

		bounds = shapeSprite.getBounds(shapeSprite.parent);

		centerX = shapeSprite.x;
		centerY = shapeSprite.y;
		shapeSprite.rotation = rotation;
	}
}

package com.dango_itimi.box2d.view;

class BaseShape {

	private var centerX:Float;
	private var centerY:Float;

	public function new() {

		/*
		var rotation:Float = shapeSprite.rotation;
		shapeSprite.rotation = 0;

		bounds = ContainerUtil.getNominalBounds(shapeSprite);
		bounds.width *= shapeSprite.scaleX;
		bounds.height *= shapeSprite.scaleY;

		centerX = shapeSprite.x;
		centerY = shapeSprite.y;
		shapeSprite.rotation = rotation;
		*/
	}


	public function getCenterX():Float {
		return centerX;
	}

	public function getCenterY():Float {
		return centerY;
	}
}

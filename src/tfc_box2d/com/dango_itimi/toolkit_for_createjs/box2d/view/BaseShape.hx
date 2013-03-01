package com.dango_itimi.toolkit_for_createjs.box2d.view;
import com.dango_itimi.toolkit_for_createjs.utils.ContainerUtil;
import com.dango_itimi.utils.RectangleUtil;
import createjs.easeljs.MovieClip;
class BaseShape {

	private var bounds:RectangleUtil;
	private var centerX:Float;
	private var centerY:Float;

	public function new(shapeSprite:MovieClip) {

		var rotation:Float = shapeSprite.rotation;
		shapeSprite.rotation = 0;

		bounds = ContainerUtil.getNominalBounds(shapeSprite);
		bounds.width *= shapeSprite.scaleX;
		bounds.height *= shapeSprite.scaleY;

		/*
		centerX = bounds.x + (bounds.width / 2);
		centerY = bounds.y + (bounds.height / 2);
		centerX = shapeSprite.parent.x + shapeSprite.x;
		centerY = shapeSprite.parent.y + shapeSprite.y;
		*/
		//trace([shapeSprite.parent.x, shapeSprite.parent.y, shapeSprite.x, shapeSprite.y]);
		centerX = shapeSprite.x;
		centerY = shapeSprite.y;
		shapeSprite.rotation = rotation;
	}

	public function getBounds():RectangleUtil {
		return bounds;
	}

	public function getCenterX():Float {
		return centerX;
	}

	public function getCenterY():Float {
		return centerY;
	}
}

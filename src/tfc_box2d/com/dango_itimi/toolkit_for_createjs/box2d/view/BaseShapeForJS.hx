package com.dango_itimi.toolkit_for_createjs.box2d.view;
import com.dango_itimi.box2d.view.BaseShape;
import com.dango_itimi.toolkit_for_createjs.utils.ContainerUtil;
import com.dango_itimi.utils.RectangleUtil;
import createjs.easeljs.MovieClip;
class BaseShapeForJS extends BaseShape{

	public var bounds(default, null):RectangleUtil;

	public function setShapeSprite(shapeSprite:MovieClip) {

		var rotation:Float = shapeSprite.rotation;
		shapeSprite.rotation = 0;

		bounds = ContainerUtil.getNominalBounds(shapeSprite);
		bounds.width *= shapeSprite.scaleX;
		bounds.height *= shapeSprite.scaleY;

		centerX = shapeSprite.x;
		centerY = shapeSprite.y;
		shapeSprite.rotation = rotation;
	}
}

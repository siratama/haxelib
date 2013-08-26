package com.dango_itimi.toolkit_for_createjs.box2d.view;

import com.dango_itimi.box2d.userdata.UserData;
import com.dango_itimi.box2d.view.View;
import com.dango_itimi.utils.MathUtil;
import createjs.easeljs.MovieClip;

class ViewForJS extends View{

	public var chunkSprite(default, null):MovieClip;

	public function createBaseShape(chunkSprite:MovieClip) {

		this.chunkSprite = chunkSprite;

		baseShape = new BaseShapeForJS();
		cast(baseShape, BaseShapeForJS).setShapeSprite(chunkSprite);
		angle = MathUtil.changeDegreeToRadian(chunkSprite.rotation);
	}

	override public function toString():String {

		return [chunkSprite.name, super.toString()].join(",");
	}

	override private function cloneChild(view:View) {

		cast(view, ViewForJS).createBaseShape(chunkSprite);
	}

	override public function getBaseShapeWidth():Float{
		return cast(baseShape, BaseShapeForJS).bounds.width;
	}
	override public function getBaseShapeHeight():Float{
		return cast(baseShape, BaseShapeForJS).bounds.height;
	}
}

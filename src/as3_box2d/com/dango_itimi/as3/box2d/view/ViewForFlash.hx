package com.dango_itimi.as3.box2d.view;

import flash.display.MovieClip;
import com.dango_itimi.box2d.userdata.UserData;
import com.dango_itimi.box2d.view.View;
import com.dango_itimi.utils.MathUtil;

class ViewForFlash extends View{

	public var chunkSprite(default, null):MovieClip;

	public function createBaseShape(chunkSprite:MovieClip) {

		this.chunkSprite = chunkSprite;

		baseShape = new BaseShapeForFlash();
		cast(baseShape, BaseShapeForFlash).setShapeSprite(chunkSprite);
		angle = MathUtil.degToRad(chunkSprite.rotation);
	}

	override public function toString():String{

		return [chunkSprite.name, super.toString()].join(",");
	}

	override private function cloneChild(view:View) {

		cast(view, ViewForFlash).createBaseShape(chunkSprite);
	}

	override public function getBaseShapeWidth():Float{
		return cast(baseShape, BaseShapeForFlash).bounds.width;
	}
	override public function getBaseShapeHeight():Float{
		return cast(baseShape, BaseShapeForFlash).bounds.height;
	}
}

package com.dango_itimi.as3.box2d.view;

import flash.display.MovieClip;
import com.dango_itimi.box2d.userdata.UserData;
import com.dango_itimi.box2d.view.View;
import com.dango_itimi.utils.MathUtil;

class ViewForFlash extends View{

	private var chunkSprite:MovieClip;

	public function createBaseShape(chunkSprite:MovieClip) {

		this.chunkSprite = chunkSprite;

		baseShape = new BaseShapeForFlash();
		cast(baseShape, BaseShapeForFlash).setShapeSprite(chunkSprite);
		angle = MathUtil.degToRad(chunkSprite.rotation);
	}

	override public function toString() {

		trace("------", chunkSprite.name);
		super.toString();
	}

	override private function cloneChild(view:View) {

		cast(view, ViewForFlash).createBaseShape(chunkSprite);
	}

	public function getChunkSprite():MovieClip {
		return chunkSprite;
	}
}

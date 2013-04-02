package com.dango_itimi.toolkit_for_createjs.box2d.view;

import com.dango_itimi.box2d.userdata.UserData;
import com.dango_itimi.box2d.view.View;
import com.dango_itimi.utils.MathUtil;
import createjs.easeljs.MovieClip;

class ViewForJS extends View{

	private var chunkSprite:MovieClip;

	public function createBaseShape(chunkSprite:MovieClip) {

		baseShape = new BaseShapeForJS();
		cast(baseShape, BaseShapeForJS).setShapeSprite(chunkSprite);
		angle = MathUtil.degToRad(chunkSprite.rotation);
	}

	override public function toString() {

		trace("------", chunkSprite.name);
		super.toString();
	}

	override private function cloneChild(view:View) {

		cast(view, ViewForJS).createBaseShape(chunkSprite);
	}

	public function getChunkSprite():MovieClip {
		return chunkSprite;
	}
}

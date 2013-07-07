package com.dango_itimi.as3.box2d.view;

import flash.display.MovieClip;
import com.dango_itimi.box2d.view.View;
import box2D.collision.shapes.B2PolygonShape;
import box2D.common.math.B2Vec2;

class Polygon extends ViewForFlash{

	private var verticesMap:Map<String, BaseShapeForFlash>;
	private var verticesTotal:Int;

	override private function initializeChild(){

		verticesMap = new Map();
		verticesTotal = 0;

		for(i in 0...chunkSprite.numChildren){

			var property:MovieClip = cast chunkSprite.getChildByName(View.POINT_MC_HEAD_NAME + i);
			if(property == null) continue;

			var baseShape = new BaseShapeForFlash();
			baseShape.setShapeSprite(property);
			verticesMap.set(Std.string(i), baseShape);

			if(i > verticesTotal) verticesTotal = i;
		}
		verticesTotal++;
	}
	override private function setBodyDefPosition(scale:Float) {

		bodyDefPosX = chunkSprite.x / scale;
		bodyDefPosY = chunkSprite.y / scale;
	}

	override private function createShape(scale:Float) {

		var vertices:Array<B2Vec2> = [];
		for (i in 0...verticesTotal) {

			var pt:BaseShapeForFlash = verticesMap.get(cast i);
			var b2Vec2 = new B2Vec2(pt.centerX / scale, pt.centerY / scale);
			vertices.push(b2Vec2);
		}
		shape = new B2PolygonShape();
		cast(shape, B2PolygonShape).setAsVector(vertices, verticesTotal);
	}
}

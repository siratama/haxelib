package com.dango_itimi.toolkit_for_createjs.box2d.view;
import com.dango_itimi.box2d.view.View;
import createjs.easeljs.MovieClip;
import com.dango_itimi.toolkit_for_createjs.utils.ContainerUtil;
import box2D.collision.shapes.B2PolygonShape;
import box2D.common.math.B2Vec2;
class Polygon extends ViewForJS{

	private var verticesMap:Map<String, BaseShapeForJS>;
	private var verticesTotal:Int;

	override private function initializeChild(){

		verticesMap = new Map();
		verticesTotal = 0;

		var fields = Reflect.fields(chunkSprite);
		for (prop in fields) {

			if(prop.charAt(0) != View.POINT_MC_HEAD_NAME) continue;

			var id = prop.substring(View.POINT_MC_HEAD_NAME.length).split("_")[0];
			if(Math.isNaN(cast id)) continue;

			var property:MovieClip = ContainerUtil.getProperty(chunkSprite, prop);
			var baseShape = new BaseShapeForJS();
			baseShape.setShapeSprite(property);
			verticesMap.set(id, baseShape);

			var n:Int = cast id;
			if(n > verticesTotal) verticesTotal = n;
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

			var pt:BaseShapeForJS = verticesMap.get(cast i);
			var b2Vec2 = new B2Vec2(pt.centerX / scale, pt.centerY / scale);
			vertices.push(b2Vec2);
		}
		shape = new B2PolygonShape();
		cast(shape, B2PolygonShape).setAsVector(vertices, verticesTotal);
	}
}

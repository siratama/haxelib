package com.dango_itimi.toolkit_for_createjs.box2d.view;
import createjs.easeljs.MovieClip;
import com.dango_itimi.toolkit_for_createjs.utils.ContainerUtil;
import box2D.collision.shapes.B2PolygonShape;
import box2D.common.math.B2Vec2;
class Polygon extends View{

	private static inline var POINT_MC_HEAD_NAME:String = "p";
	private var verticesMap:Hash<BaseShape>;
	private var verticesTotal:Int;

	override private function initializeChild(){

		verticesMap = new Hash();
		verticesTotal = 0;

		var fields = Reflect.fields(chunkSprite);
		for (prop in fields) {

			if(prop.charAt(0) != POINT_MC_HEAD_NAME) continue;

			var id = prop.substring(POINT_MC_HEAD_NAME.length).split("_")[0];
			if(Math.isNaN(cast id)) continue;

			var property:MovieClip = ContainerUtil.getProperty(chunkSprite, prop);
			var baseShape = new BaseShape(property);
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

			var pt:BaseShape = verticesMap.get(cast i);
			var b2Vec2 = new B2Vec2(pt.getCenterX() / scale, pt.getCenterY() / scale);
			vertices.push(b2Vec2);
		}
		shape = new B2PolygonShape();
		cast(shape, B2PolygonShape).setAsVector(vertices, verticesTotal);
	}
}

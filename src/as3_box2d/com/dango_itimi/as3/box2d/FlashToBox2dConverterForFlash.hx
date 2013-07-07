package com.dango_itimi.as3.box2d;

import flash.display.Sprite;
import flash.display.MovieClip;
import com.dango_itimi.box2d.fla.ChunkMap;
import com.dango_itimi.box2d.userdata.UserData;
import com.dango_itimi.box2d.FlashToBox2dConverter;
import com.dango_itimi.box2d.view.View;
import com.dango_itimi.box2d.fla.Chunk;

import com.dango_itimi.as3.box2d.view.ViewForFlash;
import com.dango_itimi.as3.box2d.view.Polygon;
import com.dango_itimi.as3.box2d.view.Circle;
import com.dango_itimi.as3.box2d.view.Box;


class FlashToBox2dConverterForFlash extends FlashToBox2dConverter{

	public function new(chunkMap:ChunkMap) {

		boxClass = Box;
		circleClass = Circle;
		polygonClass = Polygon;

		super(chunkMap);
	}

	override private function createViewMapChild(chunk:Chunk, viewClass:Class<View>, chunkSetId:Int, viewMap:Map<String, Map<String, View>>, userDataSetLength:Int) {

		var chunkSprite:Sprite = chunk.chunkSprite;

		for (i in 0...chunkSprite.numChildren) {

			var childSprite:MovieClip = cast chunkSprite.getChildAt(i);
			var mcName:String = childSprite.name;

			var mcHeadName:String =
				(mcName.indexOf(Chunk.CHUNK_MC_HEAD_NAME_FOR_AUTO) == -1) ?
					Chunk.CHUNK_MC_HEAD_NAME_FOR_OPTIONAL : Chunk.CHUNK_MC_HEAD_NAME_FOR_AUTO;

			//var viewId:Int = cast mcName.substring(mcHeadName.length);
			var viewIdStr = mcName.substring(mcHeadName.length);
			var viewId:Int = Std.parseInt(viewIdStr);

			var userData:UserData = (
				mcHeadName == Chunk.CHUNK_MC_HEAD_NAME_FOR_OPTIONAL &&
				viewId < userDataSetLength
			) ?
				chunk.getUserData(viewId) : new UserData();

			var view:View = Type.createInstance(viewClass, []);
			cast(view, ViewForFlash).createBaseShape(childSprite);
			view.initialize(
				chunkSetId, mcHeadName, viewId,
				chunk.bodyType, chunk.bullet, chunk.restitution, chunk.friction, chunk.density,
				chunk.fixedRotation, userData, chunk.groupIndex, chunk.categoryBits, chunk.maskBits, chunk.firstVisible
			);

			viewMap.get(mcHeadName).set(viewIdStr, view);
		}
	}

}

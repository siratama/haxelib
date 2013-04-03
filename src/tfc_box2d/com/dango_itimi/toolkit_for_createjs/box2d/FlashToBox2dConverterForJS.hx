package com.dango_itimi.toolkit_for_createjs.box2d;

import com.dango_itimi.box2d.fla.ChunkMap;
import com.dango_itimi.box2d.userdata.UserData;
import com.dango_itimi.box2d.FlashToBox2dConverter;
import com.dango_itimi.box2d.view.View;
import com.dango_itimi.box2d.fla.Chunk;

import com.dango_itimi.toolkit_for_createjs.box2d.view.ViewForJS;
import com.dango_itimi.toolkit_for_createjs.box2d.view.Polygon;
import com.dango_itimi.toolkit_for_createjs.box2d.view.Circle;
import com.dango_itimi.toolkit_for_createjs.box2d.view.Box;

import createjs.easeljs.MovieClip;

class FlashToBox2dConverterForJS extends FlashToBox2dConverter{

	public function new(chunkMap:ChunkMap) {

		boxClass = Box;
		circleClass = Circle;
		polygonClass = Polygon;

		super(chunkMap);
	}

	override private function createViewMapChild(chunk:Chunk, viewClass:Class<View>, materialId:Int, viewMap:Hash<Hash<View>>, userDataSetLength:Int) {

		var chunkSprite = chunk.chunkSprite;
		for (i in 0...chunkSprite.getNumChildren()) {

			var childSprite:MovieClip = cast(chunkSprite.getChildAt(i));

			var mcName:String = "";
			var fields = Reflect.fields(chunkSprite);

			for(prop in fields){
				if(Reflect.field(chunkSprite, prop) != childSprite) continue;
				mcName = prop;
				break;
			}

			var mcHeadName:String =
			(mcName.indexOf(Chunk.CHUNK_MC_HEAD_NAME_FOR_AUTO) == -1) ?
			Chunk.CHUNK_MC_HEAD_NAME_FOR_OPTIONAL : Chunk.CHUNK_MC_HEAD_NAME_FOR_AUTO;

			//Instance property name of Toolkit for CreateJS 1.1 is
			// "OriginalProperty" + "_" + "SerialNumber" or
			// "instance" + "_" + "SerialNumber"
			var viewId:Int =
				(mcHeadName == Chunk.CHUNK_MC_HEAD_NAME_FOR_OPTIONAL) ?
					cast mcName.substring(mcHeadName.length).split("_")[0] :
					cast mcName.substring(mcHeadName.length).split("_").slice(-1)[0];

			var userData:UserData = (
				mcHeadName == Chunk.CHUNK_MC_HEAD_NAME_FOR_OPTIONAL &&
				viewId < userDataSetLength
			) ?
				chunk.getUserData(viewId) : new UserData();

			var view:View = Type.createInstance(viewClass, []);
			cast(view, ViewForJS).createBaseShape(childSprite);
			view.initialize(
				materialId, mcHeadName, viewId,
				chunk.bodyType, chunk.bullet, chunk.restitution, chunk.friction, chunk.density,
				chunk.fixedRotation, userData, chunk.groupIndex, chunk.categoryBits, chunk.maskBits, chunk.firstVisible
			);

			viewMap.get(mcHeadName).set(cast viewId, view);
		}
	}
}

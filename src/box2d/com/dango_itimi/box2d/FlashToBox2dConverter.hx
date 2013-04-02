package com.dango_itimi.box2d;

import box2D.dynamics.B2World;
import com.dango_itimi.box2d.view.View;
import com.dango_itimi.box2d.userdata.UserData;
import com.dango_itimi.box2d.fla.ChunkMap;
import com.dango_itimi.box2d.fla.Chunk;

class FlashToBox2dConverter {

	private var boxClass:Class<View>;
	private var circleClass:Class<View>;
	private var polygonClass:Class<View>;

	private var boxMap:Hash<Hash<Hash<View>>>;
	private var circleMap:Hash<Hash<Hash<View>>>;
	private var polygonMap:Hash<Hash<Hash<View>>>;

	public function new(chunkMap:ChunkMap) {

		boxMap = new Hash();
		circleMap = new Hash();
		polygonMap = new Hash();

		parse(chunkMap.getBoxSet(), boxMap, boxClass);
		parse(chunkMap.getCircleSet(), circleMap, circleClass);
		parse(chunkMap.getPolygonSet(), polygonMap, polygonClass);
	}
	private function parse(chunkSet:Array<Chunk>, map:Hash<Hash<Hash<View>>>, viewClass:Class<View>){

		var len:Int = chunkSet.length;
		for (i in 0...len)
			map.set(cast i, createViewMap(chunkSet[i], viewClass, i));
	}
	private function createViewMap(chunk:Chunk, viewClass:Class<View>, materialId:Int):Hash<Hash<View>> {

		/*
		var viewMap:Hash<Hash<View>> = new Hash();
		viewMap.set(Chunk.CHUNK_MC_HEAD_NAME_FOR_OPTIONAL, new Hash());
		viewMap.set(Chunk.CHUNK_MC_HEAD_NAME_FOR_AUTO, new Hash());

		var userDataSetLength:Int = chunk.getUserDataSetLength();

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
			view.createBaseShape(childSprite);
			view.initialize(
				materialId, mcHeadName, viewId,
				chunk.bodyType, chunk.bullet, chunk.restitution, chunk.friction, chunk.density,
				chunk.fixedRotation, userData, chunk.groupIndex, chunk.firstVisible
			);

			viewMap.get(mcHeadName).set(cast viewId, view);
		}
		return viewMap;
		*/
		return null;
	}

	/**
	*
	**/
	public function execute(world:B2World, BOX2D_SCALE:Float) {

		executeForMap(boxMap, world, BOX2D_SCALE);
		executeForMap(circleMap, world, BOX2D_SCALE);
		executeForMap(polygonMap, world, BOX2D_SCALE);
	}
	private function executeForMap(map:Hash<Hash<Hash<View>>>, world:B2World,  BOX2D_SCALE:Float) {

		for (kindMap in map){
			for (viewMap in kindMap){
				for (view in viewMap){
					cast(view, View).createBox2D(world, BOX2D_SCALE);
				}
			}
		}
	}

	/**
	*
	**/
	public function getBox(materialId:Int, viewId:Int):View {

		return getView(materialId, viewId, boxMap);
	}
	public function getCircle(materialId:Int, viewId:Int):View {

		return getView(materialId, viewId, circleMap);
	}
	public function getPolygon(materialId:Int, viewId:Int):View {

		return getView(materialId, viewId, polygonMap);
	}
	private function getView(materialId:Int, viewId:Int, map:Hash<Hash<Hash<View>>>):View {

		return map.get(cast materialId).get(Chunk.CHUNK_MC_HEAD_NAME_FOR_OPTIONAL).get(cast viewId);
	}
}

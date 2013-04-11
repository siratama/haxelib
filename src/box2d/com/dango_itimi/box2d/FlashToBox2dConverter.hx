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

		parse(chunkMap.boxSet, boxMap, boxClass);
		parse(chunkMap.circleSet, circleMap, circleClass);
		parse(chunkMap.polygonSet, polygonMap, polygonClass);
	}
	private function parse(chunkSet:Array<Chunk>, map:Hash<Hash<Hash<View>>>, viewClass:Class<View>){

		var len:Int = chunkSet.length;
		for (i in 0...len)
			map.set(cast i, createViewMap(chunkSet[i], viewClass, i));
	}
	private function createViewMap(chunk:Chunk, viewClass:Class<View>, chunkSetId:Int):Hash<Hash<View>> {

		var viewMap:Hash<Hash<View>> = new Hash();
		viewMap.set(Chunk.CHUNK_MC_HEAD_NAME_FOR_OPTIONAL, new Hash());
		viewMap.set(Chunk.CHUNK_MC_HEAD_NAME_FOR_AUTO, new Hash());

		var userDataSetLength:Int = chunk.getUserDataSetLength();

		createViewMapChild(chunk, viewClass, chunkSetId, viewMap, userDataSetLength);

		return viewMap;
	}
	private function createViewMapChild(chunk:Chunk, viewClass:Class<View>, chunkSetId:Int, viewMap:Hash<Hash<View>>, userDataSetLength:Int){
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
	public function getBox(chunkSetId:Int, viewId:Int):View {

		return getView(chunkSetId, viewId, boxMap);
	}
	public function getCircle(chunkSetId:Int, viewId:Int):View {

		return getView(chunkSetId, viewId, circleMap);
	}
	public function getPolygon(chunkSetId:Int, viewId:Int):View {

		return getView(chunkSetId, viewId, polygonMap);
	}
	private function getView(chunkSetId:Int, viewId:Int, map:Hash<Hash<Hash<View>>>):View {

		return map.get(cast chunkSetId).get(Chunk.CHUNK_MC_HEAD_NAME_FOR_OPTIONAL).get(cast viewId);
	}
}

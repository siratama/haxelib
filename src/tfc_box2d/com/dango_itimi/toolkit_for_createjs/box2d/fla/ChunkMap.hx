package com.dango_itimi.toolkit_for_createjs.box2d.fla;
class ChunkMap {

	private var boxSet:Array<Chunk>;
	private var circleSet:Array<Chunk>;
	private var polygonSet:Array<Chunk>;

	public function new(){

		boxSet = new Array<Chunk>();
		circleSet = new Array<Chunk>();
		polygonSet = new Array<Chunk>();
	}

	public function getBoxSet():Array<Chunk> {
		return boxSet;
	}
	public function getCircleSet():Array<Chunk> {
		return circleSet;
	}
	public function getPolygonSet():Array<Chunk> {
		return polygonSet;
	}
}

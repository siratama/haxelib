package com.dango_itimi.box2d.fla;
class ChunkMap {

	private var boxSet:Array<Chunk>;
	private var circleSet:Array<Chunk>;
	private var polygonSet:Array<Chunk>;

	private var chunkClass:Class<Chunk>;

	public function new(){

		boxSet = new Array<Chunk>();
		circleSet = new Array<Chunk>();
		polygonSet = new Array<Chunk>();

		initializeForBox();
		initializeForCircle();
		initializeForPolygon();
	}
	private function initializeForBox() {
	}
	private function initializeForCircle() {
	}
	private function initializeForPolygon() {
	}

	private function createBox(
		chunkSetId:Int,
		chunkSpriteClass:Dynamic,
		?bodyType:Bool = false,
		?bullet:Bool = false,
		?restitution:Float = 0,
		?friction:Float = 1.0,
		?density:Float = 1.0,
		?fixedRotation:Bool = false,
		?groupIndex:Int = 0,
		?categoryBits:Int = 0x0001,
		?maskBits:Int = 0xffff,
		?firstVisible:Bool = true
	):Chunk {
		return createChunk(boxSet, chunkSetId, chunkSpriteClass, bodyType, bullet, restitution, friction, density, fixedRotation, groupIndex, categoryBits, maskBits, firstVisible);
	}
	private function createCircle(
		chunkSetId:Int,
		chunkSpriteClass:Dynamic,
		?bodyType:Bool = false,
		?bullet:Bool = false,
		?restitution:Float = 0,
		?friction:Float = 1.0,
		?density:Float = 1.0,
		?fixedRotation:Bool = false,
		?groupIndex:Int = 0,
		?categoryBits:Int = 0x0001,
		?maskBits:Int = 0xffff,
		?firstVisible:Bool = true
	):Chunk {
		return createChunk(circleSet, chunkSetId, chunkSpriteClass, bodyType, bullet, restitution, friction, density, fixedRotation, groupIndex, categoryBits, maskBits, firstVisible);
	}
	private function createPolygon(
		chunkSetId:Int,
		chunkSpriteClass:Dynamic,
		?bodyType:Bool = false,
		?bullet:Bool = false,
		?restitution:Float = 0,
		?friction:Float = 1.0,
		?density:Float = 1.0,
		?fixedRotation:Bool = false,
		?groupIndex:Int = 0,
		?categoryBits:Int = 0x0001,
		?maskBits:Int = 0xffff,
		?firstVisible:Bool = true
	):Chunk {
		return createChunk(polygonSet, chunkSetId, chunkSpriteClass, bodyType, bullet, restitution, friction, density, fixedRotation, groupIndex, categoryBits, maskBits, firstVisible);
	}
	private function createChunk(
		chunkSet:Array<Chunk>,
		chunkSetId:Int,
		chunkSpriteClass:Dynamic,
		?bodyType:Bool = false,
		?bullet:Bool = false,
		?restitution:Float = 0,
		?friction:Float = 1.0,
		?density:Float = 1.0,
		?fixedRotation:Bool = false,
		?groupIndex:Int = 0,
		?categoryBits:Int = 0x0001,
		?maskBits:Int = 0xffff,
		?firstVisible:Bool = true
	):Chunk {

		var chunkSprite = Type.createInstance(chunkSpriteClass, []);
		var chunk:Chunk = new Chunk(chunkSprite, bodyType, bullet, restitution, friction, density, fixedRotation, groupIndex, categoryBits, maskBits, firstVisible);
		chunkSet[chunkSetId] = chunk;
		return chunk;
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
